import { useState, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const BUCKET = 'testimonials';

export function useImageUpload() {
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

    // Revoke previous preview
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    fileRef.current = file;
    setPreview(URL.createObjectURL(file));
    return true;
  }, [preview]);

  const upload = useCallback(async (): Promise<string> => {
    const file = fileRef.current;
    if (!file) return '';

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
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

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
  }, []);

  const clear = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    fileRef.current = null;
    setPreview(null);
    setProgress(0);
    setError(null);
    setUploading(false);
  }, [preview]);

  return { preview, uploading, progress, error, selectFile, upload, clear };
}
