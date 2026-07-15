/* global React, window, Icon */
/* ============================================================
   PSG Performance Workspace: Technology (tech stack + booking)
   Data: 'techStack' + 'techBookings' (same collections the
   original prototype writes; nothing migrated).
   Tabs: Catalog / Bookings / Manage (area admins only).
   ============================================================ */
const { useState: useT, useEffect: useTE, useMemo: useTM } = React;

function DomainPill({ children }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 10px', borderRadius: 'var(--radius-full)', background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-line)', fontFamily: 'var(--font-sans)', fontSize: 11.5, fontWeight: 500, whiteSpace: 'nowrap' }}>{children}</span>;
}
function isoT(d) { const p = (n) => (n < 10 ? '0' + n : '' + n); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }

const fieldStyle = { width: '100%', height: 38, padding: '0 11px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: 'var(--canvas)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontSize: 13.5, outline: 'none', boxSizing: 'border-box' };
const areaStyle = { ...fieldStyle, height: 'auto', minHeight: 74, padding: '9px 11px', resize: 'vertical', lineHeight: 1.45 };
const lblStyle = { display: 'block', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500, color: 'var(--body)', marginBottom: 5 };
function Field({ label, children, span }) {
  return <div style={{ gridColumn: span ? '1 / -1' : undefined }}><label style={lblStyle}>{label}</label>{children}</div>;
}
function Modal({ onClose, width = 640, children }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(12,16,26,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} className="fade-up scroll" style={{ width, maxWidth: '100%', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto', background: 'var(--canvas)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--elev-5)', padding: 26 }}>
        {children}
      </div>
    </div>);
}
function ModalHead({ title, sub, onClose }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
      <div>
        <div className="ds-body-md-strong" style={{ fontSize: 19, letterSpacing: '-0.2px' }}>{title}</div>
        {sub && <div className="ds-body-sm" style={{ color: 'var(--mute)', marginTop: 3 }}>{sub}</div>}
      </div>
      <button onClick={onClose} className="focusable" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mute)', padding: 4 }}><Icon name="x" size={18} /></button>
    </div>);
}

