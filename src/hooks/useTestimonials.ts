import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { TestimonialRow } from '../types/database';

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  category: string;
  imageUrl: string;
  featured: boolean;
  createdAt: Date;
  status?: string;
}

export interface SubmitTestimonialData {
  name: string;
  email: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  category: string;
  imageUrl: string;
}

const mapRow = (row: TestimonialRow): Testimonial => ({
  id: row.id,
  name: row.name || '',
  company: row.company || '',
  role: row.role || '',
  content: row.content || '',
  rating: row.rating || 5,
  category: row.category || '',
  imageUrl: row.image_url || '',
  featured: row.featured || false,
  status: row.status || 'pending',
  createdAt: new Date(row.created_at),
});

/**
 * Suscribe a los testimonios aprobados. Hace un fetch inicial y luego
 * refresca ante cualquier cambio en la tabla via Realtime.
 */
function useApprovedTestimonials(onlyFeatured: boolean, max?: number) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchTestimonials = async () => {
      let query = supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (onlyFeatured) query = query.eq('featured', true);
      if (max) query = query.limit(max);

      const { data, error: queryError } = await query;
      if (!active) return;

      if (queryError) {
        console.error('[useTestimonials] Error al cargar:', queryError);
        setError('Error al cargar testimonios: ' + queryError.message);
        setLoading(false);
        return;
      }

      setTestimonials((data ?? []).map(mapRow));
      setError(null);
      setLoading(false);
    };

    fetchTestimonials();

    const channel = supabase
      .channel(`testimonials-public-${onlyFeatured ? 'featured' : 'all'}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'testimonials' },
        () => { fetchTestimonials(); }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [onlyFeatured, max]);

  return { testimonials, loading, error };
}

export function useTestimonials() {
  return useApprovedTestimonials(false);
}

export function useFeaturedTestimonials() {
  return useApprovedTestimonials(true, 3);
}

/**
 * Envia un testimonio. Entra siempre como 'pending' (lo fuerza la policy de
 * RLS). No devolvemos la fila insertada porque un testimonio pendiente no es
 * legible con la clave publica.
 */
export async function submitTestimonial(data: SubmitTestimonialData): Promise<void> {
  const { error } = await supabase
    .from('testimonials')
    .insert({
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role,
      content: data.content,
      rating: data.rating,
      category: data.category,
      image_url: data.imageUrl,
      status: 'pending',
      featured: false,
    });

  if (error) throw error;
}
