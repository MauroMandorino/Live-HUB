/* global React, window, Icon */
/* ============================================================
   PSG Performance Workspace: Research Hub — PhD activities,
   Quiz Challenge, Event editor, and the research admin desk.
   ============================================================ */
const { useState: useX, useEffect: useXE, useMemo: useXM, useRef: useXR } = React;

/* ---- PhD activities ---------------------------------------- */
const UNIS = [
  { id: 'parma', name: 'Parma', city: 'Parma', student: 'Salvatore Mazzei', pin: '80385', init: 'PA' },
  { id: 'foro', name: 'Foro Italico', city: 'Rome', student: 'Valerio Persichetti', pin: '54741', init: 'FI' },
  { id: 'valencia', name: 'Valencia', city: 'Valencia', student: 'Costanza Gavioli', pin: '76105', init: 'VA' },
  { id: 'verona', name: 'Verona', city: 'Verona', student: 'Lorenzo Di Girolamo', pin: '25636', init: 'VR' },
  { id: 'chieti', name: 'Chieti/Pescara', city: 'Chieti', student: 'Giorgia Silvestri', pin: '20567', init: 'CH' }];

function newStudy(title) {
  return {
    id: 's' + Date.now() + Math.floor(Math.random() * 1000), title, open: true, objectives: '',
    dataset: { name: '', link: '' },
    dataCollection: { status: 'to_start', startDate: '', notes: '' },
    dataAnalysis: { status: 'to_start', startDate: '', notes: '' },
    paperWriting: { intro: false, methods: false, results: false, discussion: false, status: 'not_started' },
    submission: { status: 'not_submitted', journal: '', revisionNotes: '' },
    presentations: []
  };
}
const PHASE_STATUSES = [['to_start', 'To start'], ['ongoing', 'Ongoing'], ['done', 'Done'], ['blocked', 'Blocked']];
const SUB_STATUSES = [['not_submitted', 'Not submitted'], ['submitted', 'Submitted'], ['under_review', 'Under review'], ['published', 'Published']];
const PHD_ST_COLORS = { to_start: 'grey', ongoing: 'blue', done: 'green', blocked: 'red', not_submitted: 'grey', submitted: 'blue', under_review: 'gold', published: 'green' };

function PhdBadge({ status }) {
  const all = [...PHASE_STATUSES, ...SUB_STATUSES];
  const found = all.find(([k]) => k === status);
  return <span className={'ds-status ds-status-' + (PHD_ST_COLORS[status] || 'grey')}>{found ? found[1] : status}</span>;
}

