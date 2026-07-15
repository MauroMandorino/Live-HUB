/* global React, window */
/* ============================================================
   PSG Performance Hub: Tech Scouting, Research, People, Components
   ============================================================ */
const { useState: useS4, useRef: useR4 } = React;
const {
  Icon, Button, StatusBadge, DisciplineDot, DisciplineTag, Chip, FileTypeChip, Avatar,
  Eyebrow, PageHeader, EmptyState, FilterChip, DisciplineFilter, Segmented,
  DISCIPLINES, DISCIPLINE_LIST, TECH, RESEARCH, PEOPLE, LEARNING, LEARNING_TYPES, statusKey, fmtDate,
} = window;

/* ============================================================
   TECH SCOUTING: Kanban by status
   ============================================================ */
const TECH_STATUSES = ['Evaluation', 'Pending Verification', 'Ongoing Trial', 'Trial Completed'];

function TechCard({ t }) {
  const [h, setH] = useS4(false);
  const d = DISCIPLINES[t.discipline];
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: 14, boxShadow: h ? 'var(--elev-3)' : 'var(--elev-1)', transform: h ? 'translateY(-2px)' : 'none', transition: 'box-shadow .14s, transform .14s', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div className="ds-body-sm-strong" style={{ fontSize: 14.5 }}>{t.name}</div>
          <div className="ds-caption" style={{ color: 'var(--mute)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}><Icon name="mapPin" size={12} />{t.vendor}</div>
        </div>
      </div>
      <p className="ds-caption" style={{ color: 'var(--body)', lineHeight: 1.45 }}>{t.note}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{t.tags.map(tag => <Chip key={tag} mono>{tag}</Chip>)}</div>
      {t.grant && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start', height: 24, padding: '0 10px', borderRadius: 'var(--radius-full)', background: 'var(--st-amber-bg)', color: 'var(--st-amber-fg)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600 }}>
          <Icon name="euro" size={13} />{t.grant}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, borderTop: '1px solid var(--hairline)', paddingTop: 10, marginTop: 2 }}>
        <DisciplineDot id={t.discipline} /><span className="ds-caption" style={{ color: 'var(--mute)' }}>{d ? d.short : ''}</span>
      </div>
    </div>
  );
}

