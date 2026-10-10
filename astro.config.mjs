// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a project site: https://ycjohnp.github.io/website/
// With a custom domain later, set `site` to it and remove `base`.
// Internal links go through src/lib/url.ts, so nothing else needs to change.
export default defineConfig({
  site: 'https://ycjohnp.github.io',
  base: '/website',
});