function PhaseBlock({ label, phase, onChange }) {
  return (
    <div style={{ padding: '10px 0', borderTop: '1px solid var(--hairline)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span className="ds-body-sm-strong" style={{ minWidth: 130 }}>{label}</span>
        <select style={{ ...window.fieldStyle, width: 'auto', height: 30, fontSize: 12.5 }} value={phase.status} onChange={(e) => onChange({ ...phase, status: e.target.value })}>
          {PHASE_STATUSES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <input type="date" style={{ ...window.fieldStyle, width: 'auto', height: 30, fontSize: 12.5 }} value={phase.startDate || ''} onChange={(e) => onChange({ ...phase, startDate: e.target.value })} />
        <input style={{ ...window.fieldStyle, flex: 1, minWidth: 140, height: 30, fontSize: 12.5 }} placeholder="Notes..." value={phase.notes || ''} onChange={(e) => onChange({ ...phase, notes: e.target.value })} />
      </div>
    </div>);
}

function StudyCard({ study, onChange, onDelete }) {
  const [confirm, setConfirm] = useX(false);
  const set = (patch) => onChange({ ...study, ...patch });
  const pw = study.paperWriting || {};
  return (
    <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', marginBottom: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', cursor: 'pointer' }} onClick={() => set({ open: !study.open })}>
        <Icon name={study.open ? 'chevronDown' : 'chevronRight'} size={16} style={{ color: 'var(--mute)', flexShrink: 0 }} />
        <input value={study.title} onClick={(e) => e.stopPropagation()} onChange={(e) => set({ title: e.target.value })}
          style={{ flex: 1, border: 'none', background: 'transparent', color: 'var(--ink)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, outline: 'none' }} />
        <PhdBadge status={(study.dataAnalysis || {}).status || 'to_start'} />
        {confirm ?
          <window.Button size="sm" variant="secondary" icon="trash" style={{ color: 'var(--st-red-fg)' }} onClick={(e) => { e.stopPropagation(); onDelete(); }}>Confirm?</window.Button> :
          <window.Button size="sm" variant="ghost" icon="trash" onClick={(e) => { e.stopPropagation(); setConfirm(true); }} />}
      </div>
      {study.open &&
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 }}>
            <window.Field label="Objectives" span><textarea style={{ ...window.areaStyle, minHeight: 52 }} value={study.objectives || ''} onChange={(e) => set({ objectives: e.target.value })} /></window.Field>
            <window.Field label="Dataset name"><input style={window.fieldStyle} value={(study.dataset || {}).name || ''} onChange={(e) => set({ dataset: { ...study.dataset, name: e.target.value } })} /></window.Field>
            <window.Field label="Dataset link"><input style={window.fieldStyle} placeholder="https://..." value={(study.dataset || {}).link || ''} onChange={(e) => set({ dataset: { ...study.dataset, link: e.target.value } })} /></window.Field>
          </div>
          <PhaseBlock label="Data collection" phase={study.dataCollection || {}} onChange={(p) => set({ dataCollection: p })} />
          <PhaseBlock label="Data analysis" phase={study.dataAnalysis || {}} onChange={(p) => set({ dataAnalysis: p })} />
          <div style={{ padding: '10px 0', borderTop: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span className="ds-body-sm-strong" style={{ minWidth: 130 }}>Paper writing</span>
            {['intro', 'methods', 'results', 'discussion'].map((k) => (
              <label key={k} className="ds-body-sm" style={{ display: 'inline-flex', gap: 6, alignItems: 'center', cursor: 'pointer', color: 'var(--body)', textTransform: 'capitalize' }}>
                <input type="checkbox" checked={!!pw[k]} onChange={(e) => set({ paperWriting: { ...pw, [k]: e.target.checked } })} /> {k}
              </label>))}
          </div>
          <div style={{ padding: '10px 0', borderTop: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="ds-body-sm-strong" style={{ minWidth: 130 }}>Submission</span>
            <select style={{ ...window.fieldStyle, width: 'auto', height: 30, fontSize: 12.5 }} value={(study.submission || {}).status || 'not_submitted'} onChange={(e) => set({ submission: { ...study.submission, status: e.target.value } })}>
              {SUB_STATUSES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
            <input style={{ ...window.fieldStyle, flex: 1, minWidth: 140, height: 30, fontSize: 12.5 }} placeholder="Journal..." value={(study.submission || {}).journal || ''} onChange={(e) => set({ submission: { ...study.submission, journal: e.target.value } })} />
          </div>
        </div>}
    </div>);
}

function PhdActivities({ user }) {
  const { t } = window.useLang();
  const isResearchAdmin = !!(user && user.caps && user.caps.researchAdmin);
  const [uni, setUni] = useX(null);
  const [sel, setSel] = useX(null);
  const [pin, setPin] = useX('');
  const [err, setErr] = useX(false);
  const uniDoc = window.useDocument('universities', uni && uni.id);
  const studies = (uniDoc.data && uniDoc.data.studies) || [];
  const saveTimer = useXR(null);
  function persist(next) {
    window.HubDB.set('universities', uni.id, { studies: next }, true);
  }
  function updateStudy(i, s) {
    const next = studies.slice(); next[i] = s;
    // debounce writes while typing
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const snapshot = next;
    saveTimer.current = setTimeout(() => persist(snapshot), 600);
    // optimistic local render comes free via onSnapshot after write; keep simple
  }
  function tryPin() {
    const u = UNIS.find((x) => x.pin === pin.trim() && (!sel || x.id === sel));
    setErr(!u);
    if (u) { setUni(u); setPin(''); }
  }
  if (!uni) {
    return (
      <div style={{ maxWidth: 860 }}>
        <p className="ds-body-sm" style={{ color: 'var(--body)', marginBottom: 16 }}>{t('p_pick')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 10, marginBottom: 20 }}>
          {UNIS.map((u) => (
            <button key={u.id} onClick={() => setSel(u.id)} className="focusable" style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 12, textAlign: 'left', cursor: 'pointer', background: sel === u.id ? 'var(--accent-soft)' : 'var(--canvas)', border: sel === u.id ? '1px solid var(--accent-line)' : '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--elev-1)', transition: 'box-shadow .16s, transform .16s' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--elev-3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--elev-1)'; e.currentTarget.style.transform = 'none'; }}>
              <span style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{u.init}</span>
              <span style={{ minWidth: 0 }}>
                <span className="ds-body-sm-strong" style={{ display: 'block' }}>{u.student}</span>
                <span className="ds-caption" style={{ color: 'var(--mute)' }}>{u.name}</span>
              </span>
            </button>))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="password" maxLength={8} placeholder={t('p_pin')} value={pin} onChange={(e) => setPin(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && tryPin()} style={{ ...window.fieldStyle, width: 160 }} />
          <window.Button icon="arrowRight" onClick={tryPin}>{t('p_access')}</window.Button>
          {isResearchAdmin && sel && <window.Button variant="secondary" icon="shield" onClick={() => setUni(UNIS.find((x) => x.id === sel))}>Open as admin</window.Button>}
        </div>
        {err && <div className="ds-body-sm" style={{ color: 'var(--st-red-fg)', marginTop: 10 }}>{t('p_wrongPin')}</div>}
      </div>);
  }
  return (
    <div style={{ maxWidth: 860 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <window.Button variant="ghost" size="sm" icon="arrowLeft" onClick={() => { setUni(null); setSel(null); }}>{t('p_back')}</window.Button>
        <div>
          <div className="ds-body-md-strong">{uni.student}</div>
          <div className="ds-caption" style={{ color: 'var(--mute)' }}>University of {uni.name} {'\u00b7'} Academic Year 2024/25</div>
        </div>
        <div style={{ flex: 1 }} />
        <window.Button icon="plus" onClick={() => persist([...studies, newStudy('Study ' + (studies.length + 1))])}>{t('p_addStudy')}</window.Button>
      </div>
      {!uniDoc.ready && <window.EmptyState icon="database" title={t('connecting')} />}
      {uniDoc.ready && studies.length === 0 && <window.EmptyState icon="book" title={t('p_noStudies')} />}
      {studies.map((s, i) => (
        <StudyCard key={s.id} study={s} onChange={(next) => updateStudy(i, next)} onDelete={() => persist(studies.filter((x) => x.id !== s.id))} />))}

      <div style={{ marginTop: 24 }}>
        <window.Eyebrow style={{ marginBottom: 10 }}>{t('p_presentations')}</window.Eyebrow>
        {studies.flatMap((s) => (s.presentations || []).map((p, pi) => ({ ...p, sid: s.id, pi, studyTitle: s.title }))).map((p) => (
          <div key={p.sid + p.pi} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 12px', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', marginBottom: 6 }}>
            <Icon name="presentation" size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <span className="ds-body-sm" style={{ flex: 1 }}><strong>{p.title || 'Untitled'}</strong>{p.venue ? ' \u00b7 ' + p.venue : ''}{p.date ? ' \u00b7 ' + p.date : ''}<span style={{ color: 'var(--mute)' }}> ({p.studyTitle})</span></span>
            <button className="focusable" onClick={() => {
              const next = studies.map((s) => s.id === p.sid ? { ...s, presentations: (s.presentations || []).filter((_, i) => i !== p.pi) } : s);
              persist(next);
            }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mute)', padding: 2 }}><Icon name="trash" size={14} /></button>
          </div>))}
        {studies.length > 0 && <AddPresentation studies={studies} onAdd={(sid, pres) => persist(studies.map((s) => s.id === sid ? { ...s, presentations: [...(s.presentations || []), pres] } : s))} />}
      </div>
    </div>);
}
function AddPresentation({ studies, onAdd }) {
  const { t } = window.useLang();
  const [open, setOpen] = useX(false);
  const [d, setD] = useX({ sid: '', title: '', venue: '', date: '' });
  if (!open) return <window.Button size="sm" variant="secondary" icon="plus" onClick={() => { setOpen(true); setD({ sid: studies[0].id, title: '', venue: '', date: '' }); }}>{t('p_addPres')}</window.Button>;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end', padding: 12, background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)' }}>
      <window.Field label="Study"><select style={{ ...window.fieldStyle, width: 'auto' }} value={d.sid} onChange={(e) => setD({ ...d, sid: e.target.value })}>{studies.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}</select></window.Field>
      <window.Field label="Title"><input style={{ ...window.fieldStyle, width: 200 }} value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} /></window.Field>
      <window.Field label="Venue"><input style={{ ...window.fieldStyle, width: 160 }} value={d.venue} onChange={(e) => setD({ ...d, venue: e.target.value })} /></window.Field>
      <window.Field label="Date"><input type="date" style={{ ...window.fieldStyle, width: 'auto' }} value={d.date} onChange={(e) => setD({ ...d, date: e.target.value })} /></window.Field>
      <window.Button size="sm" onClick={() => { if (d.title) { onAdd(d.sid, { title: d.title, venue: d.venue, date: d.date, status: 'planned' }); setOpen(false); } }}>Add</window.Button>
      <window.Button size="sm" variant="ghost" onClick={() => setOpen(false)}>{t('cancel')}</window.Button>
    </div>);
}

/* ---- Quiz Challenge ----------------------------------------- */
function weekKey(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const weekNum = 1 + Math.round(((date - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return date.getUTCFullYear() + '-W' + String(weekNum).padStart(2, '0');
}
const THIS_WEEK = weekKey(new Date());
function shuffleArr(a) { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[x[i], x[j]] = [x[j], x[i]]; } return x; }

function QuizChallenge() {
  const { t } = window.useLang();
  const questions = window.useCollection('quizQuestions');
  const scores = window.useCollection('quizScores', { orderBy: 'score', dir: 'desc' });
  const [name, setName] = useX(() => { try { return localStorage.getItem('quizUsername') || ''; } catch (e) { return ''; } });
  const [entered, setEntered] = useX(!!name);
  const [mode, setMode] = useX('home'); // home | play | done | board
  const [active, setActive] = useX([]);
  const [qi, setQi] = useX(0);
  const [picked, setPicked] = useX(null);
  const [points, setPoints] = useX(0);
  const [timeLeft, setTimeLeft] = useX(10);
  const timerRef = useXR(null);
  const played = scores.data.some((s) => s.id === name + '__' + THIS_WEEK);
  const prevKey = weekKey(new Date(Date.now() - 7 * 86400000));
  const podium = scores.data.filter((s) => s.week === prevKey).sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 3);

  useXE(() => () => clearInterval(timerRef.current), []);
  function startTimer() {
    clearInterval(timerRef.current);
    setTimeLeft(10);
    timerRef.current = setInterval(() => setTimeLeft((x) => {
      if (x <= 1) { clearInterval(timerRef.current); setPicked(-1); return 0; }
      return x - 1;
    }), 1000);
  }
  function start() {
    const wkNum = 1 + (Math.abs(THIS_WEEK.split('-W')[1] | 0) - 1) % 30;
    let pool = questions.data.filter((q) => (q.week || 1) === wkNum);
    if (!pool.length) pool = questions.data;
    setActive(shuffleArr(pool).slice(0, Math.min(5, pool.length)));
    setQi(0); setPicked(null); setPoints(0); setMode('play'); startTimer();
  }
  function pick(i) {
    if (picked !== null) return;
    clearInterval(timerRef.current);
    setPicked(i);
    const q = active[qi];
    if (i === q.correctIndex) setPoints((p) => p + Math.round(20 + 80 * Math.max(0, Math.min(1, timeLeft / 10))));
  }
  async function next() {
    if (qi + 1 < active.length) { setQi(qi + 1); setPicked(null); startTimer(); }
    else { setMode('done'); await window.HubDB.submitQuizScore(name, THIS_WEEK, points); }
  }
  const card = { maxWidth: 860, background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: 26 };

  if (!entered) {
    return (
      <div style={card}>
        <div className="ds-body-md-strong" style={{ marginBottom: 10 }}>{t('qUsername')}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input style={{ ...window.fieldStyle, maxWidth: 220 }} placeholder={t('qUsernamePh')} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && name.trim()) { try { localStorage.setItem('quizUsername', name.trim()); } catch (x) { } setEntered(true); } }} />
          <window.Button onClick={() => { if (name.trim()) { try { localStorage.setItem('quizUsername', name.trim()); } catch (x) { } setEntered(true); } }}>{t('qStart')}</window.Button>
        </div>
      </div>);
  }
  if (mode === 'play' && active.length) {
    const q = active[qi];
    return (
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span className="ds-caption" style={{ color: 'var(--mute)' }}>{t('qQuestion')} {qi + 1} {t('qOf')} {active.length}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: timeLeft <= 3 ? 'var(--st-red-fg)' : 'var(--accent)', display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="clock" size={15} />{timeLeft}s</span>
        </div>
        <div className="ds-body-md-strong" style={{ fontSize: 17, marginBottom: 16, textWrap: 'pretty' }}>{q.question}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(q.options || []).map((o, i) => {
            let bg = 'var(--canvas)', border = 'var(--hairline)', color = 'var(--ink)';
            if (picked !== null) {
              if (i === q.correctIndex) { bg = 'var(--st-green-bg)'; color = 'var(--st-green-fg)'; border = 'transparent'; }
              else if (i === picked) { bg = 'var(--st-red-bg)'; color = 'var(--st-red-fg)'; border = 'transparent'; }
            }
            return <button key={i} onClick={() => pick(i)} className="focusable" style={{ padding: '11px 14px', textAlign: 'left', borderRadius: 'var(--radius-sm)', border: '1px solid ' + border, background: bg, color, cursor: picked === null ? 'pointer' : 'default', fontFamily: 'var(--font-sans)', fontSize: 14 }}>{o}</button>;
          })}
        </div>
        {picked !== null && <div style={{ marginTop: 16 }}><window.Button iconRight="arrowRight" onClick={next}>{qi + 1 < active.length ? t('qQuestion') + ' ' + (qi + 2) : t('qFinished')}</window.Button></div>}
      </div>);
  }
  if (mode === 'done') {
    return (
      <div style={{ ...card, textAlign: 'center' }}>
        <Icon name="trophy" size={36} style={{ color: 'var(--st-gold-fg)' }} />
        <div className="ds-body-md-strong" style={{ fontSize: 20, margin: '10px 0 4px' }}>{t('qFinished')}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 700, color: 'var(--accent)', margin: '8px 0' }}>{points} {t('qPoints')}</div>
        <p className="ds-body-sm" style={{ color: 'var(--mute)', marginBottom: 14 }}>{t('qSubmitted')}</p>
        <window.Button variant="secondary" onClick={() => setMode('home')}>{t('qBack')}</window.Button>
      </div>);
  }
  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div className="ds-body-md-strong">{t('qWelcome')}, {name}</div>
        <button className="focusable" onClick={() => { setEntered(false); setName(''); try { localStorage.removeItem('quizUsername'); } catch (e) { } }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mute)', fontFamily: 'var(--font-sans)', fontSize: 12.5 }}>{t('qLogout')}</button>
      </div>
      {played && <div className="ds-body-sm" style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--st-gold-bg)', color: 'var(--st-gold-fg)', marginBottom: 14 }}>{t('qAlready')}</div>}
      {!played && questions.ready && questions.data.length === 0 && <div className="ds-body-sm" style={{ color: 'var(--mute)', marginBottom: 14 }}>{t('qNoQuestions')}</div>}
      {!played && questions.data.length > 0 && <window.Button icon="play" onClick={start} style={{ marginBottom: 18 }}>{t('qPlay')}</window.Button>}
      <window.Eyebrow style={{ margin: '10px 0' }}>{t('qThisWeek')}</window.Eyebrow>
      {podium.length === 0 && <div className="ds-body-sm" style={{ color: 'var(--mute)' }}>{t('qNoScores')}</div>}
      {podium.map((s, i) => (
        <div key={s.id || i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderTop: '1px solid var(--hairline)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, width: 22, color: ['var(--st-gold-fg)', 'var(--mute)', '#92580a'][i] }}>{i + 1}</span>
          <span className="ds-body-sm-strong" style={{ flex: 1 }}>{s.username}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--accent)' }}>{s.score} {t('qPoints')}</span>
        </div>))}
    </div>);
}

