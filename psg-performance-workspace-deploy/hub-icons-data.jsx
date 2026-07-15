/* global React */
/* ============================================================
   PSG Performance Hub: Icons + Data model
   ============================================================ */

/* ---- Icon: Lucide-style, 1.75px stroke, currentColor ------ */
const ICON_PATHS = {
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  updates: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  library: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M12 10v6"/><path d="m15 13-3 3-3-3"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  scout: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="m16 16-1.4-1.4"/>',
  flask: '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  shapes: '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  pencil: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  microscope: '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  funnel: '<path d="M22 3H2l8 9.46V19l4 2v-8.54Z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  panelLeft: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
  externalLink: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/>',
  pin: '<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',
  user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  settings: '<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
  trendingUp: '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
  moreH: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  palette: '<circle cx="13.5" cy="6.5" r=".6" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r=".6" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r=".6" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r=".6" fill="currentColor" stroke="none"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.12a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2z"/>',
  presentation: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
  table: '<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>',
  euro: '<path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>',
  mapPin: '<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  cap: '<path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  bookMarked: '<path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
  activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
  dumbbell: '<path d="M14.4 14.4 9.6 9.6"/><path d="M18.66 21.49a2 2 0 1 1-2.83-2.83l-1.77 1.77a2 2 0 1 1-2.83-2.83l6.37-6.36a2 2 0 1 1 2.82 2.83l-1.76 1.76a2 2 0 1 1 2.82 2.83z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.4 12.77a2 2 0 1 1-2.83-2.83l1.77-1.77a2 2 0 1 1-2.83-2.83l2.83-2.82a2 2 0 1 1 2.83 2.82l1.76-1.76a2 2 0 1 1 2.83 2.83z"/>',
  apple: '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>',
  brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>',
  scanLine: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  star: '<path d="M11.52 2.83a.5.5 0 0 1 .96 0l2.1 6.45a.5.5 0 0 0 .48.35h6.78a.5.5 0 0 1 .29.9l-5.48 4a.5.5 0 0 0-.18.56l2.09 6.44a.5.5 0 0 1-.77.56l-5.48-4a.5.5 0 0 0-.58 0l-5.48 4a.5.5 0 0 1-.77-.56l2.09-6.44a.5.5 0 0 0-.18-.56l-5.48-4a.5.5 0 0 1 .29-.9h6.78a.5.5 0 0 0 .48-.35z"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  graduation: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  playCircle: '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  upload: '<path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>',
  uploadCloud: '<path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/>',
  headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm0 0a9 9 0 1 1 18 0m0 0v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>',
};

function Icon({ name, size = 18, strokeWidth = 1.75, style, className }) {
  const path = ICON_PATHS[name] || '';
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      className={className} style={{ flexShrink: 0, display: 'block', ...style }}
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}

/* ---- Disciplines (the consistent grouping dimension) ------
   Discipline identity colours ride the system's five viz
   categoricals: disciplines are categories, so the categorical
   register (not invented hues) carries them. */
const DISCIPLINES = {
  academy:    { id: 'academy',    label: 'Academy (Men)',          short: 'Academy',    icon: 'cap',    color: 'var(--viz-blue)' },
  women:      { id: 'women',      label: "Women's Section",        short: "Women's",    icon: 'users',  color: 'var(--viz-berry)' },
  nutrition:  { id: 'nutrition',  label: 'Nutrition',              short: 'Nutrition',  icon: 'apple',  color: 'var(--viz-teal)' },
  psychology: { id: 'psychology', label: 'Performance Psychology', short: 'Psychology', icon: 'brain',  color: 'var(--viz-purple)' },
  innovation: { id: 'innovation', label: 'Sports Innovation',      short: 'Innovation', icon: 'sparkles', color: 'var(--viz-yellow)' },
};
const DISCIPLINE_LIST = Object.values(DISCIPLINES);

/* ---- Strategic pillars ------------------------------------ */
const PILLARS = [
  { label: 'Common Language', desc: 'Shared definitions, one vocabulary across disciplines.' },
  { label: 'Learning Engine', desc: 'Capture, validate and circulate what we learn.' },
  { label: 'Individualisation', desc: 'Athlete-specific protocols, not one-size-fits-all.' },
];

