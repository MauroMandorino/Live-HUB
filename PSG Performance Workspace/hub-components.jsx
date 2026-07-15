/* global React, Icon, DISCIPLINES, DISCIPLINE_LIST, statusKey, fmtDate */
/* ============================================================
   PSG Performance Hub: shared components & app shell
   ============================================================ */
const { useState, useRef, useEffect } = React;

/* ---- Button ---------------------------------------------- */
function Button({ variant = 'primary', size = 'md', icon, iconRight, children, onClick, style, title, type }) {
  const [h, setH] = useState(false);
  const sizes = {
    sm: { height: 30, padding: '0 12px', fontSize: 13, gap: 6, radius: 'var(--radius-sm)' },
    md: { height: 38, padding: '0 16px', fontSize: 14, gap: 7, radius: 'var(--radius-sm)' },
    lg: { height: 44, padding: '0 20px', fontSize: 15, gap: 8, radius: 'var(--radius-sm)' }
  }[size];
  const variants = {
    primary: { background: h ? 'var(--accent-press)' : 'var(--accent)', color: 'var(--accent-contrast)', border: '1px solid transparent' },
    secondary: { background: h ? 'var(--canvas-soft-2)' : 'var(--canvas)', color: 'var(--ink)', border: '1px solid var(--hairline-strong)' },
    ghost: { background: h ? 'var(--canvas-soft-2)' : 'transparent', color: 'var(--ink)', border: '1px solid transparent' },
    subtle: { background: h ? 'var(--canvas-soft-2)' : 'var(--canvas-soft)', color: 'var(--ink)', border: '1px solid var(--hairline)' }
  }[variant];
  return (
    <button type={type || 'button'} title={title} onClick={onClick}
    onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    className="focusable"
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: sizes.gap,
      height: sizes.height, padding: sizes.padding, fontSize: sizes.fontSize, fontWeight: 500,
      fontFamily: 'var(--font-sans)', borderRadius: sizes.radius, cursor: 'pointer',
      whiteSpace: 'nowrap', transition: 'background .15s ease, border-color .15s ease, opacity .15s ease',
      ...variants, ...style
    }}>
      {icon && <Icon name={icon} size={size === 'lg' ? 18 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 18 : 16} />}
    </button>);

}

/* ---- Status badge (meaning-locked palette) ---------------
   08C: the leading dot is retired system-wide; the tinted pill
   alone carries state. */
function StatusBadge({ status, size = 'md' }) {
  const k = statusKey(status);
  const sm = size === 'sm';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: sm ? 20 : 24, padding: sm ? '0 8px' : '0 10px',
      borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap',
      background: `var(--st-${k}-bg)`, color: `var(--st-${k}-fg)`,
      fontFamily: 'var(--font-sans)', fontSize: sm ? 11.5 : 12.5, fontWeight: 600, letterSpacing: '-0.1px'
    }}>
      {status}
    </span>);

}

/* ---- Discipline tag / filter chip ------------------------ */
function DisciplineDot({ id, size = 8 }) {
  const d = DISCIPLINES[id];
  if (!d) return null;
  return <span style={{ width: size, height: size, borderRadius: 999, background: d.color, flexShrink: 0, display: 'inline-block' }} />;
}

function DisciplineTag({ id, short = true }) {
  const d = DISCIPLINES[id];
  if (!d) return null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 22, padding: '0 9px',
      borderRadius: 'var(--radius-full)', background: 'var(--canvas-soft-2)', border: '1px solid var(--hairline)',
      fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, color: 'var(--body)', whiteSpace: 'nowrap'
    }}>
      {short ? d.short : d.label}
    </span>);

}

/* ---- Keyword chip / file-type chip ----------------------- */
function Chip({ children, mono }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 8px',
      borderRadius: 'var(--radius-sm)', background: 'var(--canvas-soft-2)', color: 'var(--body)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)', fontSize: mono ? 11 : 12, fontWeight: 500,
      letterSpacing: mono ? '0.3px' : 0, whiteSpace: 'nowrap'
    }}>{children}</span>);

}

function FileTypeChip({ type }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 8px',
      borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: 'var(--canvas)',
      fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.4px', color: 'var(--body)'
    }}>
      {type}
    </span>);
}

