// Request display-appropriate variants of Shopify CDN images.
// Storing the original src keeps the data service faithful to the store;
// this helper asks the CDN for a resized copy at render time. Original
// product files are ~1.3 MB; a width-constrained copy is ~10x smaller.

type SizeOptions = {
  width?: number;
  height?: number;
  /** crop=center makes Shopify fit the exact box instead of keeping ratio. */
  crop?: boolean;
};

export function shopifyImage(src: string, options: SizeOptions = {}): string {
  const queryIndex = src.indexOf('?');
  const base = queryIndex >= 0 ? src.slice(0, queryIndex) : src;
  if (!base.includes('cdn.shopify.com')) {
    return src;
  }

  // Preserve existing params (e.g. ?v= cache busters) and add/override sizing.
  const params = new Map<string, string>();
  if (queryIndex >= 0) {
    for (const pair of src.slice(queryIndex + 1).split('&')) {
      const eq = pair.indexOf('=');
      if (eq <= 0) continue;
      params.set(pair.slice(0, eq), pair.slice(eq + 1));
    }
  }
  if (options.width) params.set('width', String(options.width));
  if (options.height) params.set('height', String(options.height));
  if (options.crop) params.set('crop', 'center');

  const query = [...params.entries()].map(([k, v]) => `${k}=${v}`).join('&');
  return query ? `${base}?${query}` : base;
}
