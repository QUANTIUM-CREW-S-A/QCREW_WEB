import { useState, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function useImageUpload(bucket: string = 'testimonials') {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<File | null>(null);

  const selectFile = useCallback((file: File): boolean => {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Solo se permiten imagenes (JPG, PNG, WebP, GIF)');
      return false;
    }

    if (file.size > MAX_SIZE) {
      setError('La imagen no debe superar 5MB');
      return false;
    }

    // Revoke previous preview (solo si era un blob local, no una URL remota)
    if (preview?.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }

    fileRef.current = file;
    setPreview(URL.createObjectURL(file));
    return true;
  }, [preview]);

  const upload = useCallback(async (): Promise<string> => {
    const file = fileRef.current;
    // Sin archivo nuevo: en modo edicion esto es la URL ya existente que se
    // precargo con setExistingImage, no hay nada que subir.
    if (!file) return preview ?? '';

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `${Date.now()}_${sanitizedName}`;

      // El SDK de storage no expone progreso granular, asi que marcamos
      // un estado intermedio para que la barra no se quede en 0.
      setProgress(30);

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, { contentType: file.type, upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);

      setUploading(false);
      setProgress(100);
      return data.publicUrl;
    } catch (err) {
      console.error('[useImageUpload] Error al subir:', err);
      setError('Error al subir la imagen. Intenta de nuevo.');
      setUploading(false);
      setProgress(0);
      return '';
    }
  }, [preview, bucket]);

  const clear = useCallback(() => {
    if (preview?.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    fileRef.current = null;
    setPreview(null);
    setProgress(0);
    setError(null);
    setUploading(false);
  }, [preview]);

  /** Precarga una imagen ya subida (modo edicion); upload() la devolvera tal cual. */
  const setExistingImage = useCallback((url: string) => {
    if (preview?.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    fileRef.current = null;
    setPreview(url || null);
  }, [preview]);

  return { preview, uploading, progress, error, selectFile, upload, clear, setExistingImage };
}
