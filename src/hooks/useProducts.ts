import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { ProductRow } from '../types/database';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured: boolean;
  createdAt: Date;
}

const mapRow = (row: ProductRow): Product => ({
  id: row.id,
  name: row.name,
  category: row.category,
  description: row.description,
  price: row.price,
  stock: row.stock,
  imageUrl: row.image_url,
  featured: row.featured,
  createdAt: new Date(row.created_at),
});

/**
 * Catalogo publico: solo productos activos. Fetch inicial + refresh via
 * Realtime, igual que useTestimonials.
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    if (!isSupabaseConfigured) {
      setProducts([]);
      setError(null);
      setLoading(false);
      return () => {
        active = false;
      };
    }

    const fetchProducts = async () => {
      const { data, error: queryError } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (!active) return;

      if (queryError) {
        console.error('[useProducts] Error al cargar:', queryError);
        setError('Error al cargar el catálogo: ' + queryError.message);
        setLoading(false);
        return;
      }

      setProducts((data ?? []).map(mapRow));
      setError(null);
      setLoading(false);
    };

    fetchProducts();

    const channel = supabase
      .channel('products-public')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => { fetchProducts(); }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean))).sort();

  return { products, categories, loading, error };
}
