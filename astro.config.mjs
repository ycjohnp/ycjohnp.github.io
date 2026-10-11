// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a user site, at the domain root: https://ycjohnp.github.io/
// (that needs the repo to be named ycjohnp.github.io). To serve from a subpath instead, add `base`.
// Internal links go through src/lib/url.ts, so nothing else needs to change.
export default defineConfig({
  site: 'https://ycjohnp.github.io',
});
