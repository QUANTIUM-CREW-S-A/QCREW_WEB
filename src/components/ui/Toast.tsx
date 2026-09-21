import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => {
      const id = Date.now().toString() + Math.random().toString(36).slice(2);
      const newToasts = [...state.toasts, { ...toast, id }];
      // Max 5 toasts visible
      if (newToasts.length > 5) newToasts.shift();
      return { toasts: newToasts };
    }),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// eslint-disable-next-line react-refresh/only-export-components -- el proyecto solo corre en Docker/build, sin `vite dev`, asi que Fast Refresh nunca aplica.
export function toast(type: ToastType, message: string, duration = 4000) {
  useToastStore.getState().addToast({ type, message, duration });
}

const iconMap = {
  success: { icon: CheckCircle, color: "text-green-400" },
  error: { icon: AlertCircle, color: "text-red-400" },
  info: { icon: Info, color: "text-brand-primary" },
  warning: { icon: AlertTriangle, color: "text-yellow-400" },
};

function ToastItem({ item, onRemove }: { item: ToastItem; onRemove: () => void }) {
  const { icon: Icon, color } = iconMap[item.type];

  useEffect(() => {
    const timer = setTimeout(onRemove, item.duration);
    return () => clearTimeout(timer);
  }, [item.duration, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="bg-brand-gray border border-white/10 rounded-xl px-4 py-3 shadow-2xl flex items-start gap-3 min-w-[280px] max-w-sm"
    >
      <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
      <p className="text-white text-sm flex-1 leading-relaxed">{item.message}</p>
      <button
        onClick={onRemove}
        className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0 mt-0.5"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} onRemove={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
