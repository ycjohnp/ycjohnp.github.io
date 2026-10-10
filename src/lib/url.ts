// Prefixes internal paths with the configured base, so the site works both at a
// domain root and under a GitHub Pages project path like /website.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  return `${base}/${path.replace(/^\//, '')}`;
}
