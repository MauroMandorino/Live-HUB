/* global React, window */
/* ============================================================
   PSG Performance Hub: Updates + Knowledge Base
   ============================================================ */
const { useState: useS2, useEffect: useE2 } = React;
const {
  Icon, Button, StatusBadge, DisciplineTag, DisciplineDot, Chip, FileTypeChip, Avatar,
  Eyebrow, PageHeader, EmptyState, FilterChip, DisciplineFilter,
  DISCIPLINES, DISCIPLINE_LIST, QUARTER, UPDATES, QUARTERLY_BODY, PROCESS_AREAS, SOPS,
  fmtDate, statusKey,
} = window;

/* ============================================================
   UPDATES
   ============================================================ */
function ArticleReader({ u, onBack }) {
  const isQ = u.type === 'Quarterly';
  const body = QUARTERLY_BODY[u.id];
  return (
    <div data-screen-label="Update: reading view" className="fade-up" style={{ maxWidth: 760, margin: '0 auto' }}>
      <button onClick={onBack} className="focusable" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--body)', fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 500, marginBottom: 22, padding: 0 }}>
        <Icon name="arrowLeft" size={16} /> Back to Updates
      </button>

      {isQ && (
        <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: 28, border: '1px solid var(--hairline)' }}>
          <div className="img-placeholder" style={{ height: 150, position: 'relative' }}>
            <span style={{ position: 'absolute', bottom: 16, left: 20, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--body)' }}>{QUARTER.label}</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 10px', borderRadius: 999, background: isQ ? 'var(--accent-soft)' : 'var(--canvas-soft-2)', color: isQ ? 'var(--accent)' : 'var(--body)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600 }}>
          <Icon name={isQ ? 'updates' : 'sparkles'} size={12} />{u.type}
        </span>
        {u.discipline && <DisciplineTag id={u.discipline} />}
        <span className="ds-caption" style={{ color: 'var(--mute)', fontFamily: 'var(--font-mono)' }}>{fmtDate(u.date)}</span>
      </div>

      <h1 className="title-xl" style={{ fontSize: 36, lineHeight: 1.08, marginBottom: 16 }}>{u.title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 22, marginBottom: 26, borderBottom: '1px solid var(--hairline)' }}>
        <Avatar name={u.author} size={32} />
        <div><div className="ds-body-sm-strong">{u.author}</div>{isQ && u.read && <div className="ds-caption" style={{ color: 'var(--mute)' }}>{u.read} read</div>}</div>
      </div>

      <p className="ds-body-lg" style={{ color: 'var(--ink)', marginBottom: 30, textWrap: 'pretty' }}>{body ? body.intro : u.excerpt}</p>

      {body ? body.sections.map((sec, i) => (
        <section key={i} style={{ marginBottom: 30 }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>{sec.kind}</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sec.items.map((it, j) => (
              <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ marginTop: 7, width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', flexShrink: 0 }} />
                <span className="ds-body-md" style={{ color: 'var(--body)', textWrap: 'pretty' }}>{it}</span>
              </li>
            ))}
          </ul>
        </section>
      )) : (
        <div style={{ padding: 20, borderRadius: 'var(--radius-lg)', background: 'var(--canvas-soft)', border: '1px solid var(--hairline)' }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Announcement</div>
          <p className="ds-body-md" style={{ color: 'var(--body)' }}>Posted to the department by {u.author}. See the relevant discipline lead for detail or follow-up.</p>
        </div>
      )}
    </div>
  );
}

function Updates({ focus }) {
  const [type, setType] = useS2('all');
  const [disc, setDisc] = useS2('all');
  const [reader, setReader] = useS2(null);
  useE2(() => { if (focus && focus.id) { const u = UPDATES.find(x => x.id === focus.id); if (u) setReader(u); } }, [focus]);
  if (reader) return <ArticleReader u={reader} onBack={() => setReader(null)} />;

  const list = UPDATES
    .filter(u => type === 'all' || u.type === type)
    .filter(u => disc === 'all' || u.discipline === disc)
    .slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div data-screen-label="Updates" className="fade-up">
      <PageHeader eyebrow="News & quarterly" title="Updates"
        subtitle="Department news, milestones and the quarterly newsletter editions: newest first." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['all', 'All'], ['Quarterly', 'Quarterly'], ['Announcement', 'Announcements']].map(([v, l]) => (
            <FilterChip key={v} active={type === v} onClick={() => setType(v)}>{l}</FilterChip>
          ))}
        </div>
        <DisciplineFilter value={disc} onChange={setDisc} />
      </div>
      {list.length === 0 ? <EmptyState title="No updates match these filters" body="Try clearing the discipline or type filter." />
        : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
            {list.map(u => <window.UpdateCard key={u.id} u={u} onOpen={setReader} />)}
          </div>}
    </div>
  );
}

