/* global React, window, Icon */
/* ============================================================
   PSG Performance Workspace: Research Hub (public sections)
   Sections: overview, idea, calendar, papers, library, tip
   (+ phd, quiz, admin in hub-screens-research-extra.jsx).
   Same Firestore collections as the original prototype.
   ============================================================ */
const { useState: useR, useEffect: useRE, useMemo: useRM } = React;

const R_SECTIONS = [
  { id: 'overview', tKey: 'r_overview', icon: 'flask' },
  { id: 'idea', tKey: 'r_idea', icon: 'bulb' },
  { id: 'calendar', tKey: 'r_calendar', icon: 'calendar' },
  { id: 'papers', tKey: 'r_papers', icon: 'fileText' },
  { id: 'library', tKey: 'r_library', icon: 'bookMarked' },
  { id: 'tip', tKey: 'r_tip', icon: 'sparkles' },
  { id: 'phd', tKey: 'r_phd', icon: 'graduation' },
  { id: 'quiz', tKey: 'r_quiz', icon: 'trophy' }];

const EV_TYPES = { meeting: { key: 'meeting', st: 'blue' }, congress: { key: 'congress', st: 'gold' }, deadline: { key: 'deadline', st: 'red' }, other: { key: 'other', st: 'grey' } };
function isoR(d) { const p = (n) => (n < 10 ? '0' + n : '' + n); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }

/* ---- Overview ---------------------------------------------- */
const R_TILES = [
  { id: 'idea', nm: 'ideaNm', ds: 'ideaDesc', icon: 'bulb' },
  { id: 'calendar', nm: 'calNm', ds: 'calDesc', icon: 'calendar' },
  { id: 'papers', nm: 'papersNm', ds: 'papersDesc', icon: 'fileText' },
  { id: 'library', nm: 'libraryNm', ds: 'libraryDesc', icon: 'bookMarked' },
  { id: 'tip', nm: 'tipNm', ds: 'tipDesc', icon: 'sparkles' },
  { id: 'phd', nm: 'phdNm', ds: 'phdDesc', icon: 'graduation' },
  { id: 'quiz', nm: 'quizNm', ds: 'quizDesc', icon: 'trophy' }];

function ResearchOverview({ go }) {
  const { t, locale } = window.useLang();
  const events = window.useCollection('researchEvents', { orderBy: 'date' });
  const tips = window.useCollection('tipPosts', { orderBy: 'createdAt', dir: 'desc' });
  const today = isoR(new Date());
  const upcoming = events.data.filter((e) => e.date >= today).slice(0, 5);
  const tip = tips.data[0];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(260px, 1fr)', gap: 20, alignItems: 'stretch' }}>
        <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
            <window.Eyebrow>{t('nextUp')}</window.Eyebrow>
            <window.Button size="sm" variant="ghost" iconRight="arrowRight" onClick={() => go('calendar')}>{t('viewCal')}</window.Button>
          </div>
          {!events.ready && <div className="ds-body-sm" style={{ color: 'var(--mute)', paddingTop: 8 }}>{t('connecting')}</div>}
          {events.ready && upcoming.length === 0 && <div className="ds-body-sm" style={{ color: 'var(--mute)', paddingTop: 8 }}>{t('noEvents')}</div>}
          {upcoming.map((e) => {
            const et = EV_TYPES[e.type] || EV_TYPES.other;
            return (
              <div key={e.id} style={{ padding: '10px 0', borderTop: '1px solid var(--hairline)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <span className={'ds-status ds-status-' + et.st} style={{ flexShrink: 0 }}>{t(et.key)}</span>
                <span className="ds-body-sm-strong" style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.title}</span>
                <span className="ds-caption" style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--mute)', flexShrink: 0, whiteSpace: 'nowrap' }}>{new Date(e.date + 'T00:00:00').toLocaleDateString(locale, { day: 'numeric', month: 'short' })}{e.time ? ' ' + e.time : ''}</span>
              </div>);
          })}
        </div>
        <button onClick={() => go('tip')} className="focusable" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', cursor: 'pointer', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', padding: 0, boxShadow: 'var(--elev-1)', transition: 'box-shadow .16s, transform .16s' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--elev-3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--elev-1)'; e.currentTarget.style.transform = 'none'; }}>
          {tip && tip.coverImage && <img src={tip.coverImage} alt="" style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block', background: 'var(--canvas-soft-2)' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
            <window.Eyebrow style={{ marginBottom: 6 }}>{t('tipNm')}</window.Eyebrow>
            {!tips.ready && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('connecting')}</div>}
            {tips.ready && !tip && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('tipNoPosts')}</div>}
            {tip && <div className="ds-body-sm-strong" style={{ fontSize: 14.5, marginBottom: 5 }}>{tip.title}</div>}
            {tip && <p className="ds-body-sm" style={{ color: 'var(--body)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 10 }}>{tip.body || ''}</p>}
            {tip && <div className="ds-caption" style={{ color: 'var(--mute)', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span>{window.HubDB.fmtTs(tip.createdAt, locale, { day: 'numeric', month: 'short' })}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--accent)', fontWeight: 500 }}>{t('readPost')} <Icon name="arrowRight" size={12} /></span>
            </div>}
          </div>
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 12 }}>
        {R_TILES.map((tl) => (
          <button key={tl.id} onClick={() => go(tl.id)} className="focusable" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16, textAlign: 'left', cursor: 'pointer', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-1)', transition: 'box-shadow .16s, transform .16s' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--elev-3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--elev-1)'; e.currentTarget.style.transform = 'none'; }}>
            <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={tl.icon} size={18} /></span>
            <span>
              <span className="ds-body-sm-strong" style={{ display: 'block', fontSize: 14.5, marginBottom: 3 }}>{t(tl.nm)}</span>
              <span className="ds-caption" style={{ color: 'var(--mute)', display: 'block', textWrap: 'pretty' }}>{t(tl.ds)}</span>
            </span>
          </button>))}
      </div>
    </div>);
}