/* ---- Avatar (initials) ----------------------------------- */
function initials(name) {
  return name.replace(/^Dr\.\s*/, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}
function Avatar({ name, size = 32, color }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: 999, flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: color || 'var(--accent-soft)', color: color ? '#fff' : 'var(--accent)',
      fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: size * 0.36, letterSpacing: '-0.2px',
      border: color ? 'none' : '1px solid var(--accent-line)'
    }}>{initials(name)}</span>);

}

/* ---- Eyebrow + page header ------------------------------- */
function Eyebrow({ children, style }) {
  return <div className="eyebrow" style={style}>{children}</div>;
}

function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
      <div style={{ minWidth: 0 }}>
        {eyebrow && <Eyebrow style={{ marginBottom: 10 }}>{eyebrow}</Eyebrow>}
        <h1 className="title-lg" style={{ fontSize: 30, letterSpacing: "0px", fontWeight: "600" }}>{title}</h1>
        {subtitle && <p className="ds-body-md" style={{ marginTop: 8, maxWidth: 620, color: 'var(--body)' }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{actions}</div>}
    </div>);

}

/* ---- Empty state ----------------------------------------- */
function EmptyState({ icon = 'search', title, body }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '64px 24px', gap: 6
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: 'var(--canvas-soft-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mute)', marginBottom: 8
      }}><Icon name={icon} size={24} /></div>
      <div className="ds-body-md-strong">{title}</div>
      {body && <div className="ds-body-sm" style={{ maxWidth: 320, color: 'var(--mute)' }}>{body}</div>}
    </div>);

}

/* ---- Filter chip row (disciplines etc.) ------------------ */
function FilterChip({ active, onClick, children, dotColor }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    className="focusable"
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 7, height: 32, padding: '0 13px',
      borderRadius: 'var(--radius-full)', cursor: 'pointer',
      fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
      background: active ? 'var(--accent)' : h ? 'var(--canvas-soft-2)' : 'var(--canvas)',
      color: active ? 'var(--accent-contrast)' : 'var(--body)',
      border: `1px solid ${active ? 'var(--accent)' : 'var(--hairline)'}`,
      whiteSpace: 'nowrap'
    }}>
      {dotColor && !active && <span style={{ width: 8, height: 8, borderRadius: 999, background: dotColor }} />}
      {children}
    </button>);

}

function DisciplineFilter({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <FilterChip active={value === 'all'} onClick={() => onChange('all')}>All disciplines</FilterChip>
      {DISCIPLINE_LIST.map((d) =>
      <FilterChip key={d.id} active={value === d.id} onClick={() => onChange(d.id)}>{d.short}</FilterChip>
      )}
    </div>);

}

/* ---- Segmented control ----------------------------------- */
function Segmented({ options, value, onChange }) {
  return (
    <div style={{ display: 'inline-flex', padding: 3, gap: 2, background: 'var(--canvas-soft-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)' }}>
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} className="focusable" title={o.label}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: o.icon && !o.label ? '0 8px' : '0 12px',
            borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
            background: active ? 'var(--canvas)' : 'transparent', color: active ? 'var(--ink)' : 'var(--mute)',
            boxShadow: active ? 'var(--elev-2)' : 'none'
          }}>
            {o.icon && <Icon name={o.icon} size={15} />}
            {o.label}
          </button>);

      })}
    </div>);

}

/* ============================================================
   SIDEBAR
   ============================================================ */
const NAV_PRIMARY = [
{ id: 'dashboard', label: 'Overview', icon: 'dashboard' },
{ id: 'knowledge', label: 'Knowledge Base', icon: 'book' },
{ id: 'tech', label: 'Technology', icon: 'scout' },
{ id: 'research', label: 'Research Hub', icon: 'flask' }];