function TechScouting() {
  const [disc, setDisc] = useS4('all');
  const [view, setView] = useS4('board');
  const list = TECH.filter(t => disc === 'all' || t.discipline === disc);

  return (
    <div data-screen-label="Technology" className="fade-up">
      <PageHeader eyebrow="Technologies under evaluation" title="Technology"
        subtitle="External technologies and vendors moving through assessment: from first look to completed trial."
        actions={<Segmented value={view} onChange={setView} options={[{ value: 'board', label: 'Board', icon: 'grid' }, { value: 'list', label: 'List', icon: 'list' }]} />} />
      <div style={{ marginBottom: 22 }}><DisciplineFilter value={disc} onChange={setDisc} /></div>

      {view === 'board' ? (
        <div className="scroll" style={{ display: 'grid', gridTemplateColumns: `repeat(${TECH_STATUSES.length}, minmax(248px, 1fr))`, gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
          {TECH_STATUSES.map(s => {
            const items = list.filter(t => t.status === s);
            return (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 2px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: `var(--st-${statusKey(s)}-dot)` }} />
                  <span className="ds-body-sm-strong" style={{ fontSize: 13.5, flex: 1 }}>{s}</span>
                  <span className="ds-caption" style={{ fontFamily: 'var(--font-mono)', color: 'var(--mute)' }}>{items.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 12, minHeight: 120 }}>
                  {items.length ? items.map(t => <TechCard key={t.id} t={t} />) : <div className="ds-caption" style={{ color: 'var(--mute)', textAlign: 'center', padding: '20px 0' }}>Nothing here</div>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--hairline)', overflow: 'hidden', boxShadow: 'var(--elev-2)' }}>
          {list.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', borderTop: i ? '1px solid var(--hairline)' : 'none', background: 'var(--canvas)' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 2, flexWrap: 'wrap' }}><span className="ds-body-md-strong" style={{ fontSize: 15 }}>{t.name}</span>{t.grant && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--st-amber-fg)', fontFamily: 'var(--font-sans)', fontSize: 11.5, fontWeight: 600 }}><Icon name="euro" size={12} />Grant</span>}</div>
                <div className="ds-caption" style={{ color: 'var(--mute)' }}>{t.vendor}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>{t.tags.slice(0, 2).map(tag => <Chip key={tag} mono>{tag}</Chip>)}</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><DisciplineDot id={t.discipline} /><span className="ds-caption" style={{ color: 'var(--body)', width: 76 }}>{DISCIPLINES[t.discipline].short}</span></span>
              <StatusBadge status={t.status} size="sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   RESEARCH & INNOVATION
   ============================================================ */
const RESEARCH_TYPES = ['Pilot Study', 'PhD', 'Journal Submission'];
const TYPE_ICON = { 'Pilot Study': 'flask', 'PhD': 'cap', 'Journal Submission': 'bookMarked' };

function ResearchCard({ r }) {
  const [h, setH] = useS4(false);
  return (
    <article onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 20, boxShadow: h ? 'var(--elev-3)' : 'var(--elev-2)', transform: h ? 'translateY(-2px)' : 'none', transition: 'box-shadow .15s, transform .15s', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 26, padding: '0 11px', borderRadius: 'var(--radius-full)', background: 'var(--canvas-soft-2)', color: 'var(--body)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 600 }}>
          <Icon name={TYPE_ICON[r.type]} size={14} />{r.type}
        </span>
        <StatusBadge status={r.status} size="sm" />
      </div>
      <h3 className="ds-body-md-strong" style={{ fontSize: 16, lineHeight: 1.34, letterSpacing: '-0.1px', textWrap: 'pretty' }}>{r.title}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <DisciplineTag id={r.discipline} />
        <span style={{ flex: 1 }} />
        <div style={{ display: 'flex' }}>{r.authors.map((a, i) => <span key={a} style={{ marginLeft: i ? -8 : 0, border: '2px solid var(--canvas)', borderRadius: 999 }}><Avatar name={a} size={26} /></span>)}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
        {r.outputs.length ? r.outputs.map(o => (
          <span key={o} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--accent)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500 }}><Icon name="fileText" size={13} />{o}</span>
        )) : <span className="ds-caption" style={{ color: 'var(--mute)' }}>No outputs yet</span>}
      </div>
    </article>
  );
}

function Research() {
  const [type, setType] = useS4('all');
  const [disc, setDisc] = useS4('all');
  const list = RESEARCH.filter(r => type === 'all' || r.type === type).filter(r => disc === 'all' || r.discipline === disc);
  return (
    <div data-screen-label="Research Hub" className="fade-up">
      <PageHeader eyebrow="Studies, PhDs & publications" title="Research Hub"
        subtitle="Active and completed work across the department: pilot studies, doctoral projects and journal submissions." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <FilterChip active={type === 'all'} onClick={() => setType('all')}>All types</FilterChip>
          {RESEARCH_TYPES.map(t => <FilterChip key={t} active={type === t} onClick={() => setType(t)}>{t}</FilterChip>)}
        </div>
        <DisciplineFilter value={disc} onChange={setDisc} />
      </div>
      {list.length === 0 ? <EmptyState icon="flask" title="No research matches" body="Try a different type or discipline." />
        : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 16 }}>{list.map(r => <ResearchCard key={r.id} r={r} />)}</div>}
    </div>
  );
}

/* ============================================================
   LEARNING: video & resource library with upload
   ============================================================ */
const LEARN_TYPE_ICON = { 'Presentation': 'presentation', 'Webinar': 'headphones', 'Workshop': 'flask', 'Document': 'fileText' };