/* ---- Submit idea ------------------------------------------- */
function IdeaForm() {
  const { t } = window.useLang();
  const [d, setD] = useR({ name: '', email: '', title: '', objective: '', sample: '', methods: '', links: '', notes: '' });
  const [state, setState] = useR('edit'); // edit | busy | sent | failed
  const set = (k) => (e) => setD({ ...d, [k]: e.target.value });
  const ok = d.name && d.email && d.title && d.objective;
  async function submit(e) {
    e.preventDefault();
    if (!ok) return;
    setState('busy');
    try {
      await window.HubDB.add('researchIdeas', { submitterName: d.name, submitterEmail: d.email, title: d.title, objective: d.objective, sample: d.sample, methods: d.methods, links: d.links, notes: d.notes, status: 'new', screeningNotes: '' });
      setState('sent');
      setD({ name: '', email: '', title: '', objective: '', sample: '', methods: '', links: '', notes: '' });
    } catch (err) { setState('failed'); }
  }
  const F = window.Field, fs = window.fieldStyle, as = window.areaStyle;
  return (
    <form onSubmit={submit} style={{ maxWidth: 680 }}>
      <p className="ds-body-sm" style={{ color: 'var(--body)', marginBottom: 18, textWrap: 'pretty' }}>{t('ideaIntro')}</p>
      {state === 'sent' && <div className="ds-body-sm" style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--st-green-bg)', color: 'var(--st-green-fg)', marginBottom: 14 }}><Icon name="checkCircle" size={16} />{t('ideaSent')}</div>}
      {state === 'failed' && <div className="ds-body-sm" style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--st-red-bg)', color: 'var(--st-red-fg)', marginBottom: 14 }}>{t('ideaFailed')}</div>}
      <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
        <F label={t('fName') + ' *'}><input style={fs} value={d.name} onChange={set('name')} /></F>
        <F label={t('fEmail') + ' *'}><input type="email" style={fs} value={d.email} onChange={set('email')} /></F>
        <F label={t('fTitle') + ' *'} span><input style={fs} value={d.title} onChange={set('title')} /></F>
        <F label={t('fObjective') + ' *'} span><textarea style={as} value={d.objective} onChange={set('objective')} /></F>
        <F label={t('fSample')}><input style={fs} value={d.sample} onChange={set('sample')} /></F>
        <F label={t('fMethods')}><input style={fs} value={d.methods} onChange={set('methods')} /></F>
        <F label={t('fLinks')} span><input style={fs} value={d.links} onChange={set('links')} placeholder="https://..." /></F>
        <F label={t('fNotes')} span><textarea style={{ ...as, minHeight: 56 }} value={d.notes} onChange={set('notes')} /></F>
      </div>
      <div style={{ marginTop: 16 }}>
        <window.Button type="submit" icon="send" style={!ok || state === 'busy' ? { opacity: 0.55, pointerEvents: 'none' } : null}>{t('ideaSubmit')}</window.Button>
      </div>
    </form>);
}

