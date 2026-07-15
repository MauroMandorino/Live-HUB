// ============================================================
// PSG Performance Hub — deterministic script loader.
// Loads React + Babel (pinned, with SRI), then fetches and
// transpiles the app's JSX sources strictly in order — no
// async <script> races between vendor and app code.
// ============================================================
(() => {
  const BASE = new URL('.', document.currentScript && document.currentScript.src ? document.currentScript.src : location.href);
  const FILES = [
    'tweaks-panel.jsx',
    'hub-firebase.js',
    'hub-i18n.jsx',
    'hub-icons-data.jsx',
    'hub-components.jsx',
    'hub-screens-home.jsx',
    'hub-screens-updates.jsx',
    'hub-screens-technology.jsx',
    'hub-screens-research.jsx',
    'hub-screens-research-extra.jsx',
    'hub-main.jsx',
  ];
  // React + ReactDOM are provided by the DC runtime (support.js), which loads
  // them and assigns window.React / window.ReactDOM. We MUST reuse that single
  // instance — loading our own copy here would leave the runtime's ReactDOM
  // paired with our React (or vice-versa), which throws "Invalid hook call".
  // So we only load Babel ourselves, then wait for the runtime's React.
  const VENDOR = [
    ['https://unpkg.com/@babel/standalone@7.29.0/babel.min.js', 'sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y'],
  ];
  const loadScript = (src, integrity) => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.async = false;
    if (integrity) { s.integrity = integrity; s.crossOrigin = 'anonymous'; }
    s.onload = resolve;
    s.onerror = () => reject(new Error('hub-loader: failed to load ' + src));
    document.head.appendChild(s);
  });
  const waitForReact = () => new Promise((resolve, reject) => {
    const t0 = Date.now();
    (function poll() {
      if (window.React && window.ReactDOM) return resolve();
      if (Date.now() - t0 > 30000) return reject(new Error('hub-loader: window.React/ReactDOM never became available'));
      setTimeout(poll, 25);
    })();
  });
  (async () => {
    if (window.__hubLoaderStarted) return;
    window.__hubLoaderStarted = true;
    for (const v of VENDOR) await loadScript(v[0], v[1]);
    await waitForReact();
    for (const f of FILES) {
      const res = await fetch(new URL(f, BASE));
      if (!res.ok) throw new Error('hub-loader: HTTP ' + res.status + ' on ' + f);
      const code = window.Babel.transform(await res.text(), { presets: ['react'], filename: f }).code;
      const s = document.createElement('script');
      // Wrap each module in its own scope: classic scripts share ONE global
      // lexical environment, so bare top-level `const Icon` / `const useState`
      // in sibling files would collide. window.* exports still escape the IIFE.
      s.textContent = '(function(){\n' + code + '\n})();\n//# sourceURL=' + f;
      document.head.appendChild(s);
    }
  })().catch((e) => console.error(e));
})();
