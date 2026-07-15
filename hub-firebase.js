/* ============================================================
   PSG Performance Workspace — shared Firebase data layer.
   One connection for the whole app (same project the two
   prototypes already use: phd-tracker-22d93). Exposes:
     window.HubDB   — promise-based Firestore API
     window.useCollection(name, opts) — React hook, live list
     window.useDocument(name, id)     — React hook, live doc
   ============================================================ */
(function () {
  const CONFIG = {
    apiKey: "AIzaSyAdKgOZILgA_r6axtQKWWLqVaDBUkp6OKE",
    authDomain: "phd-tracker-22d93.firebaseapp.com",
    projectId: "phd-tracker-22d93",
    storageBucket: "phd-tracker-22d93.firebasestorage.app",
    messagingSenderId: "252875836800",
    appId: "1:252875836800:web:dc6575ffab316da3744565"
  };
  let fs = null, db = null;
  const ready = (async () => {
    const appMod = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    fs = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
    const app = appMod.initializeApp(CONFIG);
    db = fs.getFirestore(app);
  })();

  async function watch(name, opts, cb, onErr) {
    await ready;
    let q = fs.collection(db, name);
    if (opts && opts.orderBy) q = fs.query(q, fs.orderBy(opts.orderBy, opts.dir || 'asc'));
    return fs.onSnapshot(q,
      (snap) => cb(snap.docs.map((d) => Object.assign({ id: d.id }, d.data()))),
      onErr || (() => {}));
  }
  async function watchDoc(name, id, cb, onErr) {
    await ready;
    return fs.onSnapshot(fs.doc(db, name, id),
      (snap) => cb(snap.exists() ? Object.assign({ id: snap.id }, snap.data()) : null),
      onErr || (() => {}));
  }
  async function add(name, data) {
    await ready;
    return fs.addDoc(fs.collection(db, name), Object.assign({ createdAt: fs.serverTimestamp() }, data));
  }
  async function update(name, id, data) { await ready; return fs.updateDoc(fs.doc(db, name, id), data); }
  async function set(name, id, data, merge) { await ready; return fs.setDoc(fs.doc(db, name, id), data, merge ? { merge: true } : {}); }
  async function remove(name, id) { await ready; return fs.deleteDoc(fs.doc(db, name, id)); }
  async function getOnce(name, id) {
    await ready;
    const snap = await fs.getDoc(fs.doc(db, name, id));
    return snap.exists() ? Object.assign({ id: snap.id }, snap.data()) : null;
  }
  /* Article star rating: transactional sum/count, replacing a previous vote */
  async function submitRating(articleId, value, previousValue) {
    await ready;
    const ref = fs.doc(db, 'articleRatings', articleId);
    await fs.runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.exists() ? snap.data() : { sum: 0, count: 0 };
      const hadPrev = previousValue > 0;
      tx.set(ref, {
        sum: (data.sum || 0) - (hadPrev ? previousValue : 0) + value,
        count: (data.count || 0) + (hadPrev ? 0 : 1)
      });
    });
  }
  async function submitQuizScore(username, weekKey, points) {
    await ready;
    const id = username + '__' + weekKey;
    const ref = fs.doc(db, 'quizScores', id);
    const snap = await fs.getDoc(ref);
    if (snap.exists()) {
      await fs.setDoc(ref, { username, week: weekKey, score: fs.increment(points), updatedAt: fs.serverTimestamp() }, { merge: true });
    } else {
      await fs.setDoc(ref, { username, week: weekKey, score: points, updatedAt: fs.serverTimestamp() });
    }
  }
  function fmtTs(ts, locale, opts) {
    if (!ts || !ts.toDate) return '';
    return ts.toDate().toLocaleDateString(locale || 'en-GB', opts || { day: 'numeric', month: 'short', year: 'numeric' });
  }

  window.HubDB = { ready, watch, watchDoc, add, update, set, remove, getOnce, submitRating, submitQuizScore, fmtTs };

  /* React hooks (assigned lazily; React is present before app files run) */
  window.useCollection = function (name, opts) {
    const { useState, useEffect } = window.React;
    const [state, setState] = useState({ data: [], ready: false, failed: false });
    useEffect(() => {
      let unsub = null, dead = false;
      watch(name, opts || null,
        (data) => { if (!dead) setState({ data, ready: true, failed: false }); },
        () => { if (!dead) setState((s) => ({ ...s, failed: true, ready: true })); }
      ).then((u) => { if (dead) u(); else unsub = u; })
       .catch(() => { if (!dead) setState((s) => ({ ...s, failed: true, ready: true })); });
      return () => { dead = true; if (unsub) unsub(); };
    }, [name]);
    return state;
  };
  window.useDocument = function (name, id) {
    const { useState, useEffect } = window.React;
    const [state, setState] = useState({ data: null, ready: false, failed: false });
    useEffect(() => {
      if (!id) { setState({ data: null, ready: false, failed: false }); return; }
      let unsub = null, dead = false;
      watchDoc(name, id,
        (data) => { if (!dead) setState({ data, ready: true, failed: false }); },
        () => { if (!dead) setState((s) => ({ ...s, failed: true, ready: true })); }
      ).then((u) => { if (dead) u(); else unsub = u; })
       .catch(() => { if (!dead) setState((s) => ({ ...s, failed: true, ready: true })); });
      return () => { dead = true; if (unsub) unsub(); };
    }, [name, id]);
    return state;
  };
})();