/* ---- Calendar ---------------------------------------------- */
function ResearchCalendar({ canAdmin, onEdit }) {
  const { t, locale } = window.useLang();
  const events = window.useCollection('researchEvents', { orderBy: 'date' });
  const [typeF, setTypeF] = useR('all');
  const [cal, setCal] = useR(() => { const d = new Date(); d.setDate(1); return d; });
  const today = isoR(new Date());
  const list = events.data.filter((e) => typeF === 'all' || e.type === typeF);
  const upcoming = list.filter((e) => e.date >= today);
  const cells = useRM(() => {
    const first = new Date(cal.getFullYear(), cal.getMonth(), 1);
    const startPad = (first.getDay() + 6) % 7;
    const days = new Date(cal.getFullYear(), cal.getMonth() + 1, 0).getDate();
    const out = [];
    for (let i = 0; i < startPad; i++) out.push(null);
    for (let dd = 1; dd <= days; dd++) out.push(isoR(new Date(cal.getFullYear(), cal.getMonth(), dd)));
    return out;
  }, [cal]);
  function move(n) { const d = new Date(cal); d.setMonth(d.getMonth() + n); setCal(d); }
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <window.FilterChip active={typeF === 'all'} onClick={() => setTypeF('all')}>{t('allTypes')}</window.FilterChip>
        {Object.keys(EV_TYPES).map((k) => <window.FilterChip key={k} active={typeF === k} onClick={() => setTypeF(k)}>{t(EV_TYPES[k].key)}</window.FilterChip>)}
        <div style={{ flex: 1 }} />
        {canAdmin && <window.Button size="sm" icon="plus" onClick={() => onEdit({})}>Add event</window.Button>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="ds-body-md-strong" style={{ textTransform: 'capitalize' }}>{cal.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <window.Button variant="ghost" size="sm" icon="chevronLeft" onClick={() => move(-1)} />
              <window.Button variant="ghost" size="sm" onClick={() => setCal(() => { const d = new Date(); d.setDate(1); return d; })}>{t('today')}</window.Button>
              <window.Button variant="ghost" size="sm" icon="chevronRight" onClick={() => move(1)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w) => <div key={w} className="ds-caption" style={{ color: 'var(--mute)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10 }}>{w}</div>)}
            {cells.map((dStr, i) => {
              if (!dStr) return <div key={'p' + i} />;
              const day = list.filter((e) => e.date === dStr);
              return (
                <div key={dStr} style={{ minHeight: 92, borderRadius: 6, border: '1px solid var(--hairline)', background: dStr === today ? 'var(--accent-soft)' : 'var(--canvas)', padding: 5, overflow: 'hidden' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: dStr === today ? 'var(--accent)' : 'var(--mute)', fontWeight: dStr === today ? 700 : 400, marginBottom: 3 }}>{+dStr.slice(-2)}</div>
                  {day.slice(0, 3).map((e) => {
                    const et = EV_TYPES[e.type] || EV_TYPES.other;
                    return <div key={e.id} title={e.title} style={{ fontSize: 10.5, lineHeight: '16px', padding: '0 5px', borderRadius: 3, background: `var(--st-${et.st}-bg)`, color: `var(--st-${et.st}-fg)`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>{e.title}</div>;
                  })}
                  {day.length > 3 && <div style={{ fontSize: 9.5, color: 'var(--mute)' }}>+{day.length - 3}</div>}
                </div>);
            })}
          </div>
        </div>
        <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
          <window.Eyebrow style={{ marginBottom: 10 }}>{t('upcoming')}</window.Eyebrow>
          {!events.ready && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('connecting')}</div>}
          {events.ready && events.failed && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('offline')}</div>}
          {events.ready && !events.failed && upcoming.length === 0 && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('noEventsYet')}</div>}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          {upcoming.slice(0, 12).map((e) => {
            const et = EV_TYPES[e.type] || EV_TYPES.other;
            return (
              <div key={e.id} style={{ padding: '9px 0', borderTop: '1px solid var(--hairline)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span className={'ds-status ds-status-' + et.st} style={{ flexShrink: 0 }}>{t(et.key)}</span>
                    <span className="ds-body-sm-strong" style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.title}</span>
                    <span className="ds-caption" style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--mute)', flexShrink: 0, whiteSpace: 'nowrap' }}>{new Date(e.date + 'T00:00:00').toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })}{e.time ? ' \u00b7 ' + e.time : ''}</span>
                  </div>
                  {e.notes && <div className="ds-caption" style={{ color: 'var(--mute)', marginTop: 2 }}>{e.notes}</div>}
                </div>
                {canAdmin && <button onClick={() => onEdit(e)} className="focusable" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mute)', padding: 2, flexShrink: 0 }}><Icon name="pencil" size={14} /></button>}
              </div>);
          })}
          </div>
        </div>
      </div>
    </div>);
}

/* ---- Papers (PubMed RSS + ratings + PDF requests) ---------- */
const RSS_FEEDS = [
  'https://pubmed.ncbi.nlm.nih.gov/rss/search/1TehQ7T6jkwRzgsoum9KDjDM1hRdmim4JpRjMAQS8pS3R2mky9/?limit=20&utm_campaign=pubmed-2',
  'https://pubmed.ncbi.nlm.nih.gov/rss/search/1Z9x4_PuU6zH6JZfff5DlGoQfGiUZdk3QNKoM3ARYhF9J0nsJY/?limit=20&utm_campaign=pubmed-2',
  'https://pubmed.ncbi.nlm.nih.gov/rss/search/1X_9X95vFP0PBATuDIWyDZVJrFAGh6srgD37WpfAc-kYgR5Ixq/?limit=20&utm_campaign=pubmed-2',
  'https://pubmed.ncbi.nlm.nih.gov/rss/search/1vUePJ4Z_tEYAAV_lF6OtQQE1Y65tREu48hUCibph7TdpIcM-I/?limit=20&utm_campaign=pubmed-2',
  'https://pubmed.ncbi.nlm.nih.gov/rss/search/1D73V0aa8O89K8n_ESLEWLahVzA9f6sIBUKXblGNQw2yFNzEOD/?limit=20&utm_campaign=pubmed-2',
  'https://pubmed.ncbi.nlm.nih.gov/rss/search/1xA-2MTbcyzfSn_M2LtbikixaTyIZ3NfBGWNZor1mjnMCP7Q8v/?limit=20&utm_campaign=pubmed-2',
  'https://pubmed.ncbi.nlm.nih.gov/rss/search/12IsuG7_Y-aPSGmRLRYNUTRIP1w3XsAznHSHhPYLVMlgSC_kv5/?limit=20&utm_campaign=pubmed-2'];

function rssHash(str) { let h = 0; for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; } return 'a' + Math.abs(h).toString(36); }
function rssId(item) { return rssHash((item.link || item.guid || item.title || '').split('?')[0].trim().toLowerCase()); }
function stripHtml(s) { const d = document.createElement('div'); d.innerHTML = s || ''; return d.textContent || ''; }
let RSS_CACHE = null;

function Stars({ value, mine, onRate }) {
  const [hover, setHover] = useR(0);
  return (
    <span style={{ display: 'inline-flex', gap: 1 }} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => onRate(n)} onMouseEnter={() => setHover(n)} title={n + '/5'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 1, color: (hover ? n <= hover : n <= Math.round(value)) ? 'var(--st-gold-fg)' : 'var(--hairline-strong)', display: 'flex' }}>
          <Icon name="star" size={15} style={mine === n ? { filter: 'drop-shadow(0 0 2px var(--st-gold-fg))' } : null} />
        </button>))}
    </span>);
}

