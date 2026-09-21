import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, ShoppingCart, Plus, Minus, X, CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { PhotoSlot } from "../components/ui/PhotoSlot";
import { RackGridBackground } from "../components/ui/RackGridBackground";
import { Button } from "../components/ui/Button";
import { useProducts, type Product } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { submitQuoteRequest } from "../hooks/useQuoteRequests";
import { toast } from "../components/ui/Toast";
import { cn } from "../lib/utils";

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <div className="rack-panel flex flex-col overflow-hidden">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-square w-full border-b border-rack-rule object-cover"
        />
      ) : (
        <PhotoSlot
          refCode={product.category || "PROD"}
          caption={product.name}
          className="aspect-square w-full border-0 border-b border-rack-rule"
        />
      )}

      <div className="flex flex-1 flex-col p-5">
        {product.category && <p className="rack-label mb-1.5">{product.category}</p>}
        <h3 className="font-bold text-rack-ink">{product.name}</h3>
        {product.description && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-rack-graph">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-5">
          <div>
            <p className="rack-display text-xl text-rack-ink">${product.price.toFixed(2)}</p>
            <p className={cn("font-mono text-[10px]", outOfStock ? "text-rack-act" : "text-rack-graph/60")}>
              {outOfStock ? "Sin stock" : `${product.stock} disponibles`}
            </p>
          </div>
          <button
            onClick={() => {
              addItem(product, 1);
              toast("success", `${product.name} agregado al carrito`);
            }}
            disabled={outOfStock}
            className="flex h-10 w-10 items-center justify-center border border-rack-rule bg-rack-sheet text-rack-ink transition-colors hover:border-rack-edge hover:bg-rack-ink hover:text-rack-paper disabled:pointer-events-none disabled:opacity-30"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CartPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast("error", "Nombre y correo son obligatorios");
      return;
    }

    setSubmitting(true);
    try {
      await submitQuoteRequest({
        customerName: form.name.trim(),
        customerEmail: form.email.trim(),
        customerPhone: form.phone.trim(),
        notes: form.notes.trim(),
        items,
      });
      clearCart();
      setSubmitted(true);
    } catch (err) {
      console.error("[Store] Error al enviar la solicitud:", err);
      toast("error", "No se pudo enviar la solicitud. Intentá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setCheckingOut(false);
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", notes: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-rack-ink/30"
            onClick={reset}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-rack-rule bg-rack-paper"
          >
            <div className="flex items-center justify-between border-b border-rack-rule px-6 py-4">
              <p className="rack-label">
                {submitted ? "Solicitud enviada" : checkingOut ? "Orden de trabajo · Paso 2 de 2" : `Carrito (${items.length})`}
              </p>
              <button onClick={reset} aria-label="Cerrar carrito" className="text-rack-graph hover:text-rack-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-rack-link" />
                <h3 className="rack-display mt-5 text-2xl text-rack-ink">Listo</h3>
                <p className="mt-2 text-rack-graph">
                  Recibimos tu solicitud. Te contactamos en menos de 24&nbsp;h hábiles con la cotización.
                </p>
                <Button className="mt-8" onClick={reset}>
                  Seguir viendo el catálogo
                </Button>
              </div>
            ) : checkingOut ? (
              <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
                <div className="space-y-4">
                  <div>
                    <label className="rack-label mb-1.5 block">Nombre</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full border border-rack-rule bg-rack-sheet px-3 py-2.5 text-sm text-rack-ink outline-none focus:border-rack-edge"
                    />
                  </div>
                  <div>
                    <label className="rack-label mb-1.5 block">Correo</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full border border-rack-rule bg-rack-sheet px-3 py-2.5 text-sm text-rack-ink outline-none focus:border-rack-edge"
                    />
                  </div>
                  <div>
                    <label className="rack-label mb-1.5 block">Teléfono</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full border border-rack-rule bg-rack-sheet px-3 py-2.5 text-sm text-rack-ink outline-none focus:border-rack-edge"
                    />
                  </div>
                  <div>
                    <label className="rack-label mb-1.5 block">Notas (opcional)</label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      className="w-full resize-none border border-rack-rule bg-rack-sheet px-3 py-2.5 text-sm text-rack-ink outline-none focus:border-rack-edge"
                    />
                  </div>
                </div>

                <div className="mt-auto space-y-3 border-t border-rack-rule pt-5">
                  <div className="flex items-center justify-between">
                    <span className="rack-label">Total</span>
                    <span className="rack-display text-xl text-rack-ink">${total.toFixed(2)}</span>
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Enviando…" : "Enviar solicitud de cotización"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setCheckingOut(false)}
                    className="w-full text-center text-sm text-rack-graph hover:text-rack-ink"
                  >
                    Volver al carrito
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  {items.length === 0 ? (
                    <p className="py-12 text-center text-rack-graph">Tu carrito está vacío.</p>
                  ) : (
                    <ul className="space-y-4">
                      {items.map((item) => (
                        <li key={item.productId} className="flex gap-3 border-b border-rack-rule pb-4">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="h-16 w-16 shrink-0 border border-rack-rule object-cover" />
                          ) : (
                            <div className="h-16 w-16 shrink-0 border border-rack-rule bg-rack-sheet" />
                          )}
                          <div className="flex flex-1 flex-col">
                            <p className="text-sm font-medium text-rack-ink">{item.name}</p>
                            <p className="rack-label mt-0.5">${item.price.toFixed(2)}</p>
                            <div className="mt-auto flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="flex h-6 w-6 items-center justify-center border border-rack-rule text-rack-ink hover:bg-rack-sheet"
                                aria-label="Quitar uno"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center font-mono text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                disabled={item.quantity >= item.maxQuantity}
                                className="flex h-6 w-6 items-center justify-center border border-rack-rule text-rack-ink hover:bg-rack-sheet disabled:opacity-30"
                                aria-label="Agregar uno"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => removeItem(item.productId)}
                                className="ml-auto text-xs text-rack-graph hover:text-rack-ink"
                              >
                                Quitar
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="space-y-3 border-t border-rack-rule px-6 py-5">
                    <div className="flex items-center justify-between">
                      <span className="rack-label">Total</span>
                      <span className="rack-display text-xl text-rack-ink">${total.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" onClick={() => setCheckingOut(true)}>
                      Solicitar cotización
                    </Button>
                  </div>
                )}
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Store() {
  const { products, categories, loading } = useProducts();
  const { count } = useCart();
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (category && product.category !== category) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [products, category, search]);

  return (
    <div className="min-h-screen bg-rack-paper">
      <SectionWrapper className="border-b border-rack-rule pb-12 pt-32 md:pt-40">
        <RackGridBackground />

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="rack-label mb-4">Catálogo &middot; Quantium Crew</p>
            <h1 className="rack-display text-4xl text-rack-ink sm:text-5xl">Tienda</h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-rack-graph">
              Hardware y planes de servicio, listos para cotizar. Armá tu carrito y te respondemos en menos de 24&nbsp;h.
            </p>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="flex h-12 items-center gap-2.5 self-start border border-rack-rule bg-rack-sheet px-5 text-sm font-medium text-rack-ink transition-colors hover:border-rack-edge md:self-auto"
          >
            <ShoppingCart className="h-4 w-4" />
            Carrito
            {count > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rack-ink text-[11px] text-rack-paper">
                {count}
              </span>
            )}
          </button>
        </motion.div>

        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rack-graph/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar producto…"
              className="w-full border border-rack-rule bg-rack-sheet py-2.5 pl-9 pr-3 text-sm text-rack-ink outline-none focus:border-rack-edge"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={cn(
                "border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
                category === null
                  ? "border-rack-ink bg-rack-ink text-rack-paper"
                  : "border-rack-rule text-rack-graph hover:border-rack-edge"
              )}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
                  category === cat
                    ? "border-rack-ink bg-rack-ink text-rack-paper"
                    : "border-rack-rule text-rack-graph hover:border-rack-edge"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        {loading ? (
          <p className="text-center text-rack-graph">Cargando catálogo…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-rack-graph">
            {products.length === 0 ? "Todavía no hay productos cargados." : "No encontramos productos con ese filtro."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </SectionWrapper>

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
