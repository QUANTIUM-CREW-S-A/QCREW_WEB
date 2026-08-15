import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  Pencil,
  Trash2,
  Upload,
  ImagePlus,
  LayoutGrid,
  ClipboardList,
} from 'lucide-react';
import { toast } from '../ui/Toast';
import { useAdminProducts, type AdminProduct } from '../../hooks/useAdminProducts';
import { useAdminQuoteRequests } from '../../hooks/useAdminQuoteRequests';
import { ProductFormModal } from './ProductFormModal';
import { CsvImportModal } from './CsvImportModal';
import { QuoteDetailModal } from './QuoteDetailModal';
import type { QuoteRequestStatusRow } from '../../types/database';

type StoreSection = 'overview' | 'inventory' | 'quotes';

const sections: { id: StoreSection; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'overview', label: 'Resumen', icon: TrendingUp },
  { id: 'inventory', label: 'Inventario', icon: LayoutGrid },
  { id: 'quotes', label: 'Cotizaciones', icon: ClipboardList },
];

const quoteStatusColors: Record<QuoteRequestStatusRow, string> = {
  pending: 'bg-yellow-500/15 text-yellow-300',
  contacted: 'bg-blue-500/15 text-blue-300',
  closed: 'bg-green-500/15 text-green-300',
};

const quoteStatusLabels: Record<QuoteRequestStatusRow, string> = {
  pending: 'Pendiente',
  contacted: 'Contactado',
  closed: 'Cerrado',
};

