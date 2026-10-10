import type { ImageMetadata } from 'astro';

// Personal photos live in src/assets/me/. Drop in a file with one of these names
// (any of jpg, jpeg, png, webp, avif) and it replaces the placeholder on its page:
//   portrait  - home page, next to the intro
//   casual    - about page, next to the longer intro
const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/me/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

export function myPhoto(name: string): ImageMetadata | undefined {
  for (const [path, mod] of Object.entries(photos)) {
    if (path.split('/').pop()?.replace(/\.\w+$/, '') === name) return mod.default;
  }
  return undefined;
}
