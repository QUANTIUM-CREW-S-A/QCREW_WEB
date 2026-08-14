import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  Pencil,
} from 'lucide-react';

type ProductStatus = 'active' | 'draft';
type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  featured: boolean;
  status: ProductStatus;
};

type Order = {
  id: string;
  customer: string;
  total: number;
  status: OrderStatus;
  items: number;
  date: string;
};

const initialProducts: Product[] = [
  { id: 'p-101', name: 'Kit de Branding', category: 'Marketing', price: 249, stock: 12, featured: true, status: 'active' },
  { id: 'p-102', name: 'Landing Page Pro', category: 'Web', price: 680, stock: 5, featured: true, status: 'active' },
  { id: 'p-103', name: 'Soporte Mensual', category: 'Servicios', price: 130, stock: 24, featured: false, status: 'active' },
  { id: 'p-104', name: 'Auditoría SEO', category: 'SEO', price: 420, stock: 2, featured: false, status: 'draft' },
];

const initialOrders: Order[] = [
  { id: '#1042', customer: 'Lucía G.', total: 420, status: 'paid', items: 2, date: '2026-08-12' },
  { id: '#1043', customer: 'Mateo R.', total: 680, status: 'pending', items: 1, date: '2026-08-13' },
  { id: '#1044', customer: 'Nora T.', total: 249, status: 'shipped', items: 3, date: '2026-08-11' },
  { id: '#1045', customer: 'Javier S.', total: 180, status: 'delivered', items: 1, date: '2026-08-09' },
];

const orderColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/15 text-yellow-300',
  paid: 'bg-blue-500/15 text-blue-300',
  shipped: 'bg-violet-500/15 text-violet-300',
  delivered: 'bg-green-500/15 text-green-300',
  cancelled: 'bg-red-500/15 text-red-300',
};

export function StoreManager() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '0',
    stock: '0',
  });

  const metrics = useMemo(() => {
    const revenue = products.reduce((sum, p) => sum + p.price * Math.max(p.stock, 0), 0);
    const lowStock = products.filter((p) => p.stock <= 5).length;
    const activeProducts = products.filter((p) => p.status === 'active').length;
    const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'paid').length;

    return {
      revenue,
      activeProducts,
      lowStock,
      pendingOrders,
    };
  }, [products, orders]);

  const addProduct = () => {
    if (!form.name.trim() || !form.category.trim()) return;

    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      featured: false,
      status: 'active',
    };

    setProducts((current) => [newProduct, ...current]);
    setForm({ name: '', category: '', price: '0', stock: '0' });
  };

  const toggleFeatured = (id: string) => {
    setProducts((current) => current.map((product) =>
      product.id === id ? { ...product, featured: !product.featured } : product
    ));
  };

  const toggleProductStatus = (id: string) => {
    setProducts((current) => current.map((product) =>
      product.id === id ? {
        ...product,
        status: product.status === 'active' ? 'draft' : 'active',
      } : product
    ));
  };

  const updateOrderStatus = (id: string, nextStatus: OrderStatus) => {
    setOrders((current) => current.map((order) =>
      order.id === id ? { ...order, status: nextStatus } : order
    ));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-brand-gray border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/50 text-xs uppercase tracking-[0.2em]">Ingresos</span>
            <TrendingUp className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="text-2xl font-semibold text-white">€{metrics.revenue}</div>
        </div>

        <div className="bg-brand-gray border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/50 text-xs uppercase tracking-[0.2em]">Productos</span>
            <Package className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="text-2xl font-semibold text-white">{metrics.activeProducts}</div>
        </div>

        <div className="bg-brand-gray border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/50 text-xs uppercase tracking-[0.2em]">Stock bajo</span>
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-semibold text-white">{metrics.lowStock}</div>
        </div>

        <div className="bg-brand-gray border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/50 text-xs uppercase tracking-[0.2em]">Pedidos</span>
            <ShoppingBag className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="text-2xl font-semibold text-white">{metrics.pendingOrders}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-brand-gray border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Inventario</h3>
            <span className="text-xs text-white/40">{products.length} productos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-white/40 text-xs">{product.category}</p>
                  </div>
                  <span className={`px-2 py-1 text-[10px] rounded-full ${product.status === 'active' ? 'bg-green-500/15 text-green-300' : 'bg-gray-500/15 text-gray-300'}`}>
                    {product.status === 'active' ? 'Activo' : 'Borrador'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-white/70 mb-3">
                  <span>€{product.price}</span>
                  <span className={product.stock <= 5 ? 'text-yellow-300' : 'text-white/60'}>
                    Stock: {product.stock}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFeatured(product.id)}
                    className={`flex-1 rounded-lg px-2 py-1.5 text-[11px] transition ${product.featured ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                  >
                    {product.featured ? 'Destacado' : 'Marcar destacado'}
                  </button>
                  <button
                    onClick={() => toggleProductStatus(product.id)}
                    className="rounded-lg bg-white/5 px-2 py-1.5 text-[11px] text-white/70 hover:bg-white/10"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-brand-gray border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Añadir producto</h3>
            <Plus className="w-4 h-4 text-brand-primary" />
          </div>

          <div className="space-y-3">
            <input
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
              placeholder="Nombre del producto"
            />
            <input
              value={form.category}
              onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
              placeholder="Categoría"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm((current) => ({ ...current, price: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
                placeholder="Precio"
              />
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm((current) => ({ ...current, stock: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
                placeholder="Stock"
              />
            </div>

            <button
              onClick={addProduct}
              className="w-full rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-95"
            >
              Guardar producto
            </button>
          </div>
        </div>
      </div>

      <div className="bg-brand-gray border border-white/10 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Pedidos recientes</h3>
          <span className="text-xs text-white/40">{orders.length} registros</span>
        </div>

        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">{order.customer}</span>
                  <span className="text-white/30 text-xs">{order.id}</span>
                </div>
                <div className="text-white/50 text-xs">
                  {order.items} artículos · {order.date}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-white font-medium">€{order.total}</span>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                  className={`rounded-lg border border-white/10 bg-transparent px-2 py-1.5 text-[11px] outline-none ${orderColors[order.status]}`}
                >
                  <option value="pending">Pendiente</option>
                  <option value="paid">Pagado</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregado</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
