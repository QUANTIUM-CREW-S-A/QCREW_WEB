import { useRef, useState } from 'react';
import { FileSpreadsheet, Upload } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { toast } from '../ui/Toast';
import { parseProductsCsv } from '../../lib/csv';
import type { NewProductInput } from '../../hooks/useAdminProducts';

interface CsvImportModalProps {
  open: boolean;
  onClose: () => void;
  onImport: (rows: NewProductInput[]) => Promise<void>;
}

export function CsvImportModal({ open, onClose, onImport }: CsvImportModalProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<NewProductInput[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFileName(null);
    setRows([]);
    setParseError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setParseError(null);

    try {
      const text = await file.text();
      const parsed = parseProductsCsv(text);
      if (parsed.length === 0) {
        setParseError('El CSV no tiene filas de producto válidas');
        setRows([]);
        return;
      }
      setRows(parsed);
    } catch (err) {
      setParseError(err instanceof Error ? err.message : 'No se pudo leer el archivo');
      setRows([]);
    }
  };

  const handleConfirm = async () => {
    if (rows.length === 0) return;
    setImporting(true);
    try {
      await onImport(rows);
      toast('success', `${rows.length} productos importados`);
      handleClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al importar el CSV';
      toast('error', message);
    } finally {
      setImporting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Importar productos desde CSV"
      description="Columnas esperadas: name, category, description, price, stock, image_url"
      footer={
        <>
          <button onClick={handleClose} className="rounded-lg px-4 py-2 text-sm text-white/60 transition hover:text-white">
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={rows.length === 0 || importing}
            className="rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 disabled:opacity-50"
          >
            {importing ? 'Importando…' : `Importar ${rows.length || ''} producto${rows.length === 1 ? '' : 's'}`.trim()}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <input ref={inputRef} type="file" accept=".csv,text/csv" onChange={handleFile} className="hidden" />
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 px-3 py-6 text-sm text-white/60 hover:border-brand-primary/40 hover:text-white/80 transition"
        >
          <Upload className="w-4 h-4" />
          {fileName ?? 'Seleccionar archivo .csv'}
        </button>

        {parseError && <p className="text-red-400 text-xs">{parseError}</p>}

        {rows.length > 0 && (
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/50">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              {rows.length} filas detectadas
            </div>
            <div className="max-h-56 overflow-y-auto divide-y divide-white/5">
              {rows.slice(0, 8).map((row, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 text-xs">
                  <span className="text-white/80 truncate">{row.name}</span>
                  <span className="text-white/40">${row.price.toFixed(2)} · stock {row.stock}</span>
                </div>
              ))}
              {rows.length > 8 && (
                <p className="px-3 py-2 text-[11px] text-white/30">y {rows.length - 8} más…</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
