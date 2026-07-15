/* global React, window */
/* ============================================================
   PSG Performance Workspace: Sign-in (mock, role-aware) + Overview
   The role picker is temporary scaffolding: it previews what each
   audience sees before real Firebase Auth accounts replace it.
   ============================================================ */
const { useState: useStateC } = React;
const { Icon, Avatar, Eyebrow, PageHeader } = window;

/* ---- Roles: who can do what ------------------------------- */
const ROLES = {
  superadmin: { id: 'superadmin', label: 'Super admin', who: 'Performance director / developer', techAdmin: true, researchAdmin: true, internal: true },
  tech_admin: { id: 'tech_admin', label: 'Area admin / Technology', who: 'Head of department: tech stack', techAdmin: true, internal: true },
  research_admin: { id: 'research_admin', label: 'Area admin / Research', who: 'Head of department: research hub', researchAdmin: true, internal: true },
  staff: { id: 'staff', label: 'Performance staff', who: 'Internal department member', internal: true },
  external: { id: 'external', label: 'External', who: 'PhD student, partner, other department' }
};
const ROLE_LIST = Object.values(ROLES);

/* ============================================================
   SIGN IN (mock: email + role preview)
   ============================================================ */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useStateC('');
  const [role, setRole] = useStateC('staff');
  function submit(e) {
    e.preventDefault();
    const name = email.trim() ? email.split('@')[0].split(/[._-]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ') : ROLES[role].label;
    onLogin({ role, name, email: email.trim() });
  }
  return (
    <div data-screen-label="Login" className="ds-hero" style={{ position: 'relative', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <img className="ds-hero-mark" src="assets/psg-watermark.svg" alt="" aria-hidden="true" />
      <form onSubmit={submit} className="fade-up" style={{
        position: 'relative', zIndex: 1, width: 430, maxWidth: 'calc(100vw - 32px)', background: 'var(--canvas)', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--elev-5)', padding: '36px 34px 26px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 24 }}>
          <img src="assets/logos/psg-crest-black.svg" alt="Paris Saint-Germain" style={{ height: 52, width: 52, objectFit: 'contain' }} />
          <div style={{ marginTop: 14, fontFamily: "'Virage', var(--font-display)", fontWeight: 400, fontSize: 24, letterSpacing: '0.01em', color: 'var(--ink)' }}>Performance</div>
          <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--mute)' }}>Workspace / Sign in</div>
        </div>

        <label style={loginLabel}>Email</label>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <span style={loginInputIcon}><Icon name="mail" size={16} /></span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@psg.fr" style={loginInput} />
        </div>

        <label style={loginLabel}>Preview as</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
          {ROLE_LIST.map((r) => (
            <button type="button" key={r.id} onClick={() => setRole(r.id)} className="focusable"
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-sm)',
                border: role === r.id ? '1px solid var(--accent-line)' : '1px solid var(--hairline)',
                background: role === r.id ? 'var(--accent-soft)' : 'var(--canvas)', cursor: 'pointer', textAlign: 'left'
              }}>
              <span style={{
                width: 15, height: 15, borderRadius: 999, flexShrink: 0, border: role === r.id ? '5px solid var(--accent)' : '1.5px solid var(--hairline-strong)',
                background: 'var(--canvas)', boxSizing: 'border-box'
              }} />
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{r.label}</span>
                <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--mute)' }}>{r.who}</span>
              </span>
            </button>
          ))}
        </div>

        <button type="submit" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', height: 44, borderRadius: 'var(--radius-sm)',
          border: 'none', background: 'var(--accent)', color: 'var(--accent-contrast)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 600
        }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-press)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}>
          Sign in <Icon name="arrowRight" size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 20, color: 'var(--mute)' }}>
          <Icon name="lock" size={12} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12 }}>Role preview: real accounts arrive with Firebase Auth</span>
        </div>
      </form>
    </div>
  );
}
const loginLabel = { display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500, color: 'var(--body)', marginBottom: 6 };
const loginInput = { width: '100%', height: 42, padding: '0 12px 0 38px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: 'var(--canvas-soft)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none' };
const loginInputIcon = { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mute)', pointerEvents: 'none' };

/* ============================================================
   OVERVIEW: quick links into the three areas + live activity
   ============================================================ */
const AREA_TILES = [
  { route: 'knowledge', icon: 'book', label: 'Knowledge Base', desc: 'Approved SOPs and guidelines, grouped by process area. Structure in place, content arriving.' },
  { route: 'tech', icon: 'scout', label: 'Technology', desc: 'Every performance and medical device in the department. Browse by domain, check the schedule, book equipment.' },
  { route: 'research', icon: 'flask', label: 'Research Hub', desc: 'Submit ideas, follow the research calendar, rate papers, track PhD projects, play the weekly quiz.' }
];

function AreaTile({ tile, onClick }) {
  const [h, setH] = useStateC(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} className="focusable"
      style={{
        display: 'flex', flexDirection: 'column', gap: 14, padding: 22, textAlign: 'left', cursor: 'pointer', width: '100%', height: '100%',
        background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)',
        boxShadow: h ? 'var(--elev-3)' : 'var(--elev-1)', transform: h ? 'translateY(-2px)' : 'none', transition: 'box-shadow .16s, transform .16s'
      }}>
      <span style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={tile.icon} size={23} />
      </span>
      <span>
        <span className="ds-body-md-strong" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 18, letterSpacing: '-0.2px', marginBottom: 6 }}>
          {tile.label}
          <Icon name="arrowRight" size={16} style={{ color: h ? 'var(--accent)' : 'var(--mute)', transition: 'color .15s, transform .15s', transform: h ? 'translateX(2px)' : 'none' }} />
        </span>
        <span className="ds-body-sm" style={{ display: 'block', color: 'var(--body)', textWrap: 'pretty' }}>{tile.desc}</span>
      </span>
    </button>
  );
}