function LearningCard({ item, onOpen }) {
  const [h, setH] = useS4(false);
  const isDoc = item.kind === 'doc';
  return (
    <article onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => onOpen(item)}
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: h ? 'var(--elev-4)' : 'var(--elev-2)', transform: h ? 'translateY(-3px)' : 'none', transition: 'box-shadow .16s, transform .16s' }}>
      {/* Thumbnail */}
      <div className="img-placeholder" style={{ position: 'relative', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ width: 52, height: 52, borderRadius: 999, background: 'var(--canvas)', border: '1px solid var(--hairline)', boxShadow: 'var(--elev-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', transform: h ? 'scale(1.08)' : 'none', transition: 'transform .16s' }}>
          <Icon name={isDoc ? 'fileText' : 'play'} size={22} style={{ marginLeft: isDoc ? 0 : 2 }} />
        </span>
        <span style={{ position: 'absolute', bottom: 10, right: 10, height: 22, padding: '0 8px', display: 'inline-flex', alignItems: 'center', gap: 5, borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.72)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500 }}>
          <Icon name={isDoc ? 'fileText' : 'clock'} size={11} />{item.duration}
        </span>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 22, padding: '0 9px', borderRadius: 'var(--radius-full)', background: 'var(--canvas-soft-2)', color: 'var(--body)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600 }}>
            <Icon name={LEARN_TYPE_ICON[item.type]} size={12} />{item.type}
          </span>
          <DisciplineTag id={item.discipline} />
        </div>
        <h3 className="ds-body-md-strong" style={{ fontSize: 15.5, lineHeight: 1.34, letterSpacing: '-0.1px', textWrap: 'pretty' }}>{item.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
          <Avatar name={item.presenter} size={20} />
          <span className="ds-caption" style={{ color: 'var(--mute)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.presenter} / {fmtDate(item.date)}</span>
          <span className="ds-caption" style={{ color: 'var(--mute)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="eye" size={12} />{item.views}</span>
        </div>
      </div>
    </article>
  );
}

function LearningPlayer({ item, onClose }) {
  const isDoc = item.kind === 'doc';
  return (
    <div className="fade-in" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(8,16,30,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 760, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', background: 'var(--canvas)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--elev-5)', border: '1px solid var(--hairline)' }} className="scroll">
        <div className="img-placeholder" style={{ position: 'relative', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }}>
          <span style={{ width: 66, height: 66, borderRadius: 999, background: 'var(--canvas)', border: '1px solid var(--hairline)', boxShadow: 'var(--elev-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
            <Icon name={isDoc ? 'fileText' : 'play'} size={28} style={{ marginLeft: isDoc ? 0 : 3 }} />
          </span>
          <button onClick={onClose} className="focusable" style={{ position: 'absolute', top: 16, right: 16, width: 34, height: 34, borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: 'var(--canvas)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--body)' }}><Icon name="x" size={18} /></button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 10px', borderRadius: 'var(--radius-full)', background: 'var(--canvas-soft-2)', color: 'var(--body)', fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 600 }}><Icon name={LEARN_TYPE_ICON[item.type]} size={13} />{item.type}</span>
            <DisciplineTag id={item.discipline} />
            <span className="ds-caption" style={{ color: 'var(--mute)' }}>{item.duration}</span>
          </div>
          <h2 className="title-lg" style={{ fontSize: 24, marginBottom: 10 }}>{item.title}</h2>
          <p className="ds-body-md" style={{ color: 'var(--body)', marginBottom: 20, textWrap: 'pretty' }}>{item.desc}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: '1px solid var(--hairline)' }}>
            <Avatar name={item.presenter} size={32} />
            <div style={{ flex: 1 }}><div className="ds-body-sm-strong">{item.presenter}</div><div className="ds-caption" style={{ color: 'var(--mute)' }}>{fmtDate(item.date)} / {item.views} views</div></div>
            <Button variant="primary" icon={isDoc ? 'download' : 'play'}>{isDoc ? 'Open document' : 'Play recording'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadModal({ onClose }) {
  const [drag, setDrag] = useS4(false);
  const [file, setFile] = useS4(null);
  const inputRef = useR4(null);
  return (
    <div className="fade-in" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(8,16,30,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 520, maxWidth: '100%', background: 'var(--canvas)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--elev-5)', border: '1px solid var(--hairline)', padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
          <h2 className="title-lg" style={{ fontSize: 22 }}>Upload to Learning</h2>
          <button onClick={onClose} className="focusable" style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: 'var(--canvas)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--body)' }}><Icon name="x" size={17} /></button>
        </div>
        <p className="ds-body-sm" style={{ color: 'var(--mute)', marginBottom: 18 }}>Share a presentation recording, webinar, workshop or resource with the department.</p>

        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0].name); }}
          onClick={() => inputRef.current && inputRef.current.click()}
          style={{ cursor: 'pointer', borderRadius: 'var(--radius-lg)', border: `1.5px dashed ${drag ? 'var(--accent)' : 'var(--hairline-strong)'}`, background: drag ? 'var(--accent-soft)' : 'var(--canvas-soft)', padding: '36px 24px', textAlign: 'center', transition: 'background .14s, border-color .14s' }}>
          <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setFile(e.target.files[0].name); }} />
          <div style={{ width: 48, height: 48, margin: '0 auto 14px', borderRadius: 'var(--radius-md)', background: 'var(--canvas)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}><Icon name="uploadCloud" size={24} /></div>
          {file
            ? <div className="ds-body-md-strong" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--accent)' }}><Icon name="checkCircle" size={16} />{file}</div>
            : <><div className="ds-body-md-strong" style={{ marginBottom: 4 }}>Drag a file here, or click to browse</div>
               <div className="ds-caption" style={{ color: 'var(--mute)' }}>MP4, MOV, PDF or PPTX / up to 2 GB</div></>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
          <label style={{ display: 'block' }}><span className="ds-caption" style={{ color: 'var(--mute)', display: 'block', marginBottom: 6 }}>Type</span>
            <select style={uploadSelect}>{LEARNING_TYPES.map(t => <option key={t}>{t}</option>)}</select></label>
          <label style={{ display: 'block' }}><span className="ds-caption" style={{ color: 'var(--mute)', display: 'block', marginBottom: 6 }}>Discipline</span>
            <select style={uploadSelect}>{DISCIPLINE_LIST.map(d => <option key={d.id}>{d.short}</option>)}</select></label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22 }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" icon="upload" onClick={onClose}>Upload</Button>
        </div>
      </div>
    </div>
  );
}
const uploadSelect = { width: '100%', height: 38, padding: '0 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', background: 'var(--canvas)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontSize: 13.5, outline: 'none' };

function Learning() {
  const [type, setType] = useS4('all');
  const [disc, setDisc] = useS4('all');
  const [open, setOpen] = useS4(null);
  const [uploading, setUploading] = useS4(false);
  const list = LEARNING.filter(l => type === 'all' || l.type === type).filter(l => disc === 'all' || l.discipline === disc);
  return (
    <div data-screen-label="Learning" className="fade-up">
      {open && <LearningPlayer item={open} onClose={() => setOpen(null)} />}
      {uploading && <UploadModal onClose={() => setUploading(false)} />}
      <PageHeader eyebrow="Watch, learn & share" title="Learning"
        subtitle="Recorded presentations, webinars and workshops: plus resources the department has shared. Upload your own to add to the library."
        actions={<Button variant="primary" icon="upload" onClick={() => setUploading(true)}>Upload</Button>} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <FilterChip active={type === 'all'} onClick={() => setType('all')}>All formats</FilterChip>
          {LEARNING_TYPES.map(t => <FilterChip key={t} active={type === t} onClick={() => setType(t)}>{t}</FilterChip>)}
        </div>
        <DisciplineFilter value={disc} onChange={setDisc} />
      </div>
      {list.length === 0 ? <EmptyState icon="playCircle" title="Nothing here yet" body="Try a different format or discipline: or upload the first one." />
        : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 18 }}>
            {list.map(l => <LearningCard key={l.id} item={l} onOpen={setOpen} />)}
          </div>}
    </div>
  );
}

