import profile from './profile.json';

// Which roles appear in "Where I've worked", and how they're worded on the site.
// Dates come from profile.json (synced from a2j), so they can't drift from the resume.
const shownExperience = [
  { id: 'terra-tether-pm-2026', org: 'Terra Labs', role: 'Hardware project manager, Tether' },
  { id: 'sram-adv-dev-2026', org: 'SRAM', role: 'Advanced development engineering intern' },
  { id: 'makers-director-2026', org: 'USC Makers', role: 'Director of technical resources' },
  { id: 'terra-cove-2026', org: 'Terra Labs', role: 'Software and electrical engineer, Cove' },
  { id: 'manycore-ml-2025', org: 'Manycore Tech', role: 'Machine learning intern, LLM/RAG' },
  { id: 'roboland-2024', org: 'USC RoboLAND', role: 'Undergraduate researcher, legged locomotion' },
  { id: 'mfe-iot-2024', org: 'MFE Education', role: 'IoT systems intern' },
];

export const experience = shownExperience.map((entry) => {
  const role = profile.experience.find((x) => x.id === entry.id);
  if (!role) throw new Error(`site.ts: no role "${entry.id}" in profile.json. Re-run npm run sync?`);
  return { ...entry, start: role.start, end: role.end };
});

export const degree = profile.education[0];
export { profile };
