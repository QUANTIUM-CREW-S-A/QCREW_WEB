import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

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

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'testimonials'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name || '',
          email: data.email || '',
          company: data.company || '',
          role: data.role || '',
          content: data.content || '',
          rating: data.rating || 5,
          category: data.category || '',
          imageUrl: data.imageUrl || '',
          status: data.status || 'pending',
          featured: data.featured || false,
          adminNotes: data.adminNotes || '',
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          approvedAt: data.approvedAt?.toDate() || null,
          approvedBy: data.approvedBy || '',
        } as AdminTestimonial;
      });
      setTestimonials(items);
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const getStats = (): TestimonialStats => ({
    total: testimonials.length,
    pending: testimonials.filter((t) => t.status === 'pending').length,
    approved: testimonials.filter((t) => t.status === 'approved').length,
    rejected: testimonials.filter((t) => t.status === 'rejected').length,
  });

  const approveTestimonial = async (id: string, adminEmail: string) => {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, {
      status: 'approved',
      approvedAt: Timestamp.now(),
      approvedBy: adminEmail,
      updatedAt: Timestamp.now(),
    });
  };

  const rejectTestimonial = async (id: string) => {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, {
      status: 'rejected',
      updatedAt: Timestamp.now(),
    });
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, {
      featured,
      updatedAt: Timestamp.now(),
    });
  };

  const updateTestimonial = async (testimonialId: string, data: Partial<AdminTestimonial>) => {
    const docRef = doc(db, 'testimonials', testimonialId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, createdAt: _ca, updatedAt: _ua, approvedAt: _aa, ...rest } = data;
    await updateDoc(docRef, {
      ...rest,
      updatedAt: Timestamp.now(),
    });
  };

  const updateAdminNotes = async (id: string, notes: string) => {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, { adminNotes: notes });
  };

  const deleteTestimonial = async (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id);
    if (testimonial?.imageUrl) {
      try {
        const imageRef = ref(storage, testimonial.imageUrl);
        await deleteObject(imageRef);
      } catch {
        // Image may already be deleted
      }
    }
    await deleteDoc(doc(db, 'testimonials', id));
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