const QUARTER = { label: 'Q2 / April–June 2026', focus: 'Embedding the Response-to-Load framework across all five disciplines.' };

/* ============================================================
   DATA: realistic placeholder content
   ============================================================ */

/* Updates: quarterly editions + announcements */
const UPDATES = [
  { id: 'q2-2026', type: 'Quarterly', title: 'Performance Quarterly: Q2 2026', date: '2026-04-08', discipline: null, pinned: true,
    excerpt: 'Response-to-Load goes department-wide, the Lab 2.0 build-out completes, and three pilot studies move to validation.',
    read: '6 min', author: 'Performance Leadership' },
  { id: 'a-urinal', type: 'Announcement', title: 'Smart-hydration sensor trial enters the first-team locker room', date: '2026-05-21', discipline: 'nutrition',
    excerpt: 'Withings-partner urinal sensors begin a 6-week reliability trial under an Erasmus+ grant.', author: 'N. Laurent' },
  { id: 'a-hire-psych', type: 'Announcement', title: 'New hire: Lead Performance Psychologist', date: '2026-05-12', discipline: 'psychology',
    excerpt: 'Dr. Maya Okonkwo joins from the national rugby setup to lead the psychology function.', author: 'People & Culture' },
  { id: 'a-lab', type: 'Announcement', title: 'Biomechanics Lab 2.0 is now live at Poissy', date: '2026-04-29', discipline: 'innovation',
    excerpt: 'Markerless capture, force plates and the new isokinetic rig are commissioned and bookable.', author: 'T. Rousseau' },
  { id: 'q1-2026', type: 'Quarterly', title: 'Performance Quarterly: Q1 2026', date: '2026-01-14', discipline: null,
    excerpt: 'Monitoring guidelines v1 shipped, the women’s testing battery was rebuilt, and recovery SOPs entered validation.',
    read: '5 min', author: 'Performance Leadership' },
  { id: 'a-women-gps', type: 'Announcement', title: "Women's section adopts the unified GPS reporting template", date: '2026-03-03', discipline: 'women',
    excerpt: 'One match-day Tableau template now serves both the men’s academy and the women’s section.', author: 'C. Dubois' },
];

/* Quarterly long-form (for the reading view) */
const QUARTERLY_BODY = {
  'q2-2026': {
    intro: 'A quarter defined by consolidation. The Response-to-Load framework (piloted last year inside the men’s academy) is now the common language for monitoring across all five disciplines. Below: what landed, what’s in validation, and where we’re pointing next.',
    sections: [
      { kind: 'This Quarter, Summarised', items: [
        'Response-to-Load framework rolled out department-wide; all disciplines now report against the same load taxonomy.',
        'Biomechanics Lab 2.0 commissioned at Poissy: markerless capture and force plates bookable from this week.',
        'Three pilot studies advanced from data-collection into validation.',
      ]},
      { kind: 'Completed Projects', items: [
        'Monitoring Guidelines v1.2: approved and published to the Knowledge Base.',
        'Match-Day Tableau template: unified for academy + women’s section.',
        'Data-Viz Colour Guide: first edition signed off by the analytics group.',
      ]},
      { kind: 'In Validation', items: [
        'Recovery Guidelines v0.9: pending validation, sign-off expected early Q3.',
        'Physical Testing Battery: re-baselining against the women’s squad.',
      ]},
      { kind: 'People', items: [
        'Dr. Maya Okonkwo joins as Lead Performance Psychologist.',
        'Two MSc placement students embedded with the nutrition group.',
      ]},
    ],
  },
};

/* Knowledge Base: SOPs & guidelines grouped by process area */
const PROCESS_AREAS = [
  { id: 'monitoring', label: 'Monitoring & Load Management', icon: 'activity' },
  { id: 'recovery',   label: 'Recovery Guidelines',          icon: 'heart' },
  { id: 'testing',    label: 'Physical Testing & Profiling', icon: 'dumbbell' },
  { id: 'nutrition',  label: 'Nutrition Protocols',          icon: 'apple' },
  { id: 'biomech',    label: 'Biomechanics & Lab Procedures',icon: 'scanLine' },
  { id: 'psych',      label: 'Performance Psychology',       icon: 'brain' },
];