/* ---- Event editor (shared by calendar + admin) -------------- */
function EventEditor({ initial, onClose }) {
  const [d, setD] = useX({ title: initial.title || '', type: initial.type || 'meeting', date: initial.date || '', time: initial.time || '', notes: initial.notes || '' });
  async function save() {
    if (!d.title || !d.date) return;
    if (initial.id) await window.HubDB.update('researchEvents', initial.id, d);
    else await window.HubDB.add('researchEvents', d);
    onClose();
  }
  return (
    <window.Modal onClose={onClose} width={480}>
      <window.ModalHead title={initial.id ? 'Edit event' : 'Add event'} onClose={onClose} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <window.Field label="Title" span><input style={window.fieldStyle} value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} /></window.Field>
        <window.Field label="Type"><select style={window.fieldStyle} value={d.type} onChange={(e) => setD({ ...d, type: e.target.value })}>
          <option value="meeting">Research meeting</option><option value="congress">Congress</option><option value="deadline">Abstract / deadline</option><option value="other">Other</option></select></window.Field>
        <window.Field label="Date"><input type="date" style={window.fieldStyle} value={d.date} onChange={(e) => setD({ ...d, date: e.target.value })} /></window.Field>
        <window.Field label="Time (optional)"><input style={window.fieldStyle} placeholder="14:30" value={d.time} onChange={(e) => setD({ ...d, time: e.target.value })} /></window.Field>
        <window.Field label="Notes"><input style={window.fieldStyle} value={d.notes} onChange={(e) => setD({ ...d, notes: e.target.value })} /></window.Field>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 18, alignItems: 'center' }}>
        <window.Button onClick={save}>Save</window.Button>
        <window.Button variant="ghost" onClick={onClose}>Cancel</window.Button>
        <div style={{ flex: 1 }} />
        {initial.id && <window.Button variant="ghost" icon="trash" style={{ color: 'var(--st-red-fg)' }} onClick={async () => { await window.HubDB.remove('researchEvents', initial.id); onClose(); }}>Delete</window.Button>}
      </div>
    </window.Modal>);
}