const DT_COLORS = { A: 'var(--st-green-bg)', B: 'var(--st-gold-bg)', C: 'var(--st-red-bg)' };
const DT_FG = { A: 'var(--st-green-fg)', B: 'var(--st-gold-fg)', C: 'var(--st-red-fg)' };
function DataTypeBadge({ type }) {
  if (!type) return null;
  return <span style={{ display: 'inline-flex', alignItems: 'center', height: 21, padding: '0 8px', borderRadius: 'var(--radius-full)', background: DT_COLORS[type] || 'var(--canvas-soft-2)', color: DT_FG[type] || 'var(--body)', fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.4px' }}>TYPE {type}</span>;
}

/* ---- Booking form + upcoming list inside item modal ------- */
function BookingPanel({ item, bookings, user }) {
  const { t } = window.useLang();
  const [open, setOpen] = useT(false);
  const [ok, setOk] = useT(false);
  const [d, setD] = useT({ name: (user && user.name) || '', start: '', end: '', location: '', purpose: '' });
  const today = isoT(new Date());
  const key = (item.equipment || '') + '|' + (item.brand || '');
  const upcoming = bookings.filter((b) => (b.itemKey === key || b.equipmentName === item.equipment) && b.endDate >= today).sort((a, b) => a.startDate < b.startDate ? -1 : 1);
  async function submit() {
    if (!d.name || !d.start || !d.end) return;
    await window.HubDB.add('techBookings', { itemKey: key, equipmentName: item.equipment, brand: item.brand || '', requesterName: d.name, startDate: d.start, endDate: d.end < d.start ? d.start : d.end, location: d.location, purpose: d.purpose });
    setOpen(false); setOk(true);
  }
  return (
    <div style={{ marginTop: 20, borderTop: '1px solid var(--hairline)', paddingTop: 16 }}>
      {ok && <div className="ds-body-sm" style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--st-green-bg)', color: 'var(--st-green-fg)', marginBottom: 12 }}><Icon name="checkCircle" size={16} />{t('t_confirmed')}</div>}
      {!open && <window.Button icon="calendar" onClick={() => { setOpen(true); setOk(false); }}>{t('t_bookCal')}</window.Button>}
      {open &&
        <div style={{ background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label={t('t_yourName')} span><input style={fieldStyle} value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /></Field>
            <Field label={t('t_start')}><input type="date" style={fieldStyle} value={d.start} onChange={(e) => setD({ ...d, start: e.target.value })} /></Field>
            <Field label={t('t_end')}><input type="date" style={fieldStyle} min={d.start} value={d.end} onChange={(e) => setD({ ...d, end: e.target.value })} /></Field>
            <Field label={t('t_where')}><input style={fieldStyle} value={d.location} onChange={(e) => setD({ ...d, location: e.target.value })} placeholder="Ooredoo / Campus..." /></Field>
            <Field label={t('t_what')}><input style={fieldStyle} value={d.purpose} onChange={(e) => setD({ ...d, purpose: e.target.value })} /></Field>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <window.Button onClick={submit}>{t('t_confirm')}</window.Button>
            <window.Button variant="ghost" onClick={() => setOpen(false)}>{t('cancel')}</window.Button>
          </div>
        </div>}
      <div style={{ marginTop: 16 }}>
        <window.Eyebrow style={{ marginBottom: 8 }}>{t('t_upBookings')}</window.Eyebrow>
        {upcoming.length === 0 && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('t_noBookings')}</div>}
        {upcoming.map((b) => (
          <div key={b.id} style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '7px 0', borderTop: '1px solid var(--hairline)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--accent)', whiteSpace: 'nowrap' }}>{b.startDate} {'\u2192'} {b.endDate}</span>
            <span className="ds-body-sm" style={{ color: 'var(--body)' }}>{b.requesterName || '\u2014'}{b.location ? ' \u00b7 ' + b.location : ''}{b.purpose ? ' \u00b7 ' + b.purpose : ''}</span>
          </div>))}
      </div>
    </div>);
}

function ItemModal({ item, bookings, user, onClose }) {
  const { t } = window.useLang();
  const rows = [[t('t_domain'), item.primary_domain || item.domain_norm], ['Location', item.location], ['Purpose', item.purpose], ['Variables', item.variables], ['Frequency', item.frequency], [t('t_owner'), item.owner], ['Country', item.country], ['Category', item.category]];
  return (
    <Modal onClose={onClose} width={620}>
      <ModalHead title={item.equipment} sub={(item.brand || 'Unknown brand') + (item.founded && item.founded !== 'N/A' ? ' \u00b7 Est. ' + item.founded : '')} onClose={onClose} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {item.domain_norm && <DomainPill>{item.domain_norm}</DomainPill>}
        <DataTypeBadge type={item.data_type} />
      </div>
      {item.description && item.description !== 'N/A' && <p className="ds-body-sm" style={{ color: 'var(--body)', marginBottom: 16, textWrap: 'pretty' }}>{item.description}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}>
        {rows.filter(([, v]) => v && v !== 'N/A').map(([k, v]) => (
          <div key={k} style={{ padding: '7px 0', borderBottom: '1px solid var(--hairline)' }}>
            <div className="ds-caption" style={{ color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.6px', fontSize: 10, marginBottom: 2 }}>{k}</div>
            <div className="ds-body-sm" style={{ color: 'var(--ink)' }}>{v}</div>
          </div>))}
      </div>
      <BookingPanel item={item} bookings={bookings} user={user} />
    </Modal>);
}

/* ---- Admin editor ------------------------------------------ */
const TECH_FIELDS = [
  ['equipment', 'Equipment name *'], ['brand', 'Brand'], ['category', 'Category'], ['domain_norm', 'Domain'],
  ['data_type', 'Data type (A/B/C)'], ['location', 'Location'], ['owner', 'Owner'], ['country', 'Country'],
  ['purpose', 'Purpose'], ['variables', 'Variables'], ['frequency', 'Frequency']];
function TechEditor({ initial, domains, onClose }) {
  const [d, setD] = useT(() => {
    const base = {}; TECH_FIELDS.forEach(([k]) => base[k] = (initial && initial[k]) || '');
    base.description = (initial && initial.description) || '';
    return base;
  });
  async function save() {
    if (!d.equipment.trim()) return;
    if (initial && initial.id) await window.HubDB.update('techStack', initial.id, d);
    else await window.HubDB.add('techStack', d);
    onClose();
  }
  return (
    <Modal onClose={onClose} width={680}>
      <ModalHead title={initial ? 'Edit equipment' : 'Add equipment'} sub="Changes go live for everyone immediately." onClose={onClose} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {TECH_FIELDS.map(([k, label]) => (
          <Field key={k} label={label}>
            {k === 'domain_norm' ?
              <input style={fieldStyle} list="tech-domains" value={d[k]} onChange={(e) => setD({ ...d, [k]: e.target.value })} /> :
              k === 'data_type' ?
                <select style={fieldStyle} value={d[k]} onChange={(e) => setD({ ...d, [k]: e.target.value })}>
                  <option value="">{'\u2014'}</option><option value="A">A</option><option value="B">B</option><option value="C">C</option>
                </select> :
                <input style={fieldStyle} value={d[k]} onChange={(e) => setD({ ...d, [k]: e.target.value })} />}
          </Field>))}
        <datalist id="tech-domains">{domains.map((x) => <option key={x} value={x} />)}</datalist>
        <Field label="Description" span><textarea style={areaStyle} value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} /></Field>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
        <window.Button onClick={save}>Save</window.Button>
        <window.Button variant="ghost" onClick={onClose}>Cancel</window.Button>
      </div>
    </Modal>);
}

/* ---- Bookings calendar ------------------------------------- */
function BookingsView({ bookings, ready, failed }) {
  const { t, locale } = window.useLang();
  const [cal, setCal] = useT(() => { const d = new Date(); d.setDate(1); return d; });
  const today = isoT(new Date());
  const cells = useTM(() => {
    const first = new Date(cal.getFullYear(), cal.getMonth(), 1);
    const startPad = (first.getDay() + 6) % 7;
    const days = new Date(cal.getFullYear(), cal.getMonth() + 1, 0).getDate();
    const out = [];
    for (let i = 0; i < startPad; i++) out.push(null);
    for (let d = 1; d <= days; d++) out.push(isoT(new Date(cal.getFullYear(), cal.getMonth(), d)));
    return out;
  }, [cal]);
  const upcoming = bookings.filter((b) => b.endDate >= today).sort((a, b) => a.startDate < b.startDate ? -1 : 1);
  function move(n) { const d = new Date(cal); d.setMonth(d.getMonth() + n); setCal(d); }
  return (
    <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(260px, 1fr)', gap: 20, alignItems: 'start' }}>
      <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div className="ds-body-md-strong" style={{ textTransform: 'capitalize' }}>{cal.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <window.Button variant="ghost" size="sm" icon="chevronLeft" onClick={() => move(-1)} />
            <window.Button variant="ghost" size="sm" onClick={() => setCal(() => { const d = new Date(); d.setDate(1); return d; })}>{t('today')}</window.Button>
            <window.Button variant="ghost" size="sm" icon="chevronRight" onClick={() => move(1)} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w) => <div key={w} className="ds-caption" style={{ color: 'var(--mute)', textAlign: 'center', padding: '2px 0', fontFamily: 'var(--font-mono)', fontSize: 10 }}>{w}</div>)}
          {cells.map((dStr, i) => {
            if (!dStr) return <div key={'p' + i} />;
            const day = bookings.filter((b) => b.startDate <= dStr && b.endDate >= dStr);
            return (
              <div key={dStr} style={{ minHeight: 62, borderRadius: 6, border: '1px solid var(--hairline)', background: dStr === today ? 'var(--accent-soft)' : 'var(--canvas)', padding: 4, overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: dStr === today ? 'var(--accent)' : 'var(--mute)', fontWeight: dStr === today ? 700 : 400, marginBottom: 2 }}>{+dStr.slice(-2)}</div>
                {day.slice(0, 2).map((b) => <div key={b.id} title={b.equipmentName + ' \u2014 ' + (b.requesterName || '')} style={{ fontSize: 10, lineHeight: '15px', padding: '0 4px', borderRadius: 3, background: 'var(--accent)', color: 'var(--accent-contrast)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2 }}>{b.equipmentName}</div>)}
                {day.length > 2 && <div style={{ fontSize: 9.5, color: 'var(--mute)' }}>+{day.length - 2}</div>}
              </div>);
          })}
        </div>
      </div>
      <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 18 }}>
        <window.Eyebrow style={{ marginBottom: 10 }}>{t('t_allUpcoming')}</window.Eyebrow>
        {!ready && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('connecting')}</div>}
        {ready && failed && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('offline')}</div>}
        {ready && !failed && upcoming.length === 0 && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('t_noBookingsAll')}</div>}
        {upcoming.slice(0, 14).map((b) => (
          <div key={b.id} style={{ padding: '9px 0', borderTop: '1px solid var(--hairline)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)' }}>{b.startDate} {'\u2192'} {b.endDate}</div>
            <div className="ds-body-sm-strong">{b.equipmentName}{b.brand ? <span style={{ fontWeight: 400, color: 'var(--mute)' }}> ({b.brand})</span> : null}</div>
            <div className="ds-caption" style={{ color: 'var(--mute)' }}>{b.requesterName || '\u2014'}{b.location ? ' \u00b7 ' + b.location : ''}{b.purpose ? ' \u00b7 ' + b.purpose : ''}</div>
          </div>))}
      </div>
    </div>);
}

