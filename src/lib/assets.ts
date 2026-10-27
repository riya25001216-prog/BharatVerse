/**
 * Resolves public asset URLs cleanly whether hosted at domain root or under a subpath (e.g. GitHub Pages /BharatVerse/).
 */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}

export function imagePath(name: string): string {
  if (!name) return assetUrl('images/hero-bharat.jpg');
  if (name.includes('.')) return assetUrl(`images/${name}`);
  return assetUrl(`images/${name}.jpg`);
}

export function panoramaPath(slug: string): string {
  if (!slug) return '';
  if (slug.includes('.')) return assetUrl(`panoramas/${slug}`);
  return assetUrl(`panoramas/${slug}.jpg`);
}
