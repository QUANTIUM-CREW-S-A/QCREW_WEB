import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { ProductRow, ProductStatusRow } from '../types/database';

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured: boolean;
  status: ProductStatusRow;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductStats {
  total: number;
  active: number;
  draft: number;
  lowStock: number;
}

const BUCKET = 'products';

const mapRow = (row: ProductRow): AdminProduct => ({
  id: row.id,
  name: row.name,
  category: row.category,
  description: row.description,
  price: row.price,
  stock: row.stock,
  imageUrl: row.image_url,
  featured: row.featured,
  status: row.status,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

/** Extrae la ruta dentro del bucket a partir de la URL publica. */
const storagePathFromUrl = (url: string): string | null => {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length));
};

export interface NewProductInput {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured?: boolean;
  status?: ProductStatusRow;
}

export function useAdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[useAdminProducts] Error al cargar:', error);
      setLoading(false);
      return;
    }

    setProducts((data ?? []).map(mapRow));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel('products-admin')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => { fetchProducts(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  const getStats = (): ProductStats => ({
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    draft: products.filter((p) => p.status === 'draft').length,
    lowStock: products.filter((p) => p.stock <= 5).length,
  });

  const addProduct = async (input: NewProductInput) => {
    const { error } = await supabase.from('products').insert({
      name: input.name,
      category: input.category,
      description: input.description,
      price: input.price,
      stock: input.stock,
      image_url: input.imageUrl,
      featured: input.featured ?? false,
      status: input.status ?? 'active',
    });
    if (error) throw error;
  };

  /** Carga masiva: mismo insert que addProduct, en un solo viaje. */
  const addProducts = async (inputs: NewProductInput[]) => {
    if (inputs.length === 0) return;
    const { error } = await supabase.from('products').insert(
      inputs.map((input) => ({
        name: input.name,
        category: input.category,
        description: input.description,
        price: input.price,
        stock: input.stock,
        image_url: input.imageUrl,
        featured: input.featured ?? false,
        status: input.status ?? 'active',
      }))
    );
    if (error) throw error;
  };

  const updateProduct = async (id: string, data: Partial<AdminProduct>) => {
    const patch: Partial<ProductRow> = {};
    if (data.name !== undefined) patch.name = data.name;
    if (data.category !== undefined) patch.category = data.category;
    if (data.description !== undefined) patch.description = data.description;
    if (data.price !== undefined) patch.price = data.price;
    if (data.stock !== undefined) patch.stock = data.stock;
    if (data.imageUrl !== undefined) patch.image_url = data.imageUrl;
    if (data.featured !== undefined) patch.featured = data.featured;
    if (data.status !== undefined) patch.status = data.status;

    if (Object.keys(patch).length === 0) return;

    const { error } = await supabase.from('products').update(patch).eq('id', id);
    if (error) throw error;
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    const { error } = await supabase.from('products').update({ featured }).eq('id', id);
    if (error) throw error;
  };

  const toggleStatus = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const nextStatus: ProductStatusRow = product.status === 'active' ? 'draft' : 'active';
    const { error } = await supabase.from('products').update({ status: nextStatus }).eq('id', id);
    if (error) throw error;
  };

  const deleteProduct = async (id: string) => {
    const product = products.find((p) => p.id === id);

    if (product?.imageUrl) {
      const path = storagePathFromUrl(product.imageUrl);
      if (path) {
        const { error: storageError } = await supabase.storage.from(BUCKET).remove([path]);
        if (storageError) {
          console.warn('[useAdminProducts] No se borro la imagen:', storageError);
        }
      }
    }

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  };

  return {
    products,
    loading,
    getStats,
    addProduct,
    addProducts,
    updateProduct,
    toggleFeatured,
    toggleStatus,
    deleteProduct,
  };
}
