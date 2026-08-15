/**
 * Carrito como store externo (patron useSyncExternalStore), no Context.
 * Evita tener que envolver la app en un Provider — hoy solo la pagina de
 * la tienda lo consume, y cualquier otro componente puede sumarse despues
 * llamando a useCart() sin tocar el arbol de la app.
 */

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  /** Stock disponible al momento de agregar, para no dejar pedir de mas. */
  maxQuantity: number;
}

const STORAGE_KEY = 'qcrew_cart_v1';

function load(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

let items: CartItem[] = load();
const listeners = new Set<() => void>();

function save() {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function notify() {
  save();
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): CartItem[] {
  return items;
}

export function addItem(product: {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}, quantity = 1) {
  const existing = items.find((item) => item.productId === product.id);

  if (existing) {
    items = items.map((item) =>
      item.productId === product.id
        ? { ...item, quantity: Math.min(item.quantity + quantity, item.maxQuantity) }
        : item
    );
  } else {
    items = [
      ...items,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: Math.min(quantity, Math.max(product.stock, 1)),
        maxQuantity: Math.max(product.stock, 1),
      },
    ];
  }

  notify();
}

export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeItem(productId);
    return;
  }
  items = items.map((item) =>
    item.productId === productId
      ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
      : item
  );
  notify();
}

export function removeItem(productId: string) {
  items = items.filter((item) => item.productId !== productId);
  notify();
}

export function clearCart() {
  items = [];
  notify();
}

// Mantiene sincronizadas otras pestañas del mismo navegador.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      items = load();
      listeners.forEach((listener) => listener());
    }
  });
}