/* ---- Main screen ------------------------------------------- */
function Technology({ user }) {
  const { t } = window.useLang();
  const canAdmin = !!(user && user.caps && user.caps.techAdmin);
  const items = window.useCollection('techStack');
  const bookings = window.useCollection('techBookings', { orderBy: 'startDate' });
  const [tab, setTab] = useT('catalog');
  const [q, setQ] = useT('');
  const [dom, setDom] = useT('all');
  const [owner, setOwner] = useT('all');
  const [dt, setDt] = useT('all');
  const [view, setView] = useT('grid');
  const [sel, setSel] = useT(null);
  const [editing, setEditing] = useT(undefined); // undefined closed, null new, obj edit
  const [confirmDel, setConfirmDel] = useT(null);

  const domains = useTM(() => [...new Set(items.data.map((i) => i.domain_norm).filter(Boolean))].sort(), [items.data]);
  const owners = useTM(() => [...new Set(items.data.map((i) => i.owner).filter((x) => x && x !== 'N/A'))].sort(), [items.data]);
  const filtered = useTM(() => {
    const ql = q.toLowerCase();
    return items.data.filter((it) =>
      (dom === 'all' || it.domain_norm === dom) &&
      (owner === 'all' || (it.owner || '').toLowerCase().includes(owner.toLowerCase())) &&
      (dt === 'all' || it.data_type === dt) &&
      (!ql || ['equipment', 'brand', 'purpose', 'description', 'category', 'variables'].some((k) => (it[k] || '').toLowerCase().includes(ql)))
    ).sort((a, b) => (a.equipment || '').localeCompare(b.equipment || ''));
  }, [items.data, q, dom, owner, dt]);

  const tabs = [{ value: 'catalog', label: 'Catalog', icon: 'shapes' }, { value: 'bookings', label: t('t_bookings'), icon: 'calendar' }];
  if (canAdmin) tabs.push({ value: 'manage', label: 'Manage', icon: 'settings' });

  return (
    <div data-screen-label="Technology" className="fade-up">
      <window.PageHeader eyebrow="Performance Department / Technology" title="Technology"
        subtitle="The department's tech stack: every device, what it measures, where it lives, and the booking calendar."
        actions={<window.Segmented options={tabs} value={tab} onChange={setTab} />} />

      {tab === 'bookings' && <BookingsView bookings={bookings.data} ready={bookings.ready} failed={bookings.failed} />}

      {tab !== 'bookings' &&
        <div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 380 }}>
              <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--mute)' }}><Icon name="search" size={15} /></span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('t_search')} style={{ ...fieldStyle, paddingLeft: 34 }} />
            </div>
            <select value={owner} onChange={(e) => setOwner(e.target.value)} style={{ ...fieldStyle, width: 'auto' }}>
              <option value="all">{t('t_owner')}: {t('fAll')}</option>
              {owners.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <select value={dt} onChange={(e) => setDt(e.target.value)} style={{ ...fieldStyle, width: 'auto' }}>
              <option value="all">{t('t_datatype')}: {t('fAll')}</option>
              {['A', 'B', 'C'].map((x) => <option key={x} value={x}>Type {x}</option>)}
            </select>
            {tab === 'catalog' &&
              <window.Segmented options={[{ value: 'grid', icon: 'grid', label: '' }, { value: 'table', icon: 'list', label: '' }]} value={view} onChange={setView} />}
            {tab === 'manage' && <window.Button icon="plus" onClick={() => setEditing(null)}>Add equipment</window.Button>}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
            <window.FilterChip active={dom === 'all'} onClick={() => setDom('all')}>{t('fAll')}</window.FilterChip>
            {domains.map((d) => <window.FilterChip key={d} active={dom === d} onClick={() => setDom(d)}>{d}</window.FilterChip>)}
          </div>
          <div className="ds-caption" style={{ color: 'var(--mute)', marginBottom: 12 }}>{filtered.length} {filtered.length === 1 ? t('t_item') : t('t_items')}</div>

          {!items.ready && <window.EmptyState icon="database" title={t('connecting')} />}
          {items.ready && items.failed && <window.EmptyState icon="ban" title={t('offline')} />}
          {items.ready && !items.failed && filtered.length === 0 && <window.EmptyState title={t('t_noResults')} body={t('t_noResultsSub')} />}

          {tab === 'catalog' && view === 'grid' &&
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 14 }}>
              {filtered.map((it) => (
                <div key={it.id} onClick={() => setSel(it)} style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 16, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, boxShadow: 'var(--elev-1)', transition: 'box-shadow .16s, transform .16s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--elev-3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--elev-1)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                    <div className="ds-body-md-strong" style={{ fontSize: 15 }}>{it.equipment}</div>
                    {it.brand && <div className="ds-caption" style={{ color: 'var(--mute)', whiteSpace: 'nowrap' }}>{it.brand}</div>}
                  </div>
                  {it.domain_norm && <div><DomainPill>{it.domain_norm}</DomainPill></div>}
                  <p className="ds-body-sm" style={{ color: 'var(--body)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 38 }}>
                    {(it.description && it.description !== 'N/A') ? it.description : (it.purpose || '\u2014')}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 'auto', paddingTop: 8, borderTop: '1px solid var(--hairline)' }}>
                    <span className="ds-caption" style={{ color: 'var(--mute)', display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="mapPin" size={12} />{it.location || '\u2014'}</span>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <DataTypeBadge type={it.data_type} />
                      <window.Button size="sm" variant="secondary" icon="calendar" onClick={(e) => { e.stopPropagation(); setSel(it); }}>{t('t_book')}</window.Button>
                    </div>
                  </div>
                </div>))}
            </div>}

          {tab === 'catalog' && view === 'table' &&
            <div className="scroll" style={{ overflowX: 'auto', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
                <thead><tr>{['Equipment', 'Brand', 'Domain', 'Location', 'Purpose', 'Frequency', 'Owner', 'Type'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid var(--hairline)', color: 'var(--mute)', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.8px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>)}</tr></thead>
                <tbody>{filtered.map((it) => (
                  <tr key={it.id} onClick={() => setSel(it)} style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--canvas-soft)'} onMouseLeave={(e) => e.currentTarget.style.background = ''}>
                    <td style={tdS}><strong>{it.equipment}</strong></td><td style={tdS}>{it.brand || '\u2014'}</td>
                    <td style={tdS}>{it.domain_norm ? <DomainPill>{it.domain_norm}</DomainPill> : '\u2014'}</td>
                    <td style={tdS}>{it.location || '\u2014'}</td><td style={{ ...tdS, maxWidth: 220 }}>{it.purpose || '\u2014'}</td>
                    <td style={tdS}>{it.frequency || '\u2014'}</td><td style={tdS}>{it.owner || '\u2014'}</td>
                    <td style={tdS}><DataTypeBadge type={it.data_type} /></td>
                  </tr>))}</tbody>
              </table>
            </div>}

          {tab === 'manage' &&
            <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)' }}>
              {filtered.map((it, i) => (
                <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderTop: i ? '1px solid var(--hairline)' : 'none' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span className="ds-body-sm-strong">{it.equipment}</span>
                    <span className="ds-caption" style={{ color: 'var(--mute)', marginLeft: 8 }}>{[it.brand, it.domain_norm, it.location].filter(Boolean).join(' \u00b7 ')}</span>
                  </div>
                  <DataTypeBadge type={it.data_type} />
                  <window.Button size="sm" variant="ghost" icon="pencil" onClick={() => setEditing(it)}>Edit</window.Button>
                  {confirmDel === it.id ?
                    <window.Button size="sm" variant="secondary" icon="trash" style={{ color: 'var(--st-red-fg)' }} onClick={async () => { await window.HubDB.remove('techStack', it.id); setConfirmDel(null); }}>Confirm?</window.Button> :
                    <window.Button size="sm" variant="ghost" icon="trash" onClick={() => setConfirmDel(it.id)} />}
                </div>))}
            </div>}
        </div>}

      {sel && <ItemModal item={sel} bookings={bookings.data} user={user} onClose={() => setSel(null)} />}
      {editing !== undefined && <TechEditor initial={editing} domains={domains} onClose={() => setEditing(undefined)} />}
    </div>);
}
const tdS = { padding: '10px 12px', borderBottom: '1px solid var(--hairline)', color: 'var(--body)', whiteSpace: 'nowrap' };

Object.assign(window, { Technology, Modal, ModalHead, Field, fieldStyle, areaStyle, lblStyle, DataTypeBadge });