const SOPS = [
  { id: 'rtl', title: 'Response-to-Load Framework', area: 'monitoring', disciplines: ['academy','women','innovation'], owner: 'T. Rousseau', status: 'Approved', version: 'v1.2', updated: '2026-04-02', type: 'PDF',
    summary: 'The department-wide taxonomy for quantifying and contextualising training and match load. Defines acute:chronic handling, flag thresholds, and the weekly reporting cadence.' },
  { id: 'monitor', title: 'Daily Monitoring Guidelines', area: 'monitoring', disciplines: ['academy','women'], owner: 'C. Dubois', status: 'Approved', version: 'v1.1', updated: '2026-03-18', type: 'PDF',
    summary: 'Wellness, RPE and GPS capture standards: what we collect, when, and how it flows into the daily readiness report.' },
  { id: 'recovery', title: 'Recovery Guidelines', area: 'recovery', disciplines: ['academy','women','nutrition'], owner: 'S. Moreau', status: 'Pending Validation', version: 'v0.9', updated: '2026-05-09', type: 'PDF',
    summary: 'Sleep, nutrition-timing, cold/heat and modality guidance by match-to-match turnaround. Currently in validation with the medical group.' },
  { id: 'testing', title: 'Physical Testing Battery', area: 'testing', disciplines: ['academy','women'], owner: 'L. Bianchi', status: 'Approved', version: 'v2.0', updated: '2026-02-26', type: 'PDF',
    summary: 'The standard profiling battery (isometric strength, jump series, sprint splits and CMJ) with normative bands and re-test windows.' },
  { id: 'testing-w', title: 'Women’s Profiling Addendum', area: 'testing', disciplines: ['women'], owner: 'L. Bianchi', status: 'Draft', version: 'v0.4', updated: '2026-05-19', type: 'MD',
    summary: 'Menstrual-cycle-aware adjustments and revised normative bands for the women’s squad. Draft for discipline review.' },
  { id: 'nutrition-md', title: 'Match-Day Fuelling Protocol', area: 'nutrition', disciplines: ['nutrition','academy','women'], owner: 'N. Laurent', status: 'Approved', version: 'v1.3', updated: '2026-03-30', type: 'PDF',
    summary: 'Carbohydrate periodisation, hydration and supplement timing across the 48h around a fixture.' },
  { id: 'hydration', title: 'Hydration & Sweat-Testing SOP', area: 'nutrition', disciplines: ['nutrition'], owner: 'N. Laurent', status: 'Pending Validation', version: 'v0.8', updated: '2026-05-15', type: 'PDF',
    summary: 'Standardised sweat-rate testing and individualised fluid prescriptions, feeding the smart-hydration sensor trial.' },
  { id: 'biomech-lab', title: 'Biomechanics Lab Operating Procedure', area: 'biomech', disciplines: ['innovation','academy'], owner: 'T. Rousseau', status: 'Approved', version: 'v1.0', updated: '2026-04-25', type: 'PDF',
    summary: 'Booking, calibration and data-handling for the markerless capture system, force plates and isokinetic rig at Poissy.' },
  { id: 'markerless', title: 'Markerless Capture: Data Handling', area: 'biomech', disciplines: ['innovation'], owner: 'A. Silva', status: 'Draft', version: 'v0.3', updated: '2026-05-22', type: 'MD',
    summary: 'Naming, storage and QA conventions for markerless kinematic exports. Draft pending lab sign-off.' },
  { id: 'psych-screen', title: 'Psychological Screening & Referral', area: 'psych', disciplines: ['psychology','academy'], owner: 'M. Okonkwo', status: 'Pending Validation', version: 'v0.7', updated: '2026-05-25', type: 'PDF',
    summary: 'The intake screen, scoring and referral pathway for academy and first-team players, aligned to club safeguarding.' },
  { id: 'psych-prematch', title: 'Pre-Match Activation Routines', area: 'psych', disciplines: ['psychology'], owner: 'M. Okonkwo', status: 'Draft', version: 'v0.2', updated: '2026-05-28', type: 'MD',
    summary: 'A menu of individualisable arousal-regulation routines, mapped to player profiles.' },
];

