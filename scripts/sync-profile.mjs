// Copies the public parts of the a2j profile into src/data/profile.json.
//
// a2j holds private data (phone, transcript, confidential project notes), so this
// script uses an allowlist: only the fields named below are copied. The output is
// committed, so the site builds without access to a2j.
//
// Usage: npm run sync            (expects ../a2j)
//        A2J_DIR=/path/to/a2j npm run sync

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const profileDir = join(resolve(process.env.A2J_DIR ?? join(root, '..', 'a2j')), 'profile');
const read = (path) => YAML.parse(readFileSync(join(profileDir, path), 'utf8'));
const https = (link) => (link.startsWith('http') ? link : `https://${link}`);

const basics = read('basics.yaml');
const education = read('education.yaml');
const extras = read('extras.yaml');
const experience = readdirSync(join(profileDir, 'experience'))
  .filter((file) => file.endsWith('.yaml'))
  .map((file) => read(join('experience', file)));

const profile = {
  _generated: 'By scripts/sync-profile.mjs from a2j/profile. Edit a2j, then run `npm run sync`.',
  name: basics.preferred_name,
  email: basics.email,
  location: basics.location,
  links: {
    github: https(basics.links.github),
    linkedin: https(basics.links.linkedin),
  },
  education: education.map((e) => ({
    id: e.id,
    institution: e.institution,
    degree: e.degree,
    field: e.field,
    start: e.start,
    end: e.end,
  })),
  experience: experience
    .map((x) => ({
      id: x.id,
      company: x.company,
      title: x.title,
      project: x.project ?? null,
      location: x.location ?? null,
      start: x.start,
      end: x.end,
    }))
    .sort((a, b) => b.start.localeCompare(a.start)),
  awards: (extras.awards ?? []).map((a) => ({
    name: a.name,
    issuer: a.issuer,
    date: a.date ?? null,
  })),
};

const out = join(root, 'src', 'data', 'profile.json');
writeFileSync(out, `${JSON.stringify(profile, null, 2)}\n`);
console.log(`Wrote ${profile.experience.length} roles and ${profile.awards.length} awards to ${out}`);
