import { Mail, Phone, StickyNote } from 'lucide-react';
import { Modal } from '../ui/Modal';
import type { AdminQuoteRequest } from '../../hooks/useAdminQuoteRequests';
import type { QuoteRequestStatusRow } from '../../types/database';

interface QuoteDetailModalProps {
  open: boolean;
  onClose: () => void;
  request: AdminQuoteRequest | null;
  onStatusChange: (id: string, status: QuoteRequestStatusRow) => void;
}

const statusColors: Record<QuoteRequestStatusRow, string> = {
  pending: 'bg-yellow-500/15 text-yellow-300',
  contacted: 'bg-blue-500/15 text-blue-300',
  closed: 'bg-green-500/15 text-green-300',
};

const statusLabels: Record<QuoteRequestStatusRow, string> = {
  pending: 'Pendiente',
  contacted: 'Contactado',
  closed: 'Cerrado',
};

export function QuoteDetailModal({ open, onClose, request, onStatusChange }: QuoteDetailModalProps) {
  if (!request) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={request.customerName}
      description={`Solicitud del ${request.createdAt.toLocaleDateString('es-PA')}`}
      footer={
        <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-white/60 transition hover:text-white">
          Cerrar
        </button>
      }
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusColors[request.status]}`}>
            {statusLabels[request.status]}
          </span>
          <select
            value={request.status}
            onChange={(e) => onStatusChange(request.id, e.target.value as QuoteRequestStatusRow)}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white outline-none"
          >
            <option value="pending">Marcar pendiente</option>
            <option value="contacted">Marcar contactado</option>
            <option value="closed">Marcar cerrado</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-3 text-sm">
          <a href={`mailto:${request.customerEmail}`} className="flex items-center gap-2 text-white/70 hover:text-brand-primary">
            <Mail className="h-3.5 w-3.5 shrink-0" /> {request.customerEmail}
          </a>
          {request.customerPhone && (
            <a href={`tel:${request.customerPhone}`} className="flex items-center gap-2 text-white/70 hover:text-brand-primary">
              <Phone className="h-3.5 w-3.5 shrink-0" /> {request.customerPhone}
            </a>
          )}
          {request.notes && (
            <div className="flex items-start gap-2 text-white/60">
              <StickyNote className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <p>{request.notes}</p>
            </div>
          )}
        </div>

        <div>
          <h4 className="mb-2 text-xs uppercase tracking-wide text-white/40">
            {request.items.length} artículo{request.items.length === 1 ? '' : 's'}
          </h4>
          <ul className="divide-y divide-white/5 rounded-lg border border-white/10">
            {request.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between px-3 py-2 text-sm">
                <span className="text-white/80">{item.quantity}× {item.name}</span>
                <span className="text-white/50">${(item.unitPrice * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between px-1 text-sm font-medium text-white">
            <span>Total</span>
            <span>${request.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
