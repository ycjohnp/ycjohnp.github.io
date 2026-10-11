# johnpeng website

Personal site for John Peng. Static site built with [Astro](https://astro.build).

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
```

## Where things live

| What | Where |
|---|---|
| Home and About copy | `src/pages/index.astro`, `src/pages/about.astro` |
| Project pages | `src/content/projects/*.md`, one file per project |
| Roles shown in "Where I've worked" | `src/data/site.ts` |
| Dates, links, education | `src/data/profile.json`, generated from a2j |
| Colors and type | `src/styles/global.css` |

### Profile data from a2j

`src/data/profile.json` is generated from `../a2j/profile` by an allowlist, so private
fields in a2j (phone, transcript, confidential notes) never reach this repo.
After editing a2j:

```bash
npm run sync       # or: A2J_DIR=/path/to/a2j npm run sync
```

Commit the updated `profile.json`. Builds never need a2j itself.

### Photos

Drop images into `src/assets/me/` with these names (jpg, png, webp or avif) and they
replace the placeholders automatically:

- `portrait`: home page, next to the intro
- `casual`: about page, next to the longer intro

Project images go in `src/assets/projects/` and are referenced from a project's
frontmatter (`cover`, `gallery`).

### Resume

Put the PDF at `public/resume.pdf` and a Resume link appears in the header.

### Unfinished text

Anything still to be written is wrapped in `<span class="todo">[...]</span>` and shows
with a grey highlight. Find them all with:

```bash
grep -rn 'class="todo"' src
```

## Adding a project

Create `src/content/projects/<slug>.md`. The frontmatter fields are defined in
`src/content.config.ts`. Set `featured: true` to list it on the home page, and use
`order` to sort.

## Deploying

Every push to `main` builds and publishes the site to GitHub Pages through
`.github/workflows/deploy.yml`. It lives at https://ycjohnp.github.io/. GitHub serves a site at the
root of that domain only from a repo named `ycjohnp.github.io`, so keep that name.

One-time setup: in the repo on GitHub, go to Settings → Pages and set **Source** to
**GitHub Actions**.

To check the production build locally before pushing:

```bash
npm run build && npm run preview   # http://localhost:4321/
```

### Custom domain (optional)

1. Add the domain under Settings → Pages → Custom domain, and point its DNS at GitHub.
2. Add a `public/CNAME` file containing the domain.
3. In `astro.config.mjs`, set `site` to `https://<domain>`.