function Papers({ user }) {
  const { t, locale } = window.useLang();
  const [arts, setArts] = useR({ items: [], loading: !RSS_CACHE, failed: false });
  const [sort, setSort] = useR('date');
  const [dateF, setDateF] = useR('all');
  const ratings = window.useCollection('articleRatings');
  const [myRatings, setMyRatings] = useR(() => { try { return JSON.parse(localStorage.getItem('myArticleRatings') || '{}'); } catch (e) { return {}; } });
  const [reqOpen, setReqOpen] = useR(null);
  const [reqDraft, setReqDraft] = useR({ email: (user && user.email) || '', notes: '' });
  const [sentIds, setSentIds] = useR({});

  useRE(() => {
    let dead = false;
    if (RSS_CACHE) { setArts({ items: RSS_CACHE, loading: false, failed: false }); return; }
    Promise.all(RSS_FEEDS.map((url) => fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url)).then((r) => r.json()).catch(() => null)))
      .then((results) => {
        if (dead) return;
        let items = [];
        results.forEach((res) => { if (res && res.status === 'ok' && res.items) items = items.concat(res.items); });
        const seen = {}, deduped = [];
        items.forEach((it) => { const k = rssId(it); if (!seen[k]) { seen[k] = 1; deduped.push(it); } });
        if (!deduped.length) { setArts({ items: [], loading: false, failed: true }); return; }
        RSS_CACHE = deduped;
        setArts({ items: deduped, loading: false, failed: false });
      }).catch(() => { if (!dead) setArts({ items: [], loading: false, failed: true }); });
    return () => { dead = true; };
  }, []);

  const rMap = useRM(() => { const m = {}; ratings.data.forEach((r) => m[r.id] = r); return m; }, [ratings.data]);
  const list = useRM(() => {
    const now = Date.now();
    const spans = { week: 7, month: 31, year: 366 };
    let out = arts.items.filter((it) => {
      if (dateF === 'all') return true;
      const d = new Date(it.pubDate || 0).getTime();
      return now - d < spans[dateF] * 86400000;
    });
    out = out.slice().sort((a, b) => {
      if (sort === 'rating') {
        const ra = rMap[rssId(a)], rb = rMap[rssId(b)];
        const va = ra && ra.count ? ra.sum / ra.count : 0, vb = rb && rb.count ? rb.sum / rb.count : 0;
        if (vb !== va) return vb - va;
      }
      return new Date(b.pubDate || 0) - new Date(a.pubDate || 0);
    });
    return out;
  }, [arts.items, sort, dateF, rMap]);

  async function rate(item, value) {
    const id = rssId(item);
    const prev = myRatings[id] || 0;
    if (prev === value) return;
    const next = { ...myRatings, [id]: value };
    setMyRatings(next);
    try { localStorage.setItem('myArticleRatings', JSON.stringify(next)); } catch (e) { }
    try { await window.HubDB.submitRating(id, value, prev); } catch (e) { }
  }
  async function sendRequest(item) {
    if (!reqDraft.email) return;
    await window.HubDB.add('paperRequests', { articleTitle: item.title || '', articleLink: item.link || '', email: reqDraft.email, notes: reqDraft.notes, status: 'new' });
    setSentIds({ ...sentIds, [rssId(item)]: true });
    setReqOpen(null); setReqDraft({ ...reqDraft, notes: '' });
  }

  return (
    <div style={{ maxWidth: 860 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <window.Segmented options={[{ value: 'date', label: t('sortDate') }, { value: 'rating', label: t('sortRating') }]} value={sort} onChange={setSort} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[['week', 'fWeek'], ['month', 'fMonth'], ['year', 'fYear'], ['all', 'fAll']].map(([v, k]) =>
            <window.FilterChip key={v} active={dateF === v} onClick={() => setDateF(v)}>{t(k)}</window.FilterChip>)}
        </div>
      </div>
      {arts.loading && <window.EmptyState icon="refresh" title={t('loadingFeed')} />}
      {arts.failed && <window.EmptyState icon="ban" title={t('feedFailed')} />}
      {list.map((it) => {
        const id = rssId(it);
        const r = rMap[id];
        const avg = r && r.count ? r.sum / r.count : 0;
        const desc = stripHtml(it.description).slice(0, 260);
        return (
          <div key={id} style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12 }}>
            <a href={it.link} target="_blank" rel="noreferrer" className="ds-body-sm-strong" style={{ fontSize: 14.5, color: 'var(--ink)', textDecoration: 'none', display: 'block', marginBottom: 4 }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink)'}>{it.title} <Icon name="externalLink" size={12} style={{ verticalAlign: '-1px', color: 'var(--mute)' }} /></a>
            <div className="ds-caption" style={{ color: 'var(--mute)', marginBottom: 6 }}>{it.author ? it.author + ' \u00b7 ' : ''}{it.pubDate ? new Date(it.pubDate).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</div>
            {desc && <p className="ds-body-sm" style={{ color: 'var(--body)', marginBottom: 10 }}>{desc}{stripHtml(it.description).length > 260 ? '\u2026' : ''}</p>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Stars value={avg} mine={myRatings[id]} onRate={(v) => rate(it, v)} />
              <span className="ds-caption" style={{ color: 'var(--mute)' }}>{avg ? avg.toFixed(1) : '\u2013'} {'\u00b7'} {(r && r.count) || 0} {t('ratings')}</span>
              <div style={{ flex: 1 }} />
              {sentIds[id] ?
                <span className="ds-caption" style={{ display: 'inline-flex', gap: 5, alignItems: 'center', color: 'var(--st-green-fg)' }}><Icon name="checkCircle" size={14} />{t('requestSent')}</span> :
                <window.Button size="sm" variant="secondary" icon="download" onClick={() => setReqOpen(reqOpen === id ? null : id)}>{t('requestPdf')}</window.Button>}
            </div>
            {reqOpen === id &&
              <div style={{ marginTop: 12, padding: 12, background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <window.Field label={t('yourEmail')}><input type="email" style={window.fieldStyle} value={reqDraft.email} onChange={(e) => setReqDraft({ ...reqDraft, email: e.target.value })} /></window.Field>
                <window.Field label={t('note')}><input style={window.fieldStyle} placeholder={t('notePh')} value={reqDraft.notes} onChange={(e) => setReqDraft({ ...reqDraft, notes: e.target.value })} /></window.Field>
                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
                  <window.Button size="sm" onClick={() => sendRequest(it)}>{t('send')}</window.Button>
                  <window.Button size="sm" variant="ghost" onClick={() => setReqOpen(null)}>{t('cancel')}</window.Button>
                </div>
              </div>}
          </div>);
      })}
    </div>);
}

/* ---- PDF Library ------------------------------------------- */
function PaperLibrary() {
  const { t } = window.useLang();
  const lib = window.useCollection('paperLibrary', { orderBy: 'createdAt', dir: 'desc' });
  const [copied, setCopied] = useR(null);
  function copy(pmid) {
    try { navigator.clipboard.writeText(pmid); } catch (e) { }
    setCopied(pmid); setTimeout(() => setCopied(null), 1400);
  }
  return (
    <div style={{ maxWidth: 760 }}>
      <div className="ds-body-sm" style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)', color: 'var(--ink)', marginBottom: 18, alignItems: 'flex-start' }}>
        <Icon name="folder" size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }} />
        <span style={{ textWrap: 'pretty' }}>{t('libInstructions')}</span>
      </div>
      {!lib.ready && <window.EmptyState icon="database" title={t('connecting')} />}
      {lib.ready && lib.failed && <window.EmptyState icon="ban" title={t('offline')} />}
      {lib.ready && !lib.failed && lib.data.length === 0 && <window.EmptyState icon="bookMarked" title={t('noEntries')} />}
      {lib.data.map((e) => (
        <div key={e.id} style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 10 }}>
          <div className="ds-body-sm-strong" style={{ fontSize: 14.5, marginBottom: 4 }}>{e.title}</div>
          <div className="ds-caption" style={{ color: 'var(--mute)', marginBottom: 8 }}>
            {e.authors ? e.authors + ' \u00b7 ' : ''}{e.journal ? t('journal') + ': ' + e.journal : ''}{e.year ? ' \u00b7 ' + e.year : ''}</div>
          {e.pmid &&
            <button onClick={() => copy(e.pmid)} className="focusable" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--hairline)', background: copied === e.pmid ? 'var(--st-green-bg)' : 'var(--canvas-soft)', color: copied === e.pmid ? 'var(--st-green-fg)' : 'var(--body)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              <Icon name="copy" size={12} /> {copied === e.pmid ? t('copied') : 'PMID: ' + e.pmid}
            </button>}
        </div>))}
    </div>);
}