/* Asset Library */
const ASSET_CATEGORIES = [
  { id: 'decks', label: 'Presentation Decks', icon: 'presentation' },
  { id: 'design', label: 'Design System', icon: 'shapes' },
  { id: 'dataviz', label: 'Data Visualisation', icon: 'palette' },
  { id: 'templates', label: 'Document Templates', icon: 'fileText' },
];
const DATAVIZ_GROUPS = ['Tableau Templates', 'Data-Viz Colour Guide', 'Data-Viz Best Practices'];

const ASSETS = [
  { id: 'deck-tpl', name: 'Department Deck Template', category: 'decks', filetype: 'PPTX', size: '8.4 MB', owner: 'Performance Leadership', updated: '2026-04-10', desc: 'The master 16:9 template: title, section, data and findings layouts, pre-styled with the department type scale.' },
  { id: 'deck-q2', name: 'Q2 Review: All-Department Deck', category: 'decks', filetype: 'PPTX', size: '14.1 MB', owner: 'T. Rousseau', updated: '2026-04-09', desc: 'The deck presented at the Q2 all-hands. A good reference for chart styling and narrative structure.' },
  { id: 'deck-onboard', name: 'New-Starter Onboarding Deck', category: 'decks', filetype: 'PPTX', size: '6.2 MB', owner: 'People & Culture', updated: '2026-02-18', desc: 'How the department works: disciplines, pillars, tooling and where to find things.' },
  { id: 'design-md', name: 'design.md', category: 'design', filetype: 'MD', size: '64 KB', owner: 'A. Silva', updated: '2026-05-02', desc: 'The single source of truth for the department’s visual system: colour, type, spacing, components.' },
  { id: 'brand-pack', name: 'PSG Performance Brand Pack', category: 'design', filetype: 'FIG', size: '42 MB', owner: 'A. Silva', updated: '2026-04-22', desc: 'Figma library: logo lockups, crest assets, components and document frames.' },
  { id: 'logo-pack', name: 'Crest & Logo Pack', category: 'design', filetype: 'ZIP', size: '18 MB', owner: 'A. Silva', updated: '2026-03-11', desc: 'Crest lockups in colour, mono-black and mono-white, plus the department wordmark.' },
  { id: 'tableau-md', name: 'Match-Day Tableau Template', category: 'dataviz', group: 'Tableau Templates', filetype: 'TWBX', size: '3.7 MB', owner: 'C. Dubois', updated: '2026-04-03', desc: 'The unified match-day GPS + load workbook used across the academy and women’s section.' },
  { id: 'tableau-test', name: 'Testing-Battery Tableau Template', category: 'dataviz', group: 'Tableau Templates', filetype: 'TWBX', size: '2.9 MB', owner: 'L. Bianchi', updated: '2026-03-01', desc: 'Profiling dashboard: strength, jump and sprint outputs with normative bands.' },
  { id: 'viz-colour', name: 'Data-Viz Colour Guide', category: 'dataviz', group: 'Data-Viz Colour Guide', filetype: 'PDF', size: '1.2 MB', owner: 'A. Silva', updated: '2026-04-18', desc: 'Approved categorical and sequential palettes, with accessibility and print notes.' },
  { id: 'viz-best', name: 'Data-Viz Best Practices', category: 'dataviz', group: 'Data-Viz Best Practices', filetype: 'PDF', size: '2.1 MB', owner: 'C. Dubois', updated: '2026-03-26', desc: 'How we chart load, readiness and profiling: chart selection, labelling and the “no chartjunk” rules.' },
  { id: 'tpl-report', name: 'Performance Report Template', category: 'templates', filetype: 'PDF', size: '480 KB', owner: 'Performance Leadership', updated: '2026-02-09', desc: 'The standard discipline report layout: summary, method, findings, recommendations.' },
  { id: 'tpl-brief', name: 'Project Brief Template', category: 'templates', filetype: 'MD', size: '22 KB', owner: 'T. Rousseau', updated: '2026-01-28', desc: 'One-page brief: objective, hypothesis, method, owner, success criteria.' },
  { id: 'tpl-study', name: 'Study Protocol Template', category: 'templates', filetype: 'PDF', size: '610 KB', owner: 'M. Okonkwo', updated: '2026-03-15', desc: 'Pre-registration-style protocol for pilot studies: design, measures, analysis plan, ethics.' },
];