/* ---- Research admin desk ------------------------------------ */
const IDEA_STATUSES = [['new', 'New', 'blue'], ['under_review', 'Under review', 'gold'], ['approved', 'Approved', 'green'], ['rejected', 'Rejected', 'red']];
function ideaStatusMeta(s) { return IDEA_STATUSES.find(([k]) => k === s) || IDEA_STATUSES[0]; }

function AdminIdeas() {
  const { locale } = window.useLang();
  const ideas = window.useCollection('researchIdeas', { orderBy: 'createdAt', dir: 'desc' });
  const [open, setOpen] = useX(null);
  const [noteDraft, setNoteDraft] = useX('');
  return (
    <div>
      {!ideas.ready && <window.EmptyState icon="database" title="Connecting..." />}
      {ideas.ready && ideas.data.length === 0 && <window.EmptyState icon="bulb" title="No ideas submitted yet" />}
      {ideas.data.map((idea) => {
        const [, label, st] = ideaStatusMeta(idea.status);
        const isOpen = open === idea.id;
        return (
          <div key={idea.id} style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', marginBottom: 10, overflow: 'hidden' }}>
            <div onClick={() => { setOpen(isOpen ? null : idea.id); setNoteDraft(idea.screeningNotes || ''); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer' }}>
              <Icon name={isOpen ? 'chevronDown' : 'chevronRight'} size={15} style={{ color: 'var(--mute)' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ds-body-sm-strong">{idea.title}</div>
                <div className="ds-caption" style={{ color: 'var(--mute)' }}>{idea.submitterName} {'\u00b7'} {idea.submitterEmail} {'\u00b7'} {window.HubDB.fmtTs(idea.createdAt, locale)}</div>
              </div>
              <span className={'ds-status ds-status-' + st}>{label}</span>
            </div>
            {isOpen &&
              <div style={{ padding: '0 16px 16px 43px' }}>
                {[['Objective', idea.objective], ['Sample', idea.sample], ['Methods', idea.methods], ['Links', idea.links], ['Notes', idea.notes]].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 8 }}>
                    <div className="ds-caption" style={{ color: 'var(--mute)', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.6px' }}>{k}</div>
                    <div className="ds-body-sm" style={{ color: 'var(--body)', whiteSpace: 'pre-wrap' }}>{v}</div>
                  </div>))}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0' }}>
                  {IDEA_STATUSES.map(([k, l]) => <window.FilterChip key={k} active={idea.status === k} onClick={() => window.HubDB.update('researchIdeas', idea.id, { status: k })}>{l}</window.FilterChip>)}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input style={{ ...window.fieldStyle, flex: 1 }} placeholder="Screening notes (internal)..." value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} />
                  <window.Button size="sm" variant="secondary" onClick={() => window.HubDB.update('researchIdeas', idea.id, { screeningNotes: noteDraft })}>Save note</window.Button>
                </div>
              </div>}
          </div>);
      })}
    </div>);
}

function AdminRequests() {
  const { locale } = window.useLang();
  const reqs = window.useCollection('paperRequests', { orderBy: 'createdAt', dir: 'desc' });
  return (
    <div>
      {reqs.ready && reqs.data.length === 0 && <window.EmptyState icon="download" title="No PDF requests yet" />}
      {reqs.data.map((r) => (
        <div key={r.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', padding: '12px 16px', marginBottom: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <a href={r.articleLink} target="_blank" rel="noreferrer" className="ds-body-sm-strong" style={{ color: 'var(--ink)', textDecoration: 'none' }}>{r.articleTitle || 'Untitled'}</a>
            <div className="ds-caption" style={{ color: 'var(--mute)' }}>{r.email} {'\u00b7'} {window.HubDB.fmtTs(r.createdAt, locale)}{r.notes ? ' \u00b7 ' + r.notes : ''}</div>
          </div>
          {r.status === 'fulfilled' ?
            <span className="ds-status ds-status-green">Fulfilled</span> :
            <window.Button size="sm" variant="secondary" icon="check" onClick={() => window.HubDB.update('paperRequests', r.id, { status: 'fulfilled' })}>Mark fulfilled</window.Button>}
        </div>))}
    </div>);
}

function AdminEvents() {
  const events = window.useCollection('researchEvents', { orderBy: 'date' });
  const [editing, setEditing] = useX(null);
  return (
    <div>
      <window.Button icon="plus" onClick={() => setEditing({})} style={{ marginBottom: 14 }}>Add event</window.Button>
      {events.data.map((e) => {
        const et = window.EV_TYPES[e.type] || window.EV_TYPES.other;
        return (
          <div key={e.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--accent)', width: 84 }}>{e.date}</span>
            <span className={'ds-status ds-status-' + et.st}>{e.type}</span>
            <span className="ds-body-sm-strong" style={{ flex: 1 }}>{e.title}</span>
            <window.Button size="sm" variant="ghost" icon="pencil" onClick={() => setEditing(e)} />
          </div>);
      })}
      {editing && <EventEditor initial={editing} onClose={() => setEditing(null)} />}
    </div>);
}

function AdminTips() {
  const { locale } = window.useLang();
  const tips = window.useCollection('tipPosts', { orderBy: 'createdAt', dir: 'desc' });
  const [editing, setEditing] = useX(undefined);
  return (
    <div>
      <window.Button icon="plus" onClick={() => setEditing(null)} style={{ marginBottom: 14 }}>New post</window.Button>
      {tips.data.map((p) => (
        <div key={p.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 6 }}>
          <Icon name="sparkles" size={15} style={{ color: 'var(--accent)' }} />
          <span className="ds-body-sm-strong" style={{ flex: 1 }}>{p.title}</span>
          <span className="ds-caption" style={{ color: 'var(--mute)' }}>{window.HubDB.fmtTs(p.createdAt, locale)}</span>
          <window.Button size="sm" variant="ghost" icon="pencil" onClick={() => setEditing(p)} />
          <window.Button size="sm" variant="ghost" icon="trash" onClick={() => window.HubDB.remove('tipPosts', p.id)} />
        </div>))}
      {editing !== undefined && <TipEditor initial={editing} onClose={() => setEditing(undefined)} />}
    </div>);
}
function TipEditor({ initial, onClose }) {
  const [d, setD] = useX({ title: (initial && initial.title) || '', coverImage: (initial && initial.coverImage) || '', body: (initial && initial.body) || '', charts: (initial && initial.charts) || [] });
  async function save() {
    if (!d.title) return;
    if (initial && initial.id) await window.HubDB.update('tipPosts', initial.id, d);
    else await window.HubDB.add('tipPosts', d);
    onClose();
  }
  function setChart(i, patch) { const c = d.charts.slice(); c[i] = { ...c[i], ...patch }; setD({ ...d, charts: c }); }
  return (
    <window.Modal onClose={onClose} width={640}>
      <window.ModalHead title={initial ? 'Edit post' : 'New post'} sub="Line breaks are preserved. Cover image: paste a hosted image URL." onClose={onClose} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <window.Field label="Title"><input style={window.fieldStyle} value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} /></window.Field>
        <window.Field label="Cover image URL (optional)"><input style={window.fieldStyle} placeholder="https://..." value={d.coverImage} onChange={(e) => setD({ ...d, coverImage: e.target.value })} /></window.Field>
        <window.Field label="Body"><textarea style={{ ...window.areaStyle, minHeight: 140 }} value={d.body} onChange={(e) => setD({ ...d, body: e.target.value })} /></window.Field>
        {d.charts.map((c, i) => (
          <div key={i} style={{ padding: 12, background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input style={{ ...window.fieldStyle, flex: 1 }} placeholder="Chart title" value={c.title} onChange={(e) => setChart(i, { title: e.target.value })} />
              <window.Button size="sm" variant="ghost" icon="trash" onClick={() => setD({ ...d, charts: d.charts.filter((_, x) => x !== i) })} />
            </div>
            {(c.rows || []).map((r, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <input style={{ ...window.fieldStyle, flex: 1, height: 32 }} placeholder="Label" value={r.label} onChange={(e) => { const rows = c.rows.slice(); rows[ri] = { ...r, label: e.target.value }; setChart(i, { rows }); }} />
                <input style={{ ...window.fieldStyle, width: 90, height: 32 }} placeholder="Value" value={r.value} onChange={(e) => { const rows = c.rows.slice(); rows[ri] = { ...r, value: e.target.value }; setChart(i, { rows }); }} />
              </div>))}
            <window.Button size="sm" variant="ghost" icon="plus" onClick={() => setChart(i, { rows: [...(c.rows || []), { label: '', value: '' }] })}>Row</window.Button>
          </div>))}
        <div><window.Button size="sm" variant="secondary" icon="plus" onClick={() => setD({ ...d, charts: [...d.charts, { title: '', rows: [{ label: '', value: '' }, { label: '', value: '' }] }] })}>Add chart</window.Button></div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
        <window.Button onClick={save}>Save</window.Button>
        <window.Button variant="ghost" onClick={onClose}>Cancel</window.Button>
      </div>
    </window.Modal>);
}

function AdminLibrary() {
  const lib = window.useCollection('paperLibrary', { orderBy: 'createdAt', dir: 'desc' });
  const [editing, setEditing] = useX(undefined);
  return (
    <div>
      <window.Button icon="plus" onClick={() => setEditing(null)} style={{ marginBottom: 14 }}>Add entry</window.Button>
      {lib.data.map((e) => (
        <div key={e.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 6 }}>
          <span className="ds-body-sm-strong" style={{ flex: 1, minWidth: 0 }}>{e.title}</span>
          <span className="ds-caption" style={{ fontFamily: 'var(--font-mono)', color: 'var(--mute)' }}>{e.pmid}</span>
          <window.Button size="sm" variant="ghost" icon="pencil" onClick={() => setEditing(e)} />
          <window.Button size="sm" variant="ghost" icon="trash" onClick={() => window.HubDB.remove('paperLibrary', e.id)} />
        </div>))}
      {editing !== undefined && <LibEditor initial={editing} onClose={() => setEditing(undefined)} />}
    </div>);
}
function LibEditor({ initial, onClose }) {
  const [d, setD] = useX({ title: (initial && initial.title) || '', authors: (initial && initial.authors) || '', journal: (initial && initial.journal) || '', year: (initial && initial.year) || '', pmid: (initial && initial.pmid) || '' });
  async function save() {
    if (!d.title) return;
    if (initial && initial.id) await window.HubDB.update('paperLibrary', initial.id, d);
    else await window.HubDB.add('paperLibrary', d);
    onClose();
  }
  return (
    <window.Modal onClose={onClose} width={520}>
      <window.ModalHead title={initial ? 'Edit entry' : 'Add entry'} onClose={onClose} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <window.Field label="Title" span><input style={window.fieldStyle} value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} /></window.Field>
        <window.Field label="Authors" span><input style={window.fieldStyle} value={d.authors} onChange={(e) => setD({ ...d, authors: e.target.value })} /></window.Field>
        <window.Field label="Journal"><input style={window.fieldStyle} value={d.journal} onChange={(e) => setD({ ...d, journal: e.target.value })} /></window.Field>
        <window.Field label="Year"><input style={window.fieldStyle} value={d.year} onChange={(e) => setD({ ...d, year: e.target.value })} /></window.Field>
        <window.Field label="PMID" span><input style={window.fieldStyle} value={d.pmid} onChange={(e) => setD({ ...d, pmid: e.target.value })} /></window.Field>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
        <window.Button onClick={save}>Save</window.Button>
        <window.Button variant="ghost" onClick={onClose}>Cancel</window.Button>
      </div>
    </window.Modal>);
}

