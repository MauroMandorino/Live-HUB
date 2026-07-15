/* global React, ReactDOM, window, useTweaks, TweaksPanel, TweakSection, TweakToggle */
/* ============================================================
   PSG Performance Workspace: app root, auth (mock), mount.
   Roles live in hub-screens-home.jsx (ROLES). The signed-in
   user {name, email, role, caps} flows down to every screen;
   caps decide which admin surfaces render. Real Firebase Auth
   replaces LoginScreen in the next phase — the App contract
   (user object) stays the same.
   ============================================================ */
const { useState: useApp, useEffect: useAppEffect, useRef: useAppRef } = React;
const { useTweaks, TweaksPanel, TweakSection, TweakToggle } = window;

// Track the mobile breakpoint: below 820px the sidebar becomes an
// off-canvas drawer and the topbar compacts.
function useIsMobile(bp = 820) {
  const [m, setM] = useApp(typeof window !== 'undefined' && window.innerWidth <= bp);
  useAppEffect(() => {
    const mq = window.matchMedia('(max-width: ' + bp + 'px)');
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [bp]);
  return m;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "sidebarCollapsed": false,
  "startAtLogin": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [user, setUser] = useApp(null);
  const [route, setRoute] = useApp('dashboard');
  const [collapsed, setCollapsed] = useApp(!!TWEAK_DEFAULTS.sidebarCollapsed);
  const [focus, setFocus] = useApp(null);
  const [jump, setJump] = useApp(null); // {section, n} for research/tech sub-navigation
  const scrollRef = useAppRef(null);
  const isMobile = useIsMobile();
  const [drawer, setDrawer] = useApp(false);
  useAppEffect(() => { if (!isMobile) setDrawer(false); }, [isMobile]);

  useAppEffect(() => {
    document.documentElement.setAttribute('data-theme', t.dark ? 'dark' : 'light');
  }, [t.dark]);
  useAppEffect(() => { setCollapsed(!!t.sidebarCollapsed); }, [t.sidebarCollapsed]);
  useAppEffect(() => {
    if (!t.startAtLogin && !user) setUser({ name: 'Preview', email: '', role: 'superadmin', roleLabel: window.ROLES.superadmin.label, caps: window.ROLES.superadmin });
  }, [t.startAtLogin]);
  useAppEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [route, focus]);

  function nav(r, id = null, section = null) {
    const isExternal = !user || !user.caps || !user.caps.internal;
    if (isExternal && r !== 'dashboard' && r !== 'research') r = 'dashboard';
    setRoute(r);
    setFocus(id ? { route: r, id, n: Math.random() } : null);
    setJump(section ? { section, n: Math.random() } : null);
    setDrawer(false);
  }
  function focusId(r) { return focus && focus.route === r ? focus : null; }
  function login({ role, name, email }) {
    const caps = window.ROLES[role] || window.ROLES.external;
    setUser({ name, email, role, roleLabel: caps.label, caps });
  }

  if (!user) return <window.LoginScreen onLogin={login} />;

  function screen() {
    const isExternal = !user || !user.caps || !user.caps.internal;
    if (isExternal) {
      return route === 'research' ? <window.ResearchHub user={user} jump={jump} /> : <window.Dashboard nav={nav} user={user} />;
    }
    switch (route) {
      case 'knowledge': return <window.KnowledgeBase focus={focusId('knowledge')} />;
      case 'tech': return <window.Technology user={user} />;
      case 'research': return <window.ResearchHub user={user} jump={jump} />;
      default: return <window.Dashboard nav={nav} user={user} />;
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--canvas-soft)' }}>
      <window.Sidebar route={route} setRoute={(r) => nav(r)} collapsed={collapsed} setCollapsed={setCollapsed}
        theme={t.dark ? 'dark' : 'light'} toggleTheme={() => setTweak('dark', !t.dark)} onLogout={() => setUser(null)} user={user}
        mobile={isMobile} open={drawer} onClose={() => setDrawer(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <window.TopBar onNavigate={nav} onLogout={() => setUser(null)} theme={t.dark ? 'dark' : 'light'} user={user}
          mobile={isMobile} onMenu={() => setDrawer(true)} />
        <main ref={scrollRef} className="scroll" style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '18px 16px 56px' : '28px 32px 72px' }}>
            {screen()}
          </div>
        </main>
      </div>

      <TweaksPanel>
        <TweakSection label="Appearance" />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak('dark', v)} />
        <TweakToggle label="Sidebar starts collapsed" value={t.sidebarCollapsed} onChange={(v) => setTweak('sidebarCollapsed', v)} />
        <TweakSection label="Flow" />
        <TweakToggle label="Start at sign-in" value={t.startAtLogin} onChange={(v) => setTweak('startAtLogin', v)} />
      </TweaksPanel>
    </div>
  );
}

class PerformanceHubElement extends HTMLElement {
  connectedCallback() {
    if (this.__mounted) return;
    this.__mounted = true;
    this.style.display = 'block';
    this.style.height = '100%';
    ReactDOM.createRoot(this).render(<App />);
  }
}
if (!customElements.get('performance-hub')) {
  customElements.define('performance-hub', PerformanceHubElement);
}