/* Objectives by discipline */
const OBJECTIVES = [
  { id: 'o1', discipline: 'academy', title: 'Embed Response-to-Load across all academy age groups', owner: 'C. Dubois', status: 'In progress', desc: 'Roll the framework into U16–U19 daily reporting and coach education.' },
  { id: 'o2', discipline: 'academy', title: 'Re-baseline the testing battery for the new cohort', owner: 'L. Bianchi', status: 'Done', desc: 'Complete pre-season profiling and publish normative bands.' },
  { id: 'o3', discipline: 'women', title: 'Ship the menstrual-cycle-aware profiling addendum', owner: 'L. Bianchi', status: 'In progress', desc: 'Validate adjusted bands with the medical group before fixtures resume.' },
  { id: 'o4', discipline: 'women', title: 'Unify match-day reporting with the academy template', owner: 'C. Dubois', status: 'Done', desc: 'One Tableau template, one load taxonomy across both squads.' },
  { id: 'o5', discipline: 'nutrition', title: 'Validate the hydration & sweat-testing SOP', owner: 'N. Laurent', status: 'In progress', desc: 'Run sweat-rate testing across the first-team squad and individualise prescriptions.' },
  { id: 'o6', discipline: 'nutrition', title: 'Stand up the smart-hydration sensor trial', owner: 'N. Laurent', status: 'In progress', desc: 'Erasmus+-funded reliability trial of locker-room sensors.' },
  { id: 'o7', discipline: 'psychology', title: 'Launch the screening & referral pathway', owner: 'M. Okonkwo', status: 'In progress', desc: 'Validate the intake screen and embed referral routes with safeguarding.' },
  { id: 'o8', discipline: 'psychology', title: 'Build the pre-match activation routine library', owner: 'M. Okonkwo', status: 'Not started', desc: 'Catalogue individualisable arousal-regulation routines by player profile.' },
  { id: 'o9', discipline: 'innovation', title: 'Commission Biomechanics Lab 2.0', owner: 'T. Rousseau', status: 'Done', desc: 'Markerless capture, force plates and isokinetic rig live and bookable.' },
  { id: 'o10', discipline: 'innovation', title: 'Establish the markerless capture data pipeline', owner: 'A. Silva', status: 'In progress', desc: 'QA, storage and naming conventions for kinematic exports.' },
];

/* Tech Scouting pipeline */
const TECH = [
  { id: 't1', name: 'Withings Hydro-Sense', vendor: 'Paris-based, smart urinal hydration sensors', status: 'Ongoing Trial', discipline: 'nutrition', tags: ['hydration','sensors','non-invasive'], note: '6-week reliability trial in the first-team locker room.', grant: 'Erasmus+ Grant: €60K' },
  { id: 't2', name: 'Theia Markerless', vendor: 'Kingston (CA), markerless motion capture', status: 'Trial Completed', discipline: 'innovation', tags: ['biomechanics','capture'], note: 'Validated against marker-based gold standard; adopted for Lab 2.0.' },
  { id: 't3', name: 'Nuro Sleep Ring', vendor: 'Helsinki, sleep & recovery wearable', status: 'Evaluation', discipline: 'academy', tags: ['recovery','wearable','sleep'], note: 'Assessing data access and reliability vs current provider.' },
  { id: 't4', name: 'VALD HumanTrak', vendor: 'Brisbane, markerless movement screening', status: 'Pending Verification', discipline: 'academy', tags: ['screening','rehab'], note: 'Awaiting reliability data from the manufacturer.' },
  { id: 't5', name: 'Orreco Bloodsmart', vendor: 'Galway, biomarker analytics', status: 'Evaluation', discipline: 'women', tags: ['biomarkers','female-athlete'], note: 'Exploring female-athlete biomarker panels for the women’s section.' },
  { id: 't6', name: 'Soccerment xSEED', vendor: 'Milan, smart shin-guard telemetry', status: 'Ongoing Trial', discipline: 'innovation', tags: ['telemetry','wearable'], note: 'Trialling in-shoe load metrics with the U19s.', grant: null },
  { id: 't7', name: 'MindMirror', vendor: 'Lisbon, neurofeedback platform', status: 'Pending Verification', discipline: 'psychology', tags: ['neurofeedback','psychology'], note: 'Pilot pending data-protection review.' },
  { id: 't8', name: 'Zone7 Risk Engine', vendor: 'Tel Aviv, injury-risk modelling', status: 'Trial Completed', discipline: 'academy', tags: ['injury-risk','ml'], note: 'Trial complete; procurement decision with leadership.' },
];

