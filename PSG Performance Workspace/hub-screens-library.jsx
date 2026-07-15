/* global React, window */
/* ============================================================
   PSG Performance Hub: Asset Library + Objectives
   ============================================================ */
const { useState: useS3, useEffect: useE3 } = React;
const {
  Icon, Button, StatusBadge, DisciplineDot, DisciplineTag, Chip, FileTypeChip, Avatar,
  Eyebrow, PageHeader, EmptyState, FilterChip, Segmented,
  DISCIPLINES, DISCIPLINE_LIST, ASSET_CATEGORIES, DATAVIZ_GROUPS, ASSETS, OBJECTIVES,
  fmtDate, statusKey,
} = window;

/* ---- Asset thumbnail (crafted placeholder per type) ------ */
function AssetThumb({ asset, big }) {
  const wrap = { position: 'relative', width: '100%', aspectRatio: big ? '16/8' : '16/9', borderRadius: big ? 'var(--radius-lg)' : 'var(--radius-md)', overflow: 'hidden', background: 'var(--canvas-soft-2)', border: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column' };
  const bar = (w, c, h = 7) => <div style={{ height: h, width: w, borderRadius: 3, background: c }} />;

  if (asset.id === 'design-md' || (asset.category === 'design' && asset.filetype === 'MD')) {
    return <div style={{ ...wrap, background: '#0e1626', padding: 16, gap: 7, justifyContent: 'center', fontFamily: 'var(--font-mono)' }}>
      <span style={{ color: '#74a8f5', fontSize: 11 }}># Design System</span>
      <span style={{ color: '#5fcf8e', fontSize: 10 }}>--accent: #0c2a5e;</span>
      <span style={{ color: '#aab4c4', fontSize: 10 }}>font: 'Virage', 'Geist';</span>
      <span style={{ color: '#f2bd5e', fontSize: 10 }}>radius: 6 / 8 / 12px;</span>
    </div>;
  }
  if (asset.category === 'design') {
    return <div style={{ ...wrap, background: 'var(--canvas)', padding: 14, justifyContent: 'center', alignItems: 'center' }}>
      <img src="assets/logos/psg-crest-color.svg" alt="" style={{ height: big ? 64 : 42, width: 'auto', objectFit: 'contain' }} />
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        {['var(--psg-navy)', 'var(--psg-red)', 'var(--psg-gold)'].map((c, i) => <span key={i} style={{ width: 16, height: 16, borderRadius: 4, background: c }} />)}
      </div>
    </div>;
  }
  if (asset.category === 'decks') {
    return <div style={{ ...wrap, background: '#fff' }}>
      <div className="img-placeholder" style={{ height: '38%', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 14, bottom: 10 }}>{bar(big ? 120 : 80, 'var(--hairline-strong)', 9)}</div>
      </div>
      <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 7, justifyContent: 'center' }}>
        {bar('70%', 'var(--hairline-strong)')}{bar('92%', 'var(--gray-300)')}{bar('84%', 'var(--gray-300)')}
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <div style={{ width: 34, height: 34, borderRadius: 6, background: 'var(--accent-soft)' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center' }}>{bar('100%', 'var(--gray-300)', 6)}{bar('80%', 'var(--gray-300)', 6)}</div>
        </div>
      </div>
    </div>;
  }
  if (asset.group === 'Tableau Templates') {
    return <div style={{ ...wrap, background: '#fff', padding: 14, gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{bar(60, 'var(--ink)', 8)}{bar(34, 'var(--accent)', 8)}</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        {[40, 65, 50, 80, 60, 95, 70].map((h, i) => <div key={i} style={{ flex: 1, height: h + '%', borderRadius: '3px 3px 0 0', background: i % 2 ? 'var(--accent)' : 'var(--st-blue-dot)', opacity: 0.85 }} />)}
      </div>
    </div>;
  }
  if (asset.group === 'Data-Viz Colour Guide') {
    return <div style={{ ...wrap, background: '#fff', padding: 0 }}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {['#0c2a5e', '#2f7df0', '#0a7b6e', '#1a9750', '#c8a45c', '#e29209', '#c0397e', '#7b52c9'].map((c, i) => <div key={i} style={{ background: c }} />)}
      </div>
    </div>;
  }
  if (asset.group === 'Data-Viz Best Practices') {
    return <div style={{ ...wrap, background: '#fff', padding: 16, justifyContent: 'center', gap: 9 }}>
      <svg viewBox="0 0 120 50" style={{ width: '100%', height: '60%' }}><polyline points="2,46 24,30 46,36 68,16 90,22 118,4" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--st-green-fg)', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600 }}><Icon name="check" size={13} /> Clean, no chartjunk</div>
    </div>;
  }
  // templates / default: document page
  return <div style={{ ...wrap, background: 'var(--canvas-soft)', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ width: '54%', aspectRatio: '3/4', background: '#fff', borderRadius: 4, boxShadow: 'var(--elev-2)', padding: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
      {bar('60%', 'var(--accent)', 6)}<div style={{ height: 4 }} />{bar('100%', 'var(--gray-300)', 4)}{bar('92%', 'var(--gray-300)', 4)}{bar('96%', 'var(--gray-300)', 4)}{bar('70%', 'var(--gray-300)', 4)}
    </div>
  </div>;
}

function AssetCard({ asset, onOpen }) {
  const [h, setH] = useS3(false);
  return (
    <article onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', flexDirection: 'column', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: h ? 'var(--elev-4)' : 'var(--elev-2)', transform: h ? 'translateY(-3px)' : 'none', transition: 'box-shadow .16s, transform .16s' }}>
      <div style={{ padding: 12, paddingBottom: 0, cursor: 'pointer' }} onClick={() => onOpen(asset)}><AssetThumb asset={asset} /></div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ cursor: 'pointer' }} onClick={() => onOpen(asset)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <FileTypeChip type={asset.filetype} />
            <span className="ds-caption" style={{ color: 'var(--mute)' }}>{asset.size}</span>
          </div>
          <h3 className="ds-body-md-strong" style={{ fontSize: 15.5, marginBottom: 4 }}>{asset.name}</h3>
          <p className="ds-caption" style={{ color: 'var(--mute)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{asset.desc}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 'auto' }}>
          <Avatar name={asset.owner} size={20} /><span className="ds-caption" style={{ color: 'var(--mute)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.owner} / {fmtDate(asset.updated)}</span>
        </div>
        <Button variant="primary" size="md" icon="download" style={{ width: '100%' }}>Download</Button>
      </div>
    </article>
  );
}

function AssetListRow({ asset, onOpen }) {
  const [h, setH] = useS3(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 12, background: h ? 'var(--canvas-soft)' : 'var(--canvas)', transition: 'background .14s' }}>
      <div style={{ width: 88, flexShrink: 0, cursor: 'pointer' }} onClick={() => onOpen(asset)}><AssetThumb asset={asset} /></div>
      <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => onOpen(asset)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3 }}><span className="ds-body-md-strong" style={{ fontSize: 15 }}>{asset.name}</span><FileTypeChip type={asset.filetype} /></div>
        <p className="ds-caption" style={{ color: 'var(--mute)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 540 }}>{asset.desc}</p>
      </div>
      <span className="ds-caption" style={{ color: 'var(--mute)', flexShrink: 0 }}>{asset.size}</span>
      <span className="ds-caption" style={{ color: 'var(--mute)', flexShrink: 0, width: 110 }}>{asset.owner}</span>
      <Button variant="primary" size="sm" icon="download">Download</Button>
    </div>
  );
}

function AssetModal({ asset, onClose }) {
  const cat = ASSET_CATEGORIES.find(c => c.id === asset.category);
  return (
    <div className="fade-in" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(8,16,30,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="fade-up" onClick={e => e.stopPropagation()} style={{ width: 720, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', background: 'var(--canvas)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--elev-5)', border: '1px solid var(--hairline)' }} className="scroll">
        <div style={{ padding: 24, paddingBottom: 0, position: 'relative' }}>
          <button onClick={onClose} className="focusable" style={{ position: 'absolute', top: 20, right: 20, width: 34, height: 34, borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: 'var(--canvas)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--body)', zIndex: 2 }}><Icon name="x" size={18} /></button>
          <AssetThumb asset={asset} big />
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <FileTypeChip type={asset.filetype} /><Chip>{asset.size}</Chip>{cat && <span className="ds-caption" style={{ color: 'var(--mute)' }}>{cat.label}{asset.group ? ` / ${asset.group}` : ''}</span>}
          </div>
          <h2 className="title-lg" style={{ fontSize: 26, marginBottom: 10 }}>{asset.name}</h2>
          <p className="ds-body-md" style={{ color: 'var(--body)', marginBottom: 20, textWrap: 'pretty' }}>{asset.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 'var(--radius-md)', border: '1px solid var(--hairline)', overflow: 'hidden', marginBottom: 20 }}>
            {[['Owner', asset.owner], ['Last updated', fmtDate(asset.updated)], ['File type', asset.filetype], ['Size', asset.size]].map(([k, v], i) => (
              <div key={k} style={{ padding: '12px 16px', borderTop: i > 1 ? '1px solid var(--hairline)' : 'none', borderLeft: i % 2 ? '1px solid var(--hairline)' : 'none' }}>
                <div className="ds-caption" style={{ color: 'var(--mute)', marginBottom: 2 }}>{k}</div><div className="ds-body-sm-strong">{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="primary" size="lg" icon="download" style={{ flex: 1 }}>Download {asset.filetype}</Button>
            <Button variant="secondary" size="lg" icon="link">Copy link</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssetLibrary({ initialCat, focus }) {
  const [cat, setCat] = useS3(initialCat || 'all');
  const [ftype, setFtype] = useS3('all');
  const [view, setView] = useS3('grid');
  const [open, setOpen] = useS3(null);
  useE3(() => { if (initialCat) setCat(initialCat); }, [initialCat]);
  useE3(() => { if (focus && focus.id) { const a = ASSETS.find(x => x.id === focus.id); if (a) { setOpen(a); setCat('all'); } } }, [focus]);

  let list = ASSETS.filter(a => cat === 'all' || a.category === cat).filter(a => ftype === 'all' || a.filetype === ftype);
  const ftypes = [...new Set(ASSETS.filter(a => cat === 'all' || a.category === cat).map(a => a.filetype))];

  const tabs = [{ id: 'all', label: 'All assets', icon: 'library' }, ...ASSET_CATEGORIES];

  function renderItems(items) {
    return view === 'grid'
      ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(252px, 1fr))', gap: 18 }}>{items.map(a => <AssetCard key={a.id} asset={a} onOpen={setOpen} />)}</div>
      : <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)', overflow: 'hidden', boxShadow: 'var(--elev-2)' }}>{items.map((a, i) => <div key={a.id} style={{ borderTop: i ? '1px solid var(--hairline)' : 'none' }}><AssetListRow asset={a} onOpen={setOpen} /></div>)}</div>;
  }

  return (
    <div data-screen-label="Asset Library" className="fade-up">
      {open && <AssetModal asset={open} onClose={() => setOpen(null)} />}
      <PageHeader eyebrow="Downloadables" title="Asset Library"
        subtitle="Templates, brand files and guides: everything the department shares, ready to download."
        actions={<Segmented value={view} onChange={setView} options={[{ value: 'grid', icon: 'grid' }, { value: 'list', icon: 'list' }]} />} />

      {/* Category tabs */}
      <div className="scroll" style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 2 }}>
        {tabs.map(t => <FilterChip key={t.id} active={cat === t.id} onClick={() => { setCat(t.id); setFtype('all'); }}>{t.label}</FilterChip>)}
      </div>
      {/* File-type filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        <span className="ds-caption" style={{ color: 'var(--mute)', fontFamily: 'var(--font-mono)' }}>FILE TYPE</span>
        <FilterChip active={ftype === 'all'} onClick={() => setFtype('all')}>All</FilterChip>
        {ftypes.map(f => <FilterChip key={f} active={ftype === f} onClick={() => setFtype(f)}>{f}</FilterChip>)}
      </div>

      {/* Data Visualisation sub-grouping */}
      {cat === 'dataviz' && ftype === 'all' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {DATAVIZ_GROUPS.map(g => {
            const items = list.filter(a => a.group === g);
            if (!items.length) return null;
            return <section key={g}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>{g}</div>
              {renderItems(items)}
            </section>;
          })}
        </div>
      ) : list.length === 0 ? <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)' }}><EmptyState icon="library" title="No assets here yet" body="Try another category or file type." /></div>
        : renderItems(list)}
    </div>
  );
}

/* ============================================================
   OBJECTIVES (board grouped by discipline)
   ============================================================ */
function ObjectiveCard({ o }) {
  const [h, setH] = useS3(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: 14, boxShadow: h ? 'var(--elev-3)' : 'var(--elev-1)', transition: 'box-shadow .14s', display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div className="ds-body-sm-strong" style={{ fontSize: 14, lineHeight: 1.32, textWrap: 'pretty' }}>{o.title}</div>
      <p className="ds-caption" style={{ color: 'var(--mute)', lineHeight: 1.45 }}>{o.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
        <Avatar name={o.owner} size={20} /><span className="ds-caption" style={{ color: 'var(--body)', flex: 1 }}>{o.owner}</span>
        <StatusBadge status={o.status} size="sm" />
      </div>
    </div>
  );
}

const QUARTERS = ['Q1 / 2026', 'Q2 / 2026', 'Q3 / 2026'];
function Objectives() {
  const [quarter, setQuarter] = useS3('Q2 / 2026');
  const hasData = quarter === 'Q2 / 2026';
  return (
    <div data-screen-label="Objectives" className="fade-up">
      <PageHeader eyebrow="Quarterly team objectives" title="Objectives"
        subtitle="What each discipline is committed to this quarter: read a discipline's quarter in seconds."
        actions={
          <div style={{ display: 'inline-flex', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', overflow: 'hidden' }}>
            {QUARTERS.map((ql, i) => <button key={ql} onClick={() => setQuarter(ql)} className="focusable" style={{ height: 38, padding: '0 14px', border: 'none', borderLeft: i ? '1px solid var(--hairline)' : 'none', cursor: 'pointer', background: quarter === ql ? 'var(--accent)' : 'var(--canvas)', color: quarter === ql ? 'var(--accent-contrast)' : 'var(--body)', fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 500 }}>{ql}</button>)}
          </div>
        } />

      {!hasData ? <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)' }}><EmptyState icon="target" title={`No objectives recorded for ${quarter}`} body="Objectives for this quarter haven't been set yet. Switch to Q2 / 2026 to view the current set." /></div>
        : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(232px, 1fr))', gap: 16, alignItems: 'start' }}>
            {DISCIPLINE_LIST.map(d => {
              const items = OBJECTIVES.filter(o => o.discipline === d.id);
              const done = items.filter(o => o.status === 'Done').length;
              return (
                <section key={d.id} style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--canvas-soft)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)', padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 4px' }}>
                    <span style={{ width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--canvas-soft-2)', color: 'var(--body)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={d.icon} size={15} /></span>
                    <span className="ds-body-sm-strong" style={{ flex: 1, fontSize: 13.5 }}>{d.short}</span>
                    <span className="ds-caption" style={{ fontFamily: 'var(--font-mono)', color: 'var(--mute)' }}>{done}/{items.length}</span>
                  </div>
                  {items.map(o => <ObjectiveCard key={o.id} o={o} />)}
                </section>
              );
            })}
          </div>}
    </div>
  );
}

Object.assign(window, { AssetLibrary, AssetThumb, AssetCard, AssetModal, Objectives });