function MetricCard({ label, value, icon: Icon, iconColor }: { label: string; value: string | number; icon: typeof Package; iconColor: string }) {
  return (
    <div className="bg-brand-gray border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/50 text-xs uppercase tracking-[0.2em]">{label}</span>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

export function StoreManager() {
  const {
    products,
    loading: productsLoading,
    getStats,
    addProduct,
    addProducts,
    updateProduct,
    toggleFeatured,
    toggleStatus,
    deleteProduct,
  } = useAdminProducts();
  const { requests, loading: requestsLoading, updateStatus } = useAdminQuoteRequests();

  const [section, setSection] = useState<StoreSection>('overview');
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);

  const metrics = getStats();
  const pendingQuotesValue = requests
    .filter((r) => r.status === 'pending')
    .reduce((sum, r) => sum + r.total, 0);
  const selectedQuote = requests.find((r) => r.id === selectedQuoteId) ?? null;

  const openNewProduct = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };

  const openEditProduct = (product: AdminProduct) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };

  const handleDelete = async (product: AdminProduct) => {
    try {
      await deleteProduct(product.id);
      toast('success', 'Producto eliminado');
    } catch {
      toast('error', 'Error al eliminar el producto');
    }
  };

  const handleQuoteStatus = async (id: string, status: QuoteRequestStatusRow) => {
    try {
      await updateStatus(id, status);
    } catch {
      toast('error', 'Error al actualizar la solicitud');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] pb-3">
        {sections.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSection(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition ${
              section === tab.id
                ? 'bg-white/10 text-white'
                : 'text-white/40 hover:bg-white/5 hover:text-white/70'
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {section === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <MetricCard label="Cotizaciones abiertas" value={`$${pendingQuotesValue.toFixed(2)}`} icon={TrendingUp} iconColor="text-brand-primary" />
            <MetricCard label="Productos activos" value={metrics.active} icon={Package} iconColor="text-brand-primary" />
            <MetricCard label="Stock bajo" value={metrics.lowStock} icon={AlertTriangle} iconColor="text-yellow-400" />
            <MetricCard label="Solicitudes pendientes" value={requests.filter((r) => r.status === 'pending').length} icon={ShoppingBag} iconColor="text-brand-primary" />
          </div>

          <div className="bg-brand-gray border border-white/10 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Últimas solicitudes</h3>
            <div className="space-y-2">
              {requests.slice(0, 5).map((request) => (
                <button
                  key={request.id}
                  onClick={() => { setSection('quotes'); setSelectedQuoteId(request.id); }}
                  className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left text-sm hover:border-brand-primary/30"
                >
                  <span className="text-white/80">{request.customerName}</span>
                  <span className="flex items-center gap-3">
                    <span className="text-white/40">${request.total.toFixed(2)}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] ${quoteStatusColors[request.status]}`}>
                      {quoteStatusLabels[request.status]}
                    </span>
                  </span>
                </button>
              ))}
              {!requestsLoading && requests.length === 0 && (
                <p className="text-center text-white/40 text-sm py-6">Todavía no llegaron solicitudes de cotización.</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {section === 'inventory' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-brand-gray border border-white/10 rounded-xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-white font-semibold">Inventario</h3>
              <span className="text-xs text-white/40">
                {productsLoading ? 'Cargando…' : `${products.length} productos`}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCsvModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition"
              >
                <Upload className="w-4 h-4" />
                Importar CSV
              </button>
              <button
                onClick={openNewProduct}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary px-3 py-2 text-sm font-medium text-white hover:opacity-95 transition"
              >
                <Plus className="w-4 h-4" />
                Nuevo producto
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-10 w-10 shrink-0 rounded-lg object-cover border border-white/10"
                      />
                    ) : (
                      <div className="h-10 w-10 shrink-0 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                        <ImagePlus className="h-4 w-4 text-white/30" />
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-white/40 text-xs">{product.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-[10px] rounded-full ${product.status === 'active' ? 'bg-green-500/15 text-green-300' : 'bg-gray-500/15 text-gray-300'}`}>
                    {product.status === 'active' ? 'Activo' : 'Borrador'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-white/70 mb-3">
                  <span>${product.price.toFixed(2)}</span>
                  <span className={product.stock <= 5 ? 'text-yellow-300' : 'text-white/60'}>
                    Stock: {product.stock}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFeatured(product.id, !product.featured)}
                    className={`flex-1 rounded-lg px-2 py-1.5 text-[11px] transition ${product.featured ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                  >
                    {product.featured ? 'Destacado' : 'Marcar destacado'}
                  </button>
                  <button
                    onClick={() => openEditProduct(product)}
                    className="rounded-lg bg-white/5 px-2 py-1.5 text-[11px] text-white/70 hover:bg-white/10"
                    aria-label="Editar producto"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleStatus(product.id)}
                    className="rounded-lg bg-white/5 px-2 py-1.5 text-[11px] text-white/70 hover:bg-white/10"
                    aria-label="Cambiar estado"
                  >
                    {product.status === 'active' ? 'Ocultar' : 'Publicar'}
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="rounded-lg bg-white/5 px-2 py-1.5 text-[11px] text-red-300 hover:bg-red-500/10"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}

            {!productsLoading && products.length === 0 && (
              <p className="col-span-full text-center text-white/40 text-sm py-8">
                Todavía no hay productos. Creá uno o importá un CSV.
              </p>
            )}
          </div>
        </motion.div>
      )}

      {section === 'quotes' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-brand-gray border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Solicitudes de cotización</h3>
            <span className="text-xs text-white/40">
              {requestsLoading ? 'Cargando…' : `${requests.length} registros`}
            </span>
          </div>

          <div className="space-y-2">
            {requests.map((request) => (
              <button
                key={request.id}
                onClick={() => setSelectedQuoteId(request.id)}
                className="flex w-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left transition hover:border-brand-primary/30 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{request.customerName}</span>
                    <span className="text-white/30 text-xs">{request.customerEmail}</span>
                  </div>
                  <div className="text-white/50 text-xs">
                    {request.items.length} artículos · {request.createdAt.toLocaleDateString('es-PA')}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">${request.total.toFixed(2)}</span>
                  <span className={`rounded-full px-2 py-1 text-[11px] ${quoteStatusColors[request.status]}`}>
                    {quoteStatusLabels[request.status]}
                  </span>
                </div>
              </button>
            ))}

            {!requestsLoading && requests.length === 0 && (
              <p className="text-center text-white/40 text-sm py-8">
                Todavía no llegaron solicitudes de cotización.
              </p>
            )}
          </div>
        </motion.div>
      )}

      <ProductFormModal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        product={editingProduct}
        onCreate={addProduct}
        onUpdate={updateProduct}
      />

      <CsvImportModal
        open={csvModalOpen}
        onClose={() => setCsvModalOpen(false)}
        onImport={addProducts}
      />

      <QuoteDetailModal
        open={selectedQuoteId !== null}
        onClose={() => setSelectedQuoteId(null)}
        request={selectedQuote}
        onStatusChange={handleQuoteStatus}
      />
    </div>
  );
}
