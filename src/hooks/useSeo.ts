import { useEffect } from "react";
import { company } from "../lib/company";

type SeoOptions = {
  title: string;
  description: string;
  /** Ruta absoluta del sitio, p. ej. "/contact". */
  path: string;
  noindex?: boolean;
};

function upsertMeta(kind: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${kind}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(kind, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Metadatos por ruta. Al ser una SPA, index.html sólo trae los de portada, así
 * que sin esto todas las páginas comparten título, descripción y canonical, y
 * compiten entre sí en los resultados de búsqueda.
 */
export function useSeo({ title, description, path, noindex = false }: SeoOptions) {
  useEffect(() => {
    const url = `${company.url}${path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, noindex]);
}
