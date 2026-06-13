import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';

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

// Helper para mapear documentos de Firestore a Testimonial
const mapDocToTestimonial = (doc: any): Testimonial => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name || '',
    company: data.company || '',
    role: data.role || '',
    content: data.content || '',
    rating: data.rating || 5,
    category: data.category || '',
    imageUrl: data.imageUrl || '',
    featured: data.featured || false,
    status: data.status || 'pending',
    createdAt: data.createdAt?.toDate() || new Date(),
  };
};

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('[useTestimonials] Iniciando suscripción...');
    setLoading(true);
    setError(null);

    // Intentar consulta con índice primero
    const q = query(
      collection(db, 'testimonials'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc')
    );

    let unsubscribe: (() => void) | undefined;

    const setupSubscription = () => {
      unsubscribe = onSnapshot(q, 
        (snapshot) => {
          console.log('[useTestimonials] Datos recibidos:', snapshot.docs.length, 'documentos');
          
          if (snapshot.empty) {
            console.log('[useTestimonials] No hay testimonios aprobados');
            setTestimonials([]);
            setLoading(false);
            return;
          }

          const items = snapshot.docs.map(mapDocToTestimonial);
          console.log('[useTestimonials] Testimonios mapeados:', items.length);
          setTestimonials(items);
          setLoading(false);
          setError(null);
        }, 
        (err) => {
          console.error('[useTestimonials] Error en suscripción:', err);
          
          // Si es error de índice, intentar consulta alternativa
          if (err.message?.includes('index') || err.code === 'failed-precondition') {
            console.log('[useTestimonials] Error de índice detectado, usando fallback...');
            fetchWithoutIndex();
          } else {
            setError('Error al cargar testimonios: ' + err.message);
            setLoading(false);
          }
        }
      );
    };

    // Fallback: consulta sin ordenamiento (ordena en memoria)
    const fetchWithoutIndex = async () => {
      try {
        console.log('[useTestimonials] Intentando consulta sin índice...');
        const qSimple = query(
          collection(db, 'testimonials'),
          where('status', '==', 'approved')
        );
        
        const snapshot = await getDocs(qSimple);
        console.log('[useTestimonials] Fallback - Documentos encontrados:', snapshot.docs.length);
        
        let items = snapshot.docs.map(mapDocToTestimonial);
        
        // Ordenar en memoria
        items = items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        
        setTestimonials(items);
        setError(null);
      } catch (err: any) {
        console.error('[useTestimonials] Error en fallback:', err);
        setError('Error al cargar testimonios. Por favor recarga la página.');
      } finally {
        setLoading(false);
      }
    };

    setupSubscription();

    return () => {
      console.log('[useTestimonials] Limpiando suscripción');
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { testimonials, loading, error };
}

export function useFeaturedTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('[useFeaturedTestimonials] Iniciando suscripción...');
    setLoading(true);
    setError(null);

    // Intentar consulta con índice
    const q = query(
      collection(db, 'testimonials'),
      where('status', '==', 'approved'),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(3)
    );

    let unsubscribe: (() => void) | undefined;

    const setupSubscription = () => {
      unsubscribe = onSnapshot(q, 
        (snapshot) => {
          console.log('[useFeaturedTestimonials] Datos recibidos:', snapshot.docs.length, 'documentos');
          
          const items = snapshot.docs.map(mapDocToTestimonial);
          setTestimonials(items);
          setLoading(false);
          setError(null);
        }, 
        (err) => {
          console.error('[useFeaturedTestimonials] Error:', err);
          
          if (err.message?.includes('index') || err.code === 'failed-precondition') {
            console.log('[useFeaturedTestimonials] Error de índice, usando fallback...');
            fetchWithoutIndex();
          } else {
            setError(err.message);
            setLoading(false);
          }
        }
      );
    };

    // Fallback sin índice
    const fetchWithoutIndex = async () => {
      try {
        const qSimple = query(
          collection(db, 'testimonials'),
          where('status', '==', 'approved'),
          where('featured', '==', true)
        );
        
        const snapshot = await getDocs(qSimple);
        let items = snapshot.docs.map(mapDocToTestimonial);
        items = items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 3);
        
        setTestimonials(items);
        setError(null);
      } catch (err: any) {
        console.error('[useFeaturedTestimonials] Error en fallback:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    setupSubscription();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { testimonials, loading, error };
}

export async function submitTestimonial(data: SubmitTestimonialData): Promise<string> {
  const docRef = await addDoc(collection(db, 'testimonials'), {
    name: data.name,
    email: data.email,
    company: data.company,
    role: data.role,
    content: data.content,
    rating: data.rating,
    category: data.category,
    imageUrl: data.imageUrl,
    status: 'pending',
    featured: false,
    adminNotes: '',
    approvedAt: null,
    approvedBy: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}