/* ============================================================
   KNOWLEDGE BASE
   ============================================================ */
function RailItem({ active, onClick, icon, dot, children, count }) {
  const [h, setH] = useS2(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} className="focusable"
      style={{ display: 'flex', alignItems: 'center', gap: 9, width: '100%', height: 34, padding: '0 10px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', textAlign: 'left',
        background: active ? 'var(--accent-soft)' : (h ? 'var(--canvas-soft-2)' : 'transparent'), color: active ? 'var(--accent)' : 'var(--body)',
        fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: active ? 600 : 500 }}>
      {icon && <Icon name={icon} size={16} />}
      {dot && <span style={{ width: 8, height: 8, borderRadius: 999, background: dot, flexShrink: 0 }} />}
      <span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{children}</span>
      {count != null && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--mute)' }}>{count}</span>}
    </button>
  );
}

function DocRow({ doc, onOpen }) {
  const [h, setH] = useS2(false);
  const area = PROCESS_AREAS.find(a => a.id === doc.area);
  return (
    <div onClick={() => onOpen(doc)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '15px 18px', cursor: 'pointer', background: h ? 'var(--canvas-soft)' : 'var(--canvas)', transition: 'background .14s' }}>
      <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--canvas-soft-2)', color: 'var(--body)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={area ? area.icon : 'fileText'} size={18} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3, flexWrap: 'wrap' }}>
          <span className="ds-body-md-strong" style={{ fontSize: 15 }}>{doc.title}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--mute)', padding: '1px 6px', borderRadius: 4, background: 'var(--canvas-soft-2)' }}>{doc.version}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--mute)', flexWrap: 'wrap' }}>
          <span className="ds-caption" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Avatar name={doc.owner} size={16} /> {doc.owner}</span>
          <span className="ds-caption">·</span>
          <span className="ds-caption">Updated {fmtDate(doc.updated)}</span>
          <span className="ds-caption">·</span>
          <span style={{ display: 'inline-flex', gap: 5 }}>{doc.disciplines.slice(0, 2).map(d => <DisciplineDot key={d} id={d} />)}</span>
        </div>
      </div>
      <StatusBadge status={doc.status} size="sm" />
      <span className="kb-row-ftype"><FileTypeChip type={doc.type} /></span>
      <div className="kb-row-actions" style={{ display: 'flex', gap: 6, opacity: h ? 1 : 0.0, transition: 'opacity .14s' }} onClick={e => e.stopPropagation()}>
        <Button variant="secondary" size="sm" icon="eye" onClick={() => onOpen(doc)}>View</Button>
        <Button variant="subtle" size="sm" icon="download" title="Download" />
      </div>
    </div>
  );
}

