import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { QuoteRequestStatusRow } from '../types/database';

export interface AdminQuoteItem {
  id: string;
  productId: string | null;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface AdminQuoteRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  status: QuoteRequestStatusRow;
  total: number;
  items: AdminQuoteItem[];
  createdAt: Date;
}

type QuoteRequestWithItems = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes: string;
  status: QuoteRequestStatusRow;
  total: number;
  created_at: string;
  quote_items: {
    id: string;
    product_id: string | null;
    product_name_snapshot: string;
    unit_price_snapshot: number;
    quantity: number;
  }[];
};

const mapRow = (row: QuoteRequestWithItems): AdminQuoteRequest => ({
  id: row.id,
  customerName: row.customer_name,
  customerEmail: row.customer_email,
  customerPhone: row.customer_phone,
  notes: row.notes,
  status: row.status,
  total: row.total,
  createdAt: new Date(row.created_at),
  items: (row.quote_items ?? []).map((item) => ({
    id: item.id,
    productId: item.product_id,
    name: item.product_name_snapshot,
    unitPrice: item.unit_price_snapshot,
    quantity: item.quantity,
  })),
});

export function useAdminQuoteRequests() {
  const [requests, setRequests] = useState<AdminQuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*, quote_items(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[useAdminQuoteRequests] Error al cargar:', error);
      setLoading(false);
      return;
    }

    setRequests(((data ?? []) as unknown as QuoteRequestWithItems[]).map(mapRow));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel('quote-requests-admin')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quote_requests' },
        () => { fetchRequests(); }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quote_items' },
        () => { fetchRequests(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchRequests]);

  const updateStatus = async (id: string, status: QuoteRequestStatusRow) => {
    const { error } = await supabase.from('quote_requests').update({ status }).eq('id', id);
    if (error) throw error;
  };

  return { requests, loading, updateStatus };
}
