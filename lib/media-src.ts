/** Serve CMS uploads through the API so they still load after Next builds. */
export function mediaSrc(src: string, cacheKey?: string) {
  if (!src) return src;
  let next = src;
  if (src.startsWith("/uploads/")) {
    const file = src.slice("/uploads/".length).split("?")[0];
    next = `/api/media/${file}`;
  }
  if (cacheKey) {
    const join = next.includes("?") ? "&" : "?";
    next = `${next}${join}v=${encodeURIComponent(cacheKey)}`;
  }
  return next;
}