function DocDetail({ doc, onBack }) {
  const area = PROCESS_AREAS.find(a => a.id === doc.area);
  return (
    <div data-screen-label="Document detail" className="fade-up mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 28, alignItems: 'start' }}>
      <div style={{ minWidth: 0 }}>
        <button onClick={onBack} className="focusable" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--body)', fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 500, marginBottom: 20, padding: 0 }}>
          <Icon name="arrowLeft" size={16} /> Back to Knowledge Base
        </button>
        <Eyebrow style={{ marginBottom: 10 }}>{area ? area.label : 'SOP'}</Eyebrow>
        <h1 className="title-lg" style={{ fontSize: 28, marginBottom: 12 }}>{doc.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 22, flexWrap: 'wrap' }}>
          <StatusBadge status={doc.status} />
          <FileTypeChip type={doc.type} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--mute)', padding: '2px 7px', borderRadius: 4, background: 'var(--canvas-soft-2)' }}>{doc.version}</span>
          {doc.disciplines.map(d => <DisciplineTag key={d} id={d} />)}
        </div>
        <p className="ds-body-lg" style={{ color: 'var(--ink)', marginBottom: 24, textWrap: 'pretty' }}>{doc.summary}</p>

        {/* Document preview placeholder */}
        <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)', background: 'var(--canvas-soft)', padding: 28, boxShadow: 'var(--elev-1)' }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Document preview</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <div style={{ height: 13, width: '52%', borderRadius: 4, background: 'var(--accent)', opacity: 0.85 }} />
            {[92, 100, 86, 96, 70].map((w, i) => <div key={i} style={{ height: 9, width: w + '%', borderRadius: 4, background: 'var(--hairline-strong)', opacity: 0.5 }} />)}
            <div style={{ height: 8 }} />
            <div style={{ height: 11, width: '34%', borderRadius: 4, background: 'var(--ink)', opacity: 0.55 }} />
            {[100, 88, 94].map((w, i) => <div key={i} style={{ height: 9, width: w + '%', borderRadius: 4, background: 'var(--hairline-strong)', opacity: 0.5 }} />)}
            <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
              <div style={{ flex: 1, height: 60, borderRadius: 8, background: 'var(--canvas-soft-2)', border: '1px solid var(--hairline)' }} />
              <div style={{ flex: 1, height: 60, borderRadius: 8, background: 'var(--canvas-soft-2)', border: '1px solid var(--hairline)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Meta side panel */}
      <aside style={{ position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Button variant="primary" size="lg" icon="download" style={{ width: '100%' }}>Download {doc.type}</Button>
        <Button variant="secondary" size="md" icon="eye" style={{ width: '100%' }}>Open in viewer</Button>
        <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)', background: 'var(--canvas)', overflow: 'hidden' }}>
          {[['Owner', doc.owner], ['Status', doc.status], ['Version', doc.version], ['Last updated', fmtDate(doc.updated)], ['Format', doc.type], ['Process area', area ? area.label : '–']].map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 14px', borderTop: i ? '1px solid var(--hairline)' : 'none' }}>
              <span className="ds-caption" style={{ color: 'var(--mute)' }}>{k}</span>
              <span className="ds-body-sm-strong" style={{ textAlign: 'right' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)', background: 'var(--canvas)', padding: 14 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Version history</div>
          {[[doc.version, fmtDate(doc.updated), 'current'], ['v' + (parseFloat(doc.version.slice(1)) - 0.1).toFixed(1), '–', ''], ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0' }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: i === 0 ? 'var(--accent)' : 'var(--hairline-strong)' }} />
              <span className="ds-body-sm" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r[0]}</span>
              <span style={{ flex: 1 }} />
              {r[2] && <span className="ds-caption" style={{ color: 'var(--accent)' }}>{r[2]}</span>}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function KnowledgeBase({ focus }) {
  const [disc, setDisc] = useS2('all');
  const [area, setArea] = useS2('all');
  const [q, setQ] = useS2('');
  const [open, setOpen] = useS2(null);
  useE2(() => { if (focus && focus.id) { const d = SOPS.find(x => x.id === focus.id); if (d) setOpen(d); } }, [focus]);

  if (open) return <DocDetail doc={open} onBack={() => setOpen(null)} />;

  const list = SOPS
    .filter(d => disc === 'all' || d.disciplines.includes(disc))
    .filter(d => area === 'all' || d.area === area)
    .filter(d => !q.trim() || (d.title + ' ' + d.summary + ' ' + d.owner).toLowerCase().includes(q.toLowerCase()));

  return (
    <div data-screen-label="Knowledge Base" className="fade-up">
      <PageHeader eyebrow="SOPs & guidelines" title="Knowledge Base"
        subtitle="Approved standard operating procedures and guidelines, grouped by process area and mapped to disciplines."
        actions={<Button variant="secondary" icon="plus">Propose SOP</Button>} />

      <div style={{ display: 'grid', gridTemplateColumns: '232px minmax(0,1fr)', gap: 28, alignItems: 'start' }} className="kb-cols">
        {/* Filter rail */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 22, position: 'sticky', top: 0 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--mute)' }}><Icon name="search" size={15} /></span>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter documents…" className="focusable"
              style={{ width: '100%', height: 36, padding: '0 12px 0 34px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: 'var(--canvas)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontSize: 13.5, outline: 'none' }} />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8, padding: '0 4px' }}>Discipline</div>
            <RailItem active={disc === 'all'} onClick={() => setDisc('all')}>All disciplines</RailItem>
            {DISCIPLINE_LIST.map(d => <RailItem key={d.id} active={disc === d.id} dot={d.color} onClick={() => setDisc(d.id)}>{d.short}</RailItem>)}
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8, padding: '0 4px' }}>Process area</div>
            <RailItem active={area === 'all'} onClick={() => setArea('all')} icon="folder">All areas</RailItem>
            {PROCESS_AREAS.map(a => <RailItem key={a.id} active={area === a.id} icon={a.icon} onClick={() => setArea(a.id)} count={SOPS.filter(s => s.area === a.id).length}>{a.label}</RailItem>)}
          </div>
        </aside>

        {/* Document list */}
        <div style={{ minWidth: 0 }}>
          <div className="ds-caption" style={{ color: 'var(--mute)', marginBottom: 10 }}>{list.length} document{list.length !== 1 ? 's' : ''}</div>
          {list.length === 0 ? <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)' }}><EmptyState title="No documents match" body="Adjust the filters in the left rail." /></div>
            : <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)', overflow: 'hidden', boxShadow: 'var(--elev-2)', background: 'var(--canvas)' }}>
                {list.map((d, i) => <div key={d.id} style={{ borderTop: i ? '1px solid var(--hairline)' : 'none' }}><DocRow doc={d} onOpen={setOpen} /></div>)}
              </div>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Updates, ArticleReader, KnowledgeBase, DocDetail });
