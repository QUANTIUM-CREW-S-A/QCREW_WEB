import { useEffect, useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { toast } from '../ui/Toast';
import { useImageUpload } from '../../hooks/useImageUpload';
import type { AdminProduct, NewProductInput } from '../../hooks/useAdminProducts';

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  /** Producto a editar; null cuando el modal esta en modo "crear". */
  product: AdminProduct | null;
  onCreate: (input: NewProductInput) => Promise<void>;
  onUpdate: (id: string, data: Partial<AdminProduct>) => Promise<void>;
}

const emptyForm = { name: '', category: '', description: '', price: '0', stock: '0' };

export function ProductFormModal({ open, onClose, product, onCreate, onUpdate }: ProductFormModalProps) {
  const { preview, uploading, selectFile, upload, clear, setExistingImage } = useImageUpload('products');
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(product);

  useEffect(() => {
    if (!open) return;
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        description: product.description,
        price: String(product.price),
        stock: String(product.stock),
      });
      setExistingImage(product.imageUrl);
    } else {
      setForm(emptyForm);
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) selectFile(file);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.category.trim()) {
      toast('error', 'Nombre y categoría son obligatorios');
      return;
    }

    setSaving(true);
    try {
      // upload() ya sabe devolver la URL existente sin re-subir si no se
      // eligio un archivo nuevo (ver useImageUpload).
      const imageUrl = await upload();

      if (isEditing && product) {
        await onUpdate(product.id, {
          name: form.name.trim(),
          category: form.category.trim(),
          description: form.description.trim(),
          price: Number(form.price) || 0,
          stock: Number(form.stock) || 0,
          imageUrl,
        });
        toast('success', 'Producto actualizado');
      } else {
        await onCreate({
          name: form.name.trim(),
          category: form.category.trim(),
          description: form.description.trim(),
          price: Number(form.price) || 0,
          stock: Number(form.stock) || 0,
          imageUrl,
        });
        toast('success', 'Producto guardado');
      }
      onClose();
    } catch (err) {
      console.error('[ProductFormModal] Error al guardar producto:', err);
      toast('error', 'Error al guardar el producto');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Editar producto' : 'Nuevo producto'}
      description={isEditing ? product?.name : 'Se publica en la tienda al guardar'}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-white/60 transition hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 disabled:opacity-50"
          >
            {saving || uploading ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </>
      }
    >
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
        <textarea
          value={form.description}
          onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary resize-none"
          placeholder="Descripción"
          rows={3}
        />
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Precio</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm((current) => ({ ...current, price: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Stock</span>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => setForm((current) => ({ ...current, stock: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
            />
          </label>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 px-3 py-2.5 text-sm text-white/60 hover:border-brand-primary/40 hover:text-white/80 transition"
        >
          {preview ? (
            <img src={preview} alt="Vista previa" className="h-8 w-8 rounded object-cover" />
          ) : (
            <ImagePlus className="w-4 h-4" />
          )}
          {preview ? 'Cambiar foto' : 'Subir foto'}
        </button>
      </div>
    </Modal>
  );
}