/* ---- Tip of the week --------------------------------------- */
function TipChart({ chart }) {
  const rows = (chart.rows || []).map((r) => ({ label: r.label, value: parseFloat(r.value) || 0 }));
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div style={{ margin: '14px 0', padding: 14, background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)' }}>
      {chart.title && <div className="ds-body-sm-strong" style={{ marginBottom: 10 }}>{chart.title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 44px', gap: 8, alignItems: 'center' }}>
            <span className="ds-caption" style={{ color: 'var(--body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>
            <div style={{ height: 16, background: 'var(--canvas-soft-2)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: (r.value / max * 100) + '%', background: 'var(--accent)', borderRadius: 4 }} />
            </div>
            <span className="ds-caption" style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--mute)', textAlign: 'right' }}>{r.value}</span>
          </div>))}
      </div>
    </div>);
}

function TipOfTheWeek() {
  const { t, locale } = window.useLang();
  const tips = window.useCollection('tipPosts', { orderBy: 'createdAt', dir: 'desc' });
  const [open, setOpen] = useR(null);
  const post = open && tips.data.find((p) => p.id === open);
  if (post) {
    return (
      <div style={{ maxWidth: 720 }}>
        <window.Button variant="ghost" size="sm" icon="arrowLeft" onClick={() => setOpen(null)} style={{ marginBottom: 14 }}>{t('qBack')}</window.Button>
        <article style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 26 }}>
          {post.coverImage && <img src={post.coverImage} alt="" style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 18 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
          <h2 className="title-lg" style={{ fontSize: 24, marginBottom: 6 }}>{post.title}</h2>
          <div className="ds-caption" style={{ color: 'var(--mute)', marginBottom: 16 }}>{window.HubDB.fmtTs(post.createdAt, locale)}</div>
          <div className="ds-body-md" style={{ color: 'var(--body)', whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>{post.body}</div>
          {(post.charts || []).map((c, i) => <TipChart key={i} chart={c} />)}
        </article>
      </div>);
  }
  return (
    <div style={{ maxWidth: 760 }}>
      {!tips.ready && <window.EmptyState icon="database" title={t('connecting')} />}
      {tips.ready && tips.failed && <window.EmptyState icon="ban" title={t('offline')} />}
      {tips.ready && !tips.failed && tips.data.length === 0 && <window.EmptyState icon="sparkles" title={t('tipNoPosts')} />}
      {tips.data.map((p) => (
        <div key={p.id} onClick={() => setOpen(p.id)} style={{ display: 'flex', gap: 16, background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12, cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--elev-3)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}>
          {p.coverImage && <img src={p.coverImage} alt="" style={{ width: 130, height: 86, objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0, background: 'var(--canvas-soft-2)' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
          <div style={{ minWidth: 0 }}>
            <div className="ds-body-sm-strong" style={{ fontSize: 15, marginBottom: 3 }}>{p.title}</div>
            <div className="ds-caption" style={{ color: 'var(--mute)', marginBottom: 6 }}>{window.HubDB.fmtTs(p.createdAt, locale)}</div>
            <p className="ds-body-sm" style={{ color: 'var(--body)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.body}</p>
          </div>
        </div>))}
    </div>);
}

/* ---- Shell ------------------------------------------------- */
function ResearchHub({ user, jump }) {
  const { t } = window.useLang();
  const canAdmin = !!(user && user.caps && user.caps.researchAdmin);
  const [section, setSection] = useR('overview');
  const [evEditing, setEvEditing] = useR(null);
  useRE(() => { if (jump && jump.section) setSection(jump.section); }, [jump]);
  const sections = canAdmin ? [...R_SECTIONS, { id: 'admin', tKey: 'r_admin', icon: 'shield' }] : R_SECTIONS;
  return (
    <div data-screen-label="Research Hub" className="fade-up">
      <window.PageHeader eyebrow="Performance Department / Research" title="Research Hub"
        subtitle="Ideas, the research calendar, latest papers, the PDF library, and the PhD programme in one place." />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {sections.map((s) => (
          <window.FilterChip key={s.id} active={section === s.id} onClick={() => setSection(s.id)}>
            <Icon name={s.icon} size={14} /> {t(s.tKey)}
          </window.FilterChip>))}
      </div>
      {section === 'overview' && <ResearchOverview go={setSection} />}
      {section === 'idea' && <IdeaForm />}
      {section === 'calendar' && <ResearchCalendar canAdmin={canAdmin} onEdit={(e) => setEvEditing(e)} />}
      {section === 'papers' && <Papers user={user} />}
      {section === 'library' && <PaperLibrary />}
      {section === 'tip' && <TipOfTheWeek />}
      {section === 'phd' && window.PhdActivities && <window.PhdActivities user={user} />}
      {section === 'quiz' && window.QuizChallenge && <window.QuizChallenge user={user} />}
      {section === 'admin' && canAdmin && window.ResearchAdmin && <window.ResearchAdmin />}
      {evEditing && window.EventEditor && <window.EventEditor initial={evEditing} onClose={() => setEvEditing(null)} />}
    </div>);
}

Object.assign(window, { ResearchHub, ResearchCalendar, TipChart, EV_TYPES, isoR });