/* ============================================================
   PEOPLE / DIRECTORY
   ============================================================ */
function PersonCard({ p }) {
  const [h, setH] = useS4(false);
  const d = DISCIPLINES[p.discipline];
  return (
    <article onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 20, boxShadow: h ? 'var(--elev-3)' : 'var(--elev-2)', transition: 'box-shadow .15s', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <Avatar name={p.name} size={48} color={d ? d.color : undefined} />
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span className="ds-body-md-strong" style={{ fontSize: 15.5 }}>{p.name}</span>
            {p.lead && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-soft)', padding: '2px 6px', borderRadius: 4 }}>Lead</span>}
          </div>
          <div className="ds-caption" style={{ color: 'var(--mute)', marginTop: 2 }}>{p.role}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
        <DisciplineTag id={p.discipline} />
        <span style={{ flex: 1 }} />
        <a href={`mailto:${p.email}`} className="focusable" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)', textDecoration: 'none', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500 }}><Icon name="mail" size={14} />Contact</a>
      </div>
    </article>
  );
}

function People() {
  const [disc, setDisc] = useS4('all');
  const list = PEOPLE.filter(p => disc === 'all' || p.discipline === disc);
  return (
    <div data-screen-label="People" className="fade-up">
      <PageHeader eyebrow="Directory" title="People"
        subtitle="Discipline leads and key contacts across the Performance Department." />
      <div style={{ marginBottom: 22 }}><DisciplineFilter value={disc} onChange={setDisc} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 16 }}>
        {list.map(p => <PersonCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENTS / STYLE SHEET
   ============================================================ */
function Swatch({ token, name, hex }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ height: 56, borderRadius: 'var(--radius-md)', background: token, border: '1px solid var(--hairline)' }} />
      <div><div className="ds-body-sm-strong" style={{ fontSize: 12.5 }}>{name}</div><div className="ds-caption" style={{ color: 'var(--mute)', fontFamily: 'var(--font-mono)', fontSize: 10.5 }}>{hex}</div></div>
    </div>
  );
}
function SpecCard({ title, children }) {
  return (
    <section style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 22, boxShadow: 'var(--elev-2)' }}>
      <div className="eyebrow" style={{ marginBottom: 18 }}>{title}</div>
      {children}
    </section>
  );
}

