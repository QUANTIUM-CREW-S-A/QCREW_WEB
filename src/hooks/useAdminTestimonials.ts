import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { TestimonialRow } from '../types/database';

export type TestimonialStatus = 'pending' | 'approved' | 'rejected';

export interface AdminTestimonial {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  category: string;
  imageUrl: string;
  status: TestimonialStatus;
  featured: boolean;
  adminNotes: string;
  createdAt: Date;
  updatedAt: Date;
  approvedAt: Date | null;
  approvedBy: string;
}

export interface TestimonialStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

const BUCKET = 'testimonials';

const mapRow = (row: TestimonialRow): AdminTestimonial => ({
  id: row.id,
  name: row.name || '',
  email: row.email || '',
  company: row.company || '',
  role: row.role || '',
  content: row.content || '',
  rating: row.rating || 5,
  category: row.category || '',
  imageUrl: row.image_url || '',
  status: row.status || 'pending',
  featured: row.featured || false,
  adminNotes: row.admin_notes || '',
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
  approvedAt: row.approved_at ? new Date(row.approved_at) : null,
  approvedBy: row.approved_by || '',
});

/** Extrae la ruta dentro del bucket a partir de la URL publica. */
const storagePathFromUrl = (url: string): string | null => {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length));
};

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = useCallback(async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[useAdminTestimonials] Error al cargar:', error);
      setLoading(false);
      return;
    }

    setTestimonials((data ?? []).map(mapRow));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTestimonials();

    const channel = supabase
      .channel('testimonials-admin')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'testimonials' },
        () => { fetchTestimonials(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTestimonials]);

  const getStats = (): TestimonialStats => ({
    total: testimonials.length,
    pending: testimonials.filter((t) => t.status === 'pending').length,
    approved: testimonials.filter((t) => t.status === 'approved').length,
    rejected: testimonials.filter((t) => t.status === 'rejected').length,
  });

  const approveTestimonial = async (id: string, adminEmail: string) => {
    const { error } = await supabase
      .from('testimonials')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString(),
        approved_by: adminEmail,
      })
      .eq('id', id);
    if (error) throw error;
  };

  const rejectTestimonial = async (id: string) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ status: 'rejected' })
      .eq('id', id);
    if (error) throw error;
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ featured })
      .eq('id', id);
    if (error) throw error;
  };

  const updateTestimonial = async (
    testimonialId: string,
    data: Partial<AdminTestimonial>
  ) => {
    const patch: Partial<TestimonialRow> = {};
    if (data.name !== undefined) patch.name = data.name;
    if (data.email !== undefined) patch.email = data.email;
    if (data.company !== undefined) patch.company = data.company;
    if (data.role !== undefined) patch.role = data.role;
    if (data.content !== undefined) patch.content = data.content;
    if (data.rating !== undefined) patch.rating = data.rating;
    if (data.category !== undefined) patch.category = data.category;
    if (data.imageUrl !== undefined) patch.image_url = data.imageUrl;
    if (data.status !== undefined) patch.status = data.status;
    if (data.featured !== undefined) patch.featured = data.featured;
    if (data.adminNotes !== undefined) patch.admin_notes = data.adminNotes;
    if (data.approvedBy !== undefined) patch.approved_by = data.approvedBy;

    if (Object.keys(patch).length === 0) return;

    const { error } = await supabase
      .from('testimonials')
      .update(patch)
      .eq('id', testimonialId);
    if (error) throw error;
  };

  const updateAdminNotes = async (id: string, notes: string) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ admin_notes: notes })
      .eq('id', id);
    if (error) throw error;
  };

  const deleteTestimonial = async (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id);

    if (testimonial?.imageUrl) {
      const path = storagePathFromUrl(testimonial.imageUrl);
      if (path) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET)
          .remove([path]);
        // La imagen puede haber sido borrada ya; no bloqueamos el borrado.
        if (storageError) {
          console.warn('[useAdminTestimonials] No se borro la imagen:', storageError);
        }
      }
    }

    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;
  };

  return {
    testimonials,
    loading,
    getStats,
    approveTestimonial,
    rejectTestimonial,
    toggleFeatured,
    updateTestimonial,
    updateAdminNotes,
    deleteTestimonial,
  };
}
