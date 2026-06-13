import { useState, useRef, useCallback } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

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
      const storagePath = `testimonials/${Date.now()}_${sanitizedName}`;
      const storageRef = ref(storage, storagePath);

      const uploadTask = uploadBytesResumable(storageRef, file);

      return await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(pct);
          },
          (err) => {
            setError('Error al subir la imagen. Intenta de nuevo.');
            setUploading(false);
            reject(err);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            setProgress(100);
            resolve(url);
          }
        );
      });
    } catch {
      setError('Error al subir la imagen. Intenta de nuevo.');
      setUploading(false);
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