function ComponentSheet() {
  return (
    <div data-screen-label="Components" className="fade-up">
      <PageHeader eyebrow="Design system" title="Components & tokens"
        subtitle="The shared building blocks: status states, cards, chips, buttons and the colour & type tokens every screen is built from." />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Status states */}
        <SpecCard title="Status badge: meaning-locked states">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            {['Approved', 'Pending Validation', 'In progress', 'Draft', 'Operational', 'Ongoing Trial', 'Trial Completed', 'Done', 'Not started', 'New Hire'].map(s => <StatusBadge key={s} status={s} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: 10 }}>
            {[['Green', 'Approved / Delivered / Done / Operational', 'green'], ['Amber', 'Pending / Verification', 'amber'], ['Blue', 'In progress / Ongoing / Evaluation', 'blue'], ['Grey', 'Draft / Not started / New hire', 'grey']].map(([n, d, k]) => (
              <div key={n} style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--canvas-soft)', border: '1px solid var(--hairline)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}><span style={{ width: 9, height: 9, borderRadius: 999, background: `var(--st-${k}-dot)` }} /><span className="ds-body-sm-strong" style={{ fontSize: 12.5 }}>{n}</span></div>
                <div className="ds-caption" style={{ color: 'var(--mute)' }}>{d}</div>
              </div>
            ))}
          </div>
        </SpecCard>

        {/* Buttons */}
        <SpecCard title="Buttons & controls">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <Button variant="primary" icon="download">Primary</Button>
            <Button variant="secondary" icon="eye">Secondary</Button>
            <Button variant="subtle" icon="plus">Subtle</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg" iconRight="arrowRight">Large</Button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <FilterChip active>Active filter</FilterChip>
            <FilterChip>Inactive filter</FilterChip>
            <Segmented value="grid" onChange={() => {}} options={[{ value: 'grid', icon: 'grid', label: 'Grid' }, { value: 'list', icon: 'list', label: 'List' }]} />
          </div>
        </SpecCard>

        {/* Chips */}
        <SpecCard title="Chips, tags & file types">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 14 }}>
            {DISCIPLINE_LIST.map(d => <DisciplineTag key={d.id} id={d.id} short={false} />)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            {['PPTX', 'PDF', 'MD', 'TWBX', 'FIG', 'ZIP'].map(f => <FileTypeChip key={f} type={f} />)}
            <Chip mono>keyword</Chip><Chip>v1.2</Chip>
          </div>
        </SpecCard>

        {/* Colour + type */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 20 }}>
          <SpecCard title="Accent & brand">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              <Swatch token="var(--accent)" name="Accent" hex="#141428" />
              <Swatch token="var(--psg-navy)" name="PSG Blue" hex="#004070" />
              <Swatch token="var(--psg-red)" name="PSG Red" hex="#E30613" />
              <Swatch token="var(--psg-gold)" name="PSG Gold" hex="#CEAB5D" />
            </div>
            <div className="img-placeholder" style={{ height: 56, borderRadius: 'var(--radius-md)', marginTop: 14, border: '1px solid var(--hairline)' }} />
            <div className="ds-caption" style={{ color: 'var(--mute)', marginTop: 7 }}>Imagery placeholder: hero visuals TBC.</div>
          </SpecCard>
          <SpecCard title="Type scale">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><div className="title-lg" style={{ fontSize: 28 }}>Virage display</div><div className="ds-caption" style={{ color: 'var(--mute)' }}>Page titles / figures</div></div>
              <div><div className="ds-body-lg" style={{ color: 'var(--ink)' }}>Geist body: the workhorse for UI and prose.</div></div>
              <div><div className="eyebrow">Geist Mono eyebrow</div><div className="ds-caption" style={{ color: 'var(--mute)' }}>Labels / versions / dates</div></div>
            </div>
          </SpecCard>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TechScouting, Research, Learning, People, ComponentSheet });