/* Research & Innovation */
const RESEARCH = [
  { id: 'r1', title: 'Acute:chronic load ratios and non-contact injury in elite academy footballers', type: 'Pilot Study', status: 'In progress', discipline: 'academy', authors: ['C. Dubois','T. Rousseau'], outputs: ['Protocol','Interim data'] },
  { id: 'r2', title: 'Markerless vs marker-based kinematics during change-of-direction', type: 'Journal Submission', status: 'In progress', discipline: 'innovation', authors: ['A. Silva','T. Rousseau'], outputs: ['Manuscript','Dataset'] },
  { id: 'r3', title: 'Menstrual-cycle phase and neuromuscular performance in elite female players', type: 'PhD', status: 'In progress', discipline: 'women', authors: ['L. Bianchi'], outputs: ['Year-2 report'] },
  { id: 'r4', title: 'Sleep extension and perceptual recovery across congested fixture blocks', type: 'Pilot Study', status: 'Done', discipline: 'academy', authors: ['S. Moreau'], outputs: ['Final report','Internal brief'] },
  { id: 'r5', title: 'Individualised fuelling and second-half running output', type: 'Pilot Study', status: 'In progress', discipline: 'nutrition', authors: ['N. Laurent'], outputs: ['Protocol'] },
  { id: 'r6', title: 'Arousal-regulation routines and penalty performance under fatigue', type: 'PhD', status: 'Not started', discipline: 'psychology', authors: ['M. Okonkwo'], outputs: [] },
];

/* People / Directory: discipline leads + key contacts */
const PEOPLE = [
  { id: 'p1', name: 'Thomas Rousseau', role: 'Head of Performance / Innovation Lead', discipline: 'innovation', email: 't.rousseau@psg.fr', lead: true },
  { id: 'p2', name: 'Camille Dubois', role: 'Lead Sport Scientist: Academy', discipline: 'academy', email: 'c.dubois@psg.fr', lead: true },
  { id: 'p3', name: 'Laura Bianchi', role: 'Physical Performance Lead', discipline: 'academy', email: 'l.bianchi@psg.fr', lead: false },
  { id: 'p4', name: 'Nadia Laurent', role: 'Lead Performance Nutritionist', discipline: 'nutrition', email: 'n.laurent@psg.fr', lead: true },
  { id: 'p5', name: 'Dr. Maya Okonkwo', role: 'Lead Performance Psychologist', discipline: 'psychology', email: 'm.okonkwo@psg.fr', lead: true },
  { id: 'p6', name: 'Sofia Moreau', role: 'Recovery & Rehabilitation Lead', discipline: 'academy', email: 's.moreau@psg.fr', lead: false },
  { id: 'p7', name: 'Ana Silva', role: 'Data & Design Lead', discipline: 'innovation', email: 'a.silva@psg.fr', lead: false },
  { id: 'p8', name: 'Hélène Faure', role: "Women's Section: Sport Scientist", discipline: 'women', email: 'h.faure@psg.fr', lead: true },
];