function AdminQuiz() {
  const questions = window.useCollection('quizQuestions', { orderBy: 'createdAt', dir: 'desc' });
  const [editing, setEditing] = useX(undefined);
  return (
    <div>
      <window.Button icon="plus" onClick={() => setEditing(null)} style={{ marginBottom: 14 }}>Add question</window.Button>
      {questions.data.map((q) => (
        <div key={q.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--mute)', width: 46 }}>W{q.week || 1}</span>
          <span className="ds-body-sm" style={{ flex: 1, minWidth: 0 }}>{q.question}</span>
          <window.Button size="sm" variant="ghost" icon="pencil" onClick={() => setEditing(q)} />
          <window.Button size="sm" variant="ghost" icon="trash" onClick={() => window.HubDB.remove('quizQuestions', q.id)} />
        </div>))}
      {editing !== undefined && <QuizEditor initial={editing} onClose={() => setEditing(undefined)} />}
    </div>);
}
function QuizEditor({ initial, onClose }) {
  const [d, setD] = useX({ question: (initial && initial.question) || '', options: (initial && initial.options) || ['', '', '', ''], correctIndex: (initial && initial.correctIndex) || 0, week: (initial && initial.week) || 1 });
  async function save() {
    if (!d.question || d.options.filter(Boolean).length < 2) return;
    const payload = { ...d, week: +d.week || 1, options: d.options.filter(Boolean) };
    if (initial && initial.id) await window.HubDB.update('quizQuestions', initial.id, payload);
    else await window.HubDB.add('quizQuestions', payload);
    onClose();
  }
  return (
    <window.Modal onClose={onClose} width={560}>
      <window.ModalHead title={initial ? 'Edit question' : 'Add question'} sub="Pick the correct answer with the radio button. Week 1-30 rotates on the ISO calendar." onClose={onClose} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <window.Field label="Question"><textarea style={{ ...window.areaStyle, minHeight: 60 }} value={d.question} onChange={(e) => setD({ ...d, question: e.target.value })} /></window.Field>
        {d.options.map((o, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input type="radio" name="qc" checked={d.correctIndex === i} onChange={() => setD({ ...d, correctIndex: i })} />
            <input style={{ ...window.fieldStyle, flex: 1 }} placeholder={'Option ' + (i + 1)} value={o} onChange={(e) => { const opts = d.options.slice(); opts[i] = e.target.value; setD({ ...d, options: opts }); }} />
          </div>))}
        <window.Field label="Week (1-30)"><input type="number" min="1" max="30" style={{ ...window.fieldStyle, width: 110 }} value={d.week} onChange={(e) => setD({ ...d, week: e.target.value })} /></window.Field>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
        <window.Button onClick={save}>Save</window.Button>
        <window.Button variant="ghost" onClick={onClose}>Cancel</window.Button>
      </div>
    </window.Modal>);
}

function ResearchAdmin() {
  const [tab, setTab] = useX('ideas');
  const tabs = [['ideas', 'Ideas', 'bulb'], ['requests', 'PDF requests', 'download'], ['events', 'Events', 'calendar'], ['tips', 'Tips', 'sparkles'], ['library', 'Library', 'bookMarked'], ['quiz', 'Quiz', 'trophy']];
  return (
    <div style={{ maxWidth: 860 }}>
      <div className="ds-body-sm" style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--mute)', marginBottom: 14 }}>
        <Icon name="shield" size={14} /> Admin desk — only area admins and super admins see this section.
      </div>
      <window.Segmented options={tabs.map(([value, label, icon]) => ({ value, label, icon }))} value={tab} onChange={setTab} />
      <div style={{ marginTop: 18 }}>
        {tab === 'ideas' && <AdminIdeas />}
        {tab === 'requests' && <AdminRequests />}
        {tab === 'events' && <AdminEvents />}
        {tab === 'tips' && <AdminTips />}
        {tab === 'library' && <AdminLibrary />}
        {tab === 'quiz' && <AdminQuiz />}
      </div>
    </div>);
}

Object.assign(window, { PhdActivities, QuizChallenge, EventEditor, ResearchAdmin });
