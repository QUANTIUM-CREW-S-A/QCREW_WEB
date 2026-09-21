/**
 * Vive fuera de Rack3D.tsx a proposito: ese archivo importa three y
 * @react-three/fiber, asi que importar cualquier cosa de ahi (aunque sea
 * esta funcion) arrastraria el chunk pesado igual, anulando el lazy-load.
 * Esta funcion sola permite decidir el fallback ANTES de pedir ese chunk.
 */
export function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}