/* Learning library: videos of presentations, webinars, and resources */
const LEARNING_TYPES = ['Presentation', 'Webinar', 'Workshop', 'Document'];
const LEARNING = [
  { id: 'l1', title: 'Response-to-Load: the framework explained', type: 'Presentation', discipline: 'academy', presenter: 'T. Rousseau', date: '2026-05-30', duration: '42 min', kind: 'video', views: 86,
    desc: 'A full walkthrough of the load taxonomy, flag thresholds and the weekly reporting cadence: recorded at the Q2 all-hands.' },
  { id: 'l2', title: 'Female-athlete physiology & the menstrual cycle', type: 'Webinar', discipline: 'women', presenter: 'L. Bianchi', date: '2026-05-22', duration: '58 min', kind: 'video', views: 64,
    desc: 'External webinar on cycle-aware programming, with our Q&A on applying it to the women’s profiling addendum.' },
  { id: 'l3', title: 'Markerless capture: a hands-on lab session', type: 'Workshop', discipline: 'innovation', presenter: 'A. Silva', date: '2026-05-08', duration: '1h 12m', kind: 'video', views: 41,
    desc: 'Recorded Lab 2.0 session: calibration, capture and exporting clean kinematic data.' },
  { id: 'l4', title: 'Fuelling around congested fixtures', type: 'Presentation', discipline: 'nutrition', presenter: 'N. Laurent', date: '2026-04-18', duration: '35 min', kind: 'video', views: 73,
    desc: 'Carbohydrate periodisation and hydration strategy across a three-game week.' },
  { id: 'l5', title: 'Psychological screening & referral: intro session', type: 'Presentation', discipline: 'psychology', presenter: 'M. Okonkwo', date: '2026-05-26', duration: '28 min', kind: 'video', views: 38,
    desc: 'How the new intake screen works, scoring, and the referral pathway aligned to safeguarding.' },
  { id: 'l6', title: 'Building readiness dashboards in Tableau', type: 'Workshop', discipline: 'innovation', presenter: 'C. Dubois', date: '2026-03-29', duration: '49 min', kind: 'video', views: 92,
    desc: 'From the match-day template to a custom readiness view: a practical Tableau session.' },
  { id: 'l7', title: 'Sleep, recovery & the congested calendar', type: 'Webinar', discipline: 'academy', presenter: 'S. Moreau', date: '2026-02-20', duration: '54 min', kind: 'video', views: 57,
    desc: 'Guest webinar on sleep extension protocols, with notes on our pilot findings.' },
  { id: 'l8', title: 'Data-Viz best practices: annotated deck', type: 'Document', discipline: 'innovation', presenter: 'A. Silva', date: '2026-03-26', duration: '24 pages', kind: 'doc', views: 110,
    desc: 'The slide-by-slide reference for how we chart load, readiness and profiling.' },
];

/* Dashboard project snapshot */
const PROJECT_SNAPSHOT = [
  { id: 'ps1', name: 'Response-to-Load rollout', discipline: 'academy', status: 'Operational' },
  { id: 'ps2', name: 'Biomechanics Lab 2.0', discipline: 'innovation', status: 'Delivered' },
  { id: 'ps3', name: 'Recovery Guidelines', discipline: 'academy', status: 'Pending Validation' },
  { id: 'ps4', name: 'Hydration sensor trial', discipline: 'nutrition', status: 'Operational' },
  { id: 'ps5', name: 'Psychology function', discipline: 'psychology', status: 'New Hire' },
  { id: 'ps6', name: "Women's profiling addendum", discipline: 'women', status: 'Pending Validation' },
];

/* Map any status string → palette key */
function statusKey(s) {
  const map = {
    'Approved': 'green', 'Delivered': 'green', 'Done': 'green', 'Operational': 'green', 'Trial Completed': 'green',
    'Pending Validation': 'amber', 'Pending Verification': 'amber',
    'In progress': 'blue', 'Ongoing Trial': 'blue', 'Evaluation': 'blue',
    'Draft': 'grey', 'Not started': 'grey', 'New Hire': 'grey',
  };
  return map[s] || 'grey';
}

function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtDateShort(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
/* "New" if published within the last 30 days (relative to the hub's current date) */
const TODAY = new Date('2026-06-08T00:00:00');
function isRecent(iso, days = 30) {
  const d = new Date(iso + 'T00:00:00');
  return (TODAY - d) / 86400000 <= days && (TODAY - d) >= 0;
}

Object.assign(window, {
  Icon, DISCIPLINES, DISCIPLINE_LIST, PILLARS, QUARTER,
  UPDATES, QUARTERLY_BODY, PROCESS_AREAS, SOPS, ASSET_CATEGORIES, DATAVIZ_GROUPS, ASSETS,
  OBJECTIVES, TECH, RESEARCH, PEOPLE, PROJECT_SNAPSHOT, LEARNING, LEARNING_TYPES,
  statusKey, fmtDate, fmtDateShort, isRecent,
});
