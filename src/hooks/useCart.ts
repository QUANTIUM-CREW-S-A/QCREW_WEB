import { useSyncExternalStore } from 'react';
import {
  addItem,
  clearCart,
  getSnapshot,
  removeItem,
  subscribe,
  updateQuantity,
  type CartItem,
} from '../lib/cartStore';

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    total,
    count,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
}

export type { CartItem };
