/**
 * Resolves public asset URLs cleanly whether hosted at domain root or under a subpath (e.g. GitHub Pages /BharatVerse/).
 * Guaranteed idempotent: never duplicates the subpath (e.g. prevents /BharatVerse/BharatVerse/...).
 */
export function assetUrl(path) {
    if (!path)
        return '';
    if (path.startsWith('http://') ||
        path.startsWith('https://') ||
        path.startsWith('data:') ||
        path.startsWith('blob:')) {
        return path;
    }
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.replace(/^\/+|\/+$/g, ''); // e.g. "BharatVerse"
    // Remove leading slash
    let clean = path.startsWith('/') ? path.slice(1) : path;
    // If path already contains the base folder name (e.g. "BharatVerse/..."), strip it
    while (cleanBase && clean.startsWith(cleanBase + '/')) {
        clean = clean.slice(cleanBase.length + 1);
    }
    if (cleanBase && clean === cleanBase) {
        clean = '';
    }
    return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}
export function imagePath(name) {
    if (!name)
        return assetUrl('images/hero-bharat.jpg');
    if (name.includes('.'))
        return assetUrl(`images/${name}`);
    return assetUrl(`images/${name}.jpg`);
}
export function panoramaPath(slug) {
    if (!slug)
        return '';
    if (slug.includes('.'))
        return assetUrl(`panoramas/${slug}`);
    return assetUrl(`panoramas/${slug}.jpg`);
}