function NavItem({ item, active, collapsed, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    title={collapsed ? item.label : undefined} className="focusable"
    style={{
      position: 'relative', display: 'flex', alignItems: 'center', gap: 11, width: '100%',
      height: 38, padding: collapsed ? 0 : '0 11px', justifyContent: collapsed ? 'center' : 'flex-start',
      borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', textAlign: 'left',
      fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: active ? 600 : 500,
      background: active ? 'var(--accent-soft)' : h ? 'var(--canvas-soft-2)' : 'transparent',
      color: active ? 'var(--accent)' : h ? 'var(--ink)' : 'var(--body)'
    }}>
      {active && !collapsed && <span style={{ position: 'absolute', left: -9, top: 8, bottom: 8, width: 3, borderRadius: 999, background: 'var(--accent)' }} />}
      <Icon name={item.icon} size={18} strokeWidth={active ? 2 : 1.75} />
      {!collapsed && <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
    </button>);

}

function Sidebar({ route, setRoute, collapsed, setCollapsed, theme, toggleTheme, onLogout, user, mobile, open, onClose }) {
  const isExternal = !user || !user.caps || !user.caps.internal;
  const items = isExternal ? NAV_PRIMARY.filter((it) => it.id === 'dashboard' || it.id === 'research') : NAV_PRIMARY;
  // On mobile the drawer is always full-width (never the collapsed rail).
  const col = mobile ? false : collapsed;
  const asideStyle = mobile ? {
    position: 'fixed', top: 0, left: 0, bottom: 0, width: 'var(--sidebar-w)', maxWidth: '84vw', zIndex: 200,
    transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform .24s cubic-bezier(.4,0,.2,1)',
    boxShadow: open ? 'var(--elev-5)' : 'none', background: 'var(--canvas)', borderRight: '1px solid var(--hairline)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden'
  } : {
    width: collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)', flexShrink: 0,
    height: '100%', background: 'var(--canvas)', borderRight: '1px solid var(--hairline)',
    display: 'flex', flexDirection: 'column', transition: 'width .2s cubic-bezier(.4,0,.2,1)', overflow: 'hidden'
  };
  return (
    <React.Fragment>
    {mobile && open &&
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(10,12,24,.44)', zIndex: 190 }} />}
    <aside className="scroll" style={asideStyle}>
      {/* Brand */}
      <div style={{
        height: 'var(--topbar-h)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10,
        padding: col ? 0 : '0 16px', justifyContent: col ? 'center' : 'flex-start',
        borderBottom: '1px solid var(--hairline)'
      }}>
        <img src={theme === 'dark' ? './assets/logos/psg-crest-white.svg' : './assets/logos/psg-crest-black.svg'} alt="PSG" style={{ height: 30, width: 30, objectFit: 'contain', display: 'block' }} />
        {!col &&
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', lineHeight: 1, justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 17, letterSpacing: 0, color: 'var(--ink)', opacity: 0.85 }}>Performance</span>
          </div>
        }
        {mobile &&
        <button onClick={onClose} title="Close menu" className="focusable" style={{ marginLeft: 'auto', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', border: 'none', background: 'transparent', color: 'var(--body)', cursor: 'pointer' }}>
          <Icon name="x" size={18} />
        </button>}
      </div>

      {/* Nav */}
      <nav className="scroll" style={{ flex: 1, overflowY: 'auto', padding: col ? '12px 14px' : '14px 16px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {!col && <div className="eyebrow" style={{ padding: '0 4px', marginBottom: 6, fontSize: 10 }}>Workspace</div>}
        {items.map((item) =>
        <NavItem key={item.id} item={item} active={route === item.id} collapsed={col} onClick={() => setRoute(item.id)} />
        )}
      </nav>

      {/* Footer controls */}
      <div style={{ flexShrink: 0, borderTop: '1px solid var(--hairline)', padding: col ? '10px 14px' : '12px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={toggleTheme} title="Toggle theme" className="focusable"
        style={{ display: 'flex', alignItems: 'center', gap: 11, height: 34, padding: col ? 0 : '0 11px', justifyContent: col ? 'center' : 'flex-start',
          borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--body)',
          fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 500 }}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
          {!col && <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>}
        </button>
        {!mobile &&
        <button onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Expand' : 'Collapse'} className="focusable"
        style={{ display: 'flex', alignItems: 'center', gap: 11, height: 34, padding: col ? 0 : '0 11px', justifyContent: col ? 'center' : 'flex-start',
          borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--body)',
          fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 500 }}>
          <Icon name="panelLeft" size={17} />
          {!col && <span>Collapse</span>}
        </button>}
      </div>
    </aside>
    </React.Fragment>);

}

/* ============================================================
   GLOBAL SEARCH (top bar)
   ============================================================ */
function buildSearchIndex(isExternal) {
  const idx = [];
  idx.push({ kind: 'Page', route: 'dashboard', label: 'Overview', sub: 'Workspace home', id: null, icon: 'dashboard' });
  if (isExternal) {
    idx.push({ kind: 'Page', route: 'research', label: 'Research Hub', sub: 'Ideas, calendar, papers, PhD', id: null, icon: 'flask' });
    return idx;
  }
  idx.push({ kind: 'Page', route: 'tech', label: 'Technology', sub: 'Tech stack & equipment booking', id: null, icon: 'scout' });
  idx.push({ kind: 'Page', route: 'research', label: 'Research Hub', sub: 'Ideas, calendar, papers, PhD', id: null, icon: 'flask' });
  window.SOPS.forEach((s) => idx.push({ kind: 'SOP', route: 'knowledge', label: s.title, sub: `${s.version} / ${s.owner}`, id: s.id, icon: 'book' }));
  return idx;
}

function GlobalSearch({ onNavigate, isExternal }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const idx = useRef(null);
  if (!idx.current) idx.current = buildSearchIndex(isExternal);

  const results = q.trim().length < 1 ? [] : idx.current.
  filter((r) => (r.label + ' ' + r.sub + ' ' + r.kind).toLowerCase().includes(q.toLowerCase())).
  slice(0, 7);

  useEffect(() => {
    function onDoc(e) {if (ref.current && !ref.current.contains(e.target)) setOpen(false);}
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  function choose(r) {setOpen(false);setQ('');onNavigate(r.route, r.id);}

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1, maxWidth: 460 }}>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mute)', pointerEvents: 'none' }}><Icon name="search" size={16} /></span>
        <input
          value={q} placeholder="Search the workspace…"
          onChange={(e) => {setQ(e.target.value);setOpen(true);setActive(0);}}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {e.preventDefault();setActive((a) => Math.min(a + 1, results.length - 1));} else
            if (e.key === 'ArrowUp') {e.preventDefault();setActive((a) => Math.max(a - 1, 0));} else
            if (e.key === 'Enter' && results[active]) choose(results[active]);else
            if (e.key === 'Escape') setOpen(false);
          }}
          className="focusable"
          style={{
            width: '100%', height: 38, padding: '0 12px 0 36px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--hairline)', background: 'var(--canvas-soft)', color: 'var(--ink)',
            fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none'
          }} />
      </div>
      {open && q.trim() &&
      <div className="scroll fade-in" style={{
        position: 'absolute', top: 46, left: 0, right: 0, background: 'var(--canvas)', borderRadius: 'var(--radius-md)',
        border: '1px solid var(--hairline)', boxShadow: 'var(--elev-5)', padding: 6, zIndex: 80, maxHeight: 380, overflowY: 'auto'
      }}>
          {results.length === 0 && <div style={{ padding: '18px 12px', textAlign: 'center' }} className="ds-body-sm">No matches for “{q}”.</div>}
          {results.map((r, i) =>
        <button key={r.kind + r.id} onMouseEnter={() => setActive(i)} onClick={() => choose(r)} className="focusable"
        style={{
          display: 'flex', alignItems: 'center', gap: 11, width: '100%', padding: '9px 10px', borderRadius: 'var(--radius-sm)',
          border: 'none', cursor: 'pointer', textAlign: 'left', background: i === active ? 'var(--canvas-soft-2)' : 'transparent'
        }}>
              <span style={{ width: 30, height: 30, borderRadius: 'var(--radius-sm)', background: 'var(--canvas-soft-2)', color: 'var(--body)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={r.icon} size={15} /></span>
              <span style={{ minWidth: 0, flex: 1 }}>
                <div className="ds-body-sm-strong" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</div>
                <div className="ds-caption" style={{ color: 'var(--mute)' }}>{r.sub}</div>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--mute)', flexShrink: 0 }}>{r.kind}</span>
            </button>
        )}
        </div>
      }
    </div>);

}
const kbdStyle = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 18, height: 18, padding: '0 4px', borderRadius: 4, background: 'var(--canvas-soft-2)', border: '1px solid var(--hairline)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--mute)' };

/* ---- Language switcher (EN/FR/IT/ES, shared store) -------- */
function LangSelect() {
  const { lang, setLang } = window.useLang();
  return (
    <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language" className="focusable"
    style={{ height: 38, padding: '0 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)',
      background: 'var(--canvas)', color: 'var(--body)', fontFamily: 'var(--font-mono)', fontSize: 12,
      letterSpacing: '0.5px', cursor: 'pointer', outline: 'none' }}>
      {['en', 'fr', 'it', 'es'].map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
    </select>);
}

/* ---- Top bar --------------------------------------------- */
function TopBar({ onNavigate, onLogout, theme, user, mobile, onMenu }) {
  const u = user || { name: 'Guest', roleLabel: 'Visitor' };
  const isExternal = !user || !user.caps || !user.caps.internal;
  const [menu, setMenu] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) {if (ref.current && !ref.current.contains(e.target)) setMenu(false);}
    document.addEventListener('mousedown', onDoc);return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <header style={{
      height: 'var(--topbar-h)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: mobile ? 8 : 16,
      padding: mobile ? '0 12px' : '0 24px', background: 'var(--canvas)', borderBottom: '1px solid var(--hairline)', zIndex: 60
    }}>
      {mobile &&
      <button onClick={onMenu} title="Open menu" className="focusable" style={{ flexShrink: 0, width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: 'var(--canvas)', color: 'var(--body)', cursor: 'pointer' }}>
        <Icon name="menu" size={19} />
      </button>}
      <GlobalSearch onNavigate={onNavigate} isExternal={isExternal} />
      <div style={{ flex: 1 }} />
      {!mobile && <LangSelect />}
      {!mobile && <IconButton name="bell" badge />}
      <div ref={ref} style={{ position: 'relative' }}>
        <button onClick={() => setMenu((m) => !m)} className="focusable" style={{ display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 6px 0 4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--hairline)', background: 'var(--canvas)', cursor: 'pointer' }}>
          <Avatar name={u.name} size={30} />
          <Icon name="chevronDown" size={15} style={{ color: 'var(--mute)' }} />
        </button>
        {menu &&
        <div className="fade-in" style={{ position: 'absolute', right: 0, top: 48, width: 240, background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--elev-5)', padding: 6, zIndex: 90 }}>
            <div style={{ padding: '10px 10px 12px', display: 'flex', gap: 10, alignItems: 'center', borderBottom: '1px solid var(--hairline)', marginBottom: 6 }}>
              <Avatar name={u.name} size={38} />
              <div style={{ minWidth: 0 }}>
                <div className="ds-body-sm-strong">{u.name}</div>
                <div className="ds-caption" style={{ color: 'var(--mute)' }}>{u.roleLabel}</div>
              </div>
            </div>
            {[['user', 'Profile'], ['mail', 'Notifications']].map(([ic, l]) =>
          <MenuRow key={l} icon={ic} label={l} />
          )}
            <div style={{ height: 1, background: 'var(--hairline)', margin: '6px 4px' }} />
            <MenuRow icon="logOut" label="Sign out" onClick={onLogout} danger />
          </div>
        }
      </div>
    </header>);

}

function MenuRow({ icon, label, onClick, danger }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} className="focusable"
    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', height: 36, padding: '0 10px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', textAlign: 'left',
      background: h ? 'var(--canvas-soft-2)' : 'transparent', color: danger ? 'var(--st-red-fg)' : 'var(--body)', fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 500 }}>
      <Icon name={icon} size={16} /> {label}
    </button>);

}

function IconButton({ name, badge, onClick, title }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} title={title} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} className="focusable"
    style={{ position: 'relative', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: h ? 'var(--canvas-soft-2)' : 'var(--canvas)', color: 'var(--body)', cursor: 'pointer' }}>
      <Icon name={name} size={18} />
      {badge && <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: 999, background: 'var(--accent)', border: '1.5px solid var(--canvas)' }} />}
    </button>);

}

/* V1 removals: the SectionPill heading device and the blue·red·blue
   BrandOrnament stripe are retired: the mono eyebrow carries section
   headings, and the colossal watermark is the system's one ambient motif. */

Object.assign(window, {
  Button, StatusBadge, DisciplineDot, DisciplineTag, Chip, FileTypeChip, Avatar, initials,
  Eyebrow, PageHeader, EmptyState, FilterChip, DisciplineFilter, Segmented,
  Sidebar, TopBar, GlobalSearch, IconButton, MenuRow, LangSelect, NAV_PRIMARY
});