import { supabase } from '../lib/supabase';
import type { CartItem } from '../lib/cartStore';

export interface SubmitQuoteRequestData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  items: CartItem[];
}

/**
 * Envia el carrito como solicitud de cotizacion: crea el quote_request en
 * 'pending' y despues sus lineas.
 *
 * El id se genera en el cliente (no con RETURNING/.select()) a proposito:
 * el rol anon solo tiene GRANT INSERT en quote_requests, no SELECT — una
 * solicitud pendiente solo la puede leer el admin, igual que un testimonio
 * pendiente. Pedir la fila de vuelta con .select().single() falla con
 * "permission denied" aunque el INSERT en si sea valido, porque el grant de
 * tabla se evalua antes que RLS.
 */
export async function submitQuoteRequest(data: SubmitQuoteRequestData): Promise<string> {
  const id = crypto.randomUUID();
  const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const { error: requestError } = await supabase.from('quote_requests').insert({
    id,
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,
    notes: data.notes,
    status: 'pending',
    total,
  });

  if (requestError) throw requestError;

  const { error: itemsError } = await supabase.from('quote_items').insert(
    data.items.map((item) => ({
      quote_request_id: id,
      product_id: item.productId,
      product_name_snapshot: item.name,
      unit_price_snapshot: item.price,
      quantity: item.quantity,
    }))
  );

  if (itemsError) throw itemsError;

  return id;
}