function evCountdown(dateStr, t) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff = Math.round((new Date(dateStr + 'T00:00:00') - today) / 86400000);
  if (diff <= 0) return t('today');
  if (diff === 1) return t('tomorrow');
  return t('inDays').replace('%n', diff);
}
const EV_TYPE_KEYS = { meeting: 'meeting', congress: 'congress', deadline: 'deadline', other: 'other' };
const EV_STATUS = { meeting: 'blue', congress: 'gold', deadline: 'red', other: 'grey' };

function LiveCard({ title, action, children }) {
  return (
    <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-2)', padding: 18, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
        <Eyebrow>{title}</Eyebrow>
        {action}
      </div>
      {children}
    </div>
  );
}
function CardLink({ onClick, children }) {
  return (
    <button onClick={onClick} className="focusable" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500, padding: 0 }}>
      {children} <Icon name="arrowRight" size={13} />
    </button>
  );
}
function CardEmpty({ text }) {
  return <div className="ds-body-sm" style={{ color: 'var(--mute)', padding: '8px 0' }}>{text}</div>;
}

function isoToday() {
  const d = new Date(), p = (n) => (n < 10 ? '0' + n : '' + n);
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

function Dashboard({ nav, user }) {
  const isExternal = !user || !user.caps || !user.caps.internal;
  const tiles = isExternal ? AREA_TILES.filter((tl) => tl.route === 'research') : AREA_TILES;
  return (
    <div data-screen-label="Overview" className="fade-up">
      <PageHeader eyebrow="Performance Department / Workspace" title="Overview"
        subtitle={isExternal ? 'External access: the research hub only.' : 'One home for the department: the knowledge base, the tech stack with equipment booking, and the research hub.'} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

        <section>
          <Eyebrow style={{ marginBottom: 12 }}>Areas</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {tiles.map((tl) => <AreaTile key={tl.route} tile={tl} onClick={() => nav(tl.route)} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen, Dashboard, ROLES, ROLE_LIST });
