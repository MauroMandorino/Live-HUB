/* @ds-bundle: {"format":4,"namespace":"PSGPerformanceDesignSystem_e67e43","components":[{"name":"Pitch","sourcePath":"components/pitch/Pitch.jsx"}],"sourceHashes":{"components/pitch/Pitch.jsx":"b2b640947021","examples/guidelines/ds-base.js":"80ac2318a63d","examples/quarterly-update/ds-base.js":"80ac2318a63d","examples/research-hub/demo-data.js":"aa03f965ddde","examples/roles/ds-base.js":"80ac2318a63d","hero-tweaks.jsx":"40f224f41e88","tweaks-panel.jsx":"4f181eb354cd"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PSGPerformanceDesignSystem_e67e43 = window.PSGPerformanceDesignSystem_e67e43 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/pitch/Pitch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Pitch.jsx — the pitch graphic family.
// One component, every register: full-detail plotting pitch (true 105×68 m
// coordinates for pass maps), simplified tiers for lineups and training
// examples, zone overlays (thirds / half-spaces), half pitches with a
// direction-of-play arrow, aspect-ratio crops, and the training-space
// shading from the original guidelines document.
//
// All coordinates (markers, passes, areas) are in metres on a 105×68 pitch,
// origin top-left, attack towards +x (landscape). Portrait rotates the same
// coordinate space 90° so attack points up: plot once, render either way.
//
// Monochrome by design: lines ride the ink/neutral registers, the shaded
// training area rides the accent-soft tokens, plotted data rides the sealed
// viz categoricals. No green, no grass: same law as the rest of the system.

const PL = 105,
  PW = 68; // length × width, metres
const PA_D = 16.5,
  PA_Y = 13.84,
  PA_W = 40.32; // penalty area
const GA_D = 5.5,
  GA_Y = 24.84,
  GA_W = 18.32; // goal area
const SPOT = 11,
  ARC_R = 9.15; // penalty spot, circle radius
const GOAL_W = 7.32,
  GOAL_Y = 30.34,
  GOAL_D = 2;
const LANE_Y = [13.84, 24.84, 43.16, 54.16]; // juego-de-posición lane bounds
const THIRD_X = [35, 70];
const PITCH_TONES = {
  ink: {
    line: 'var(--ink)',
    label: 'var(--mute)'
  },
  soft: {
    line: 'var(--hairline-strong)',
    label: 'var(--mute)'
  },
  faint: {
    line: 'var(--hairline)',
    label: 'var(--hairline-strong)'
  },
  hero: {
    line: 'rgba(255,255,255,0.8)',
    label: 'rgba(255,255,255,0.55)'
  }
};
const MARK_COLORS = {
  a: 'var(--viz-blue)',
  b: 'var(--viz-berry)',
  n: 'var(--viz-ink)'
};
function pitchBool(v, dflt) {
  if (v === undefined || v === null || v === '') return dflt;
  return v === true || v === 'true' || v === 1 || v === '1';
}
function pitchRects(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(function (r) {
    return Array.isArray(r) ? r : [r.x, r.y, r.w, r.h];
  });
  return String(v).split(';').map(function (s) {
    return s.trim();
  }).filter(Boolean).map(function (s) {
    return s.split(',').map(Number);
  }).filter(function (r) {
    return r.length === 4 && r.every(isFinite);
  });
}
function pitchList(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  try {
    var a = JSON.parse(v);
    return Array.isArray(a) ? a : [];
  } catch (e) {
    return [];
  }
}
function Pitch(props) {
  var portrait = props.orientation === 'portrait';
  var detail = props.detail || 'standard'; // minimal | standard | full
  var extent = props.extent || 'full'; // full | half-left | half-right
  var zones = props.zones || 'none'; // none | thirds | halfspaces | grid
  var zoneLabels = pitchBool(props.zoneLabels, false);
  var direction = props.direction || 'none'; // none | right | left
  var dirLabel = props.directionLabel || '';
  var tone = PITCH_TONES[props.tone] || PITCH_TONES.ink;
  var lw = isFinite(Number(props.lineWeight)) && Number(props.lineWeight) > 0 ? Number(props.lineWeight) : 1.5;
  var pad = props.pad !== undefined && props.pad !== '' ? Number(props.pad) : 3;
  var areas = pitchRects(props.area);
  var areaLabels = String(props.areaLabel || '').split(';');
  var markers = pitchList(props.markers);
  var passes = pitchList(props.passes);
  var std = detail !== 'minimal';
  var full = detail === 'full';

  // Map pitch coords → rendered coords (portrait rotates so attack points up)
  var pt = function (x, y) {
    return portrait ? [y, PL - x] : [x, y];
  };
  var areaFill = props.tone === 'hero' ? 'rgba(255,255,255,0.14)' : 'var(--accent-soft)';
  var areaStroke = props.tone === 'hero' ? 'rgba(255,255,255,0.5)' : 'var(--accent-line)';
  var zoneFill = areaFill;
  var stroke = {
    fill: 'none',
    stroke: tone.line,
    strokeWidth: lw,
    vectorEffect: 'non-scaling-stroke'
  };
  var dashed = Object.assign({}, stroke, {
    strokeDasharray: '1.4 1.6'
  });
  var labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 2.4,
    letterSpacing: '0.09em',
    fill: tone.label,
    textAnchor: 'middle'
  };
  var k = 0;
  var under = [],
    lines = [],
    over = [];

  // ── Zones (under the pitch lines) ──────────────────────────────────────
  if (zones === 'halfspaces' || zones === 'grid') {
    under.push(/*#__PURE__*/React.createElement("rect", {
      key: ++k,
      x: "0",
      y: LANE_Y[0],
      width: PL,
      height: LANE_Y[1] - LANE_Y[0],
      fill: zoneFill,
      opacity: "0.55"
    }), /*#__PURE__*/React.createElement("rect", {
      key: ++k,
      x: "0",
      y: LANE_Y[2],
      width: PL,
      height: LANE_Y[3] - LANE_Y[2],
      fill: zoneFill,
      opacity: "0.55"
    }));
    LANE_Y.forEach(function (y) {
      under.push(/*#__PURE__*/React.createElement("line", _extends({
        key: ++k,
        x1: "0",
        y1: y,
        x2: PL,
        y2: y
      }, dashed)));
    });
  }
  if (zones === 'thirds' || zones === 'grid') {
    THIRD_X.forEach(function (x) {
      under.push(/*#__PURE__*/React.createElement("line", _extends({
        key: ++k,
        x1: x,
        y1: "0",
        x2: x,
        y2: PW
      }, dashed)));
    });
  }

  // ── Shaded training / focus areas ──────────────────────────────────────
  areas.forEach(function (r, i) {
    under.push(/*#__PURE__*/React.createElement("rect", {
      key: 'a' + i,
      x: r[0],
      y: r[1],
      width: r[2],
      height: r[3],
      fill: areaFill,
      stroke: areaStroke,
      strokeWidth: lw * 0.7,
      vectorEffect: "non-scaling-stroke"
    }));
  });

  // ── Pitch lines ────────────────────────────────────────────────────────
  // A centre-circle crest clears the markings it would sit across: the
  // halfway line breaks at the circle and the centre dot is dropped.
  var centerCrest = props.crest === 'center' && !!props.crestSrc;
  lines.push(/*#__PURE__*/React.createElement("rect", _extends({
    key: ++k,
    x: "0",
    y: "0",
    width: PL,
    height: PW
  }, stroke)));
  if (centerCrest) {
    lines.push(/*#__PURE__*/React.createElement("line", _extends({
      key: ++k,
      x1: PL / 2,
      y1: "0",
      x2: PL / 2,
      y2: PW / 2 - ARC_R
    }, stroke)), /*#__PURE__*/React.createElement("line", _extends({
      key: ++k,
      x1: PL / 2,
      y1: PW / 2 + ARC_R,
      x2: PL / 2,
      y2: PW
    }, stroke)));
  } else {
    lines.push(/*#__PURE__*/React.createElement("line", _extends({
      key: ++k,
      x1: PL / 2,
      y1: "0",
      x2: PL / 2,
      y2: PW
    }, stroke)));
  }
  lines.push(/*#__PURE__*/React.createElement("circle", _extends({
    key: ++k,
    cx: PL / 2,
    cy: PW / 2,
    r: ARC_R
  }, stroke)));
  if (std) {
    lines.push(/*#__PURE__*/React.createElement("rect", _extends({
      key: ++k,
      x: "0",
      y: PA_Y,
      width: PA_D,
      height: PA_W
    }, stroke)), /*#__PURE__*/React.createElement("rect", _extends({
      key: ++k,
      x: PL - PA_D,
      y: PA_Y,
      width: PA_D,
      height: PA_W
    }, stroke)), /*#__PURE__*/React.createElement("rect", _extends({
      key: ++k,
      x: "0",
      y: GA_Y,
      width: GA_D,
      height: GA_W
    }, stroke)), /*#__PURE__*/React.createElement("rect", _extends({
      key: ++k,
      x: PL - GA_D,
      y: GA_Y,
      width: GA_D,
      height: GA_W
    }, stroke)));
    if (!centerCrest) lines.push(/*#__PURE__*/React.createElement("circle", {
      key: ++k,
      cx: PL / 2,
      cy: PW / 2,
      r: "0.45",
      fill: tone.line
    }));
  }
  if (full) {
    var dy = Math.sqrt(ARC_R * ARC_R - (PA_D - SPOT) * (PA_D - SPOT)); // 7.31
    lines.push(/*#__PURE__*/React.createElement("circle", {
      key: ++k,
      cx: SPOT,
      cy: PW / 2,
      r: "0.45",
      fill: tone.line
    }), /*#__PURE__*/React.createElement("circle", {
      key: ++k,
      cx: PL - SPOT,
      cy: PW / 2,
      r: "0.45",
      fill: tone.line
    }), /*#__PURE__*/React.createElement("path", _extends({
      key: ++k,
      d: 'M ' + PA_D + ' ' + (PW / 2 - dy) + ' A ' + ARC_R + ' ' + ARC_R + ' 0 0 1 ' + PA_D + ' ' + (PW / 2 + dy)
    }, stroke)), /*#__PURE__*/React.createElement("path", _extends({
      key: ++k,
      d: 'M ' + (PL - PA_D) + ' ' + (PW / 2 - dy) + ' A ' + ARC_R + ' ' + ARC_R + ' 0 0 0 ' + (PL - PA_D) + ' ' + (PW / 2 + dy)
    }, stroke)), /*#__PURE__*/React.createElement("path", _extends({
      key: ++k,
      d: "M 1 0 A 1 1 0 0 1 0 1"
    }, stroke)), /*#__PURE__*/React.createElement("path", _extends({
      key: ++k,
      d: 'M ' + PL + ' 1 A 1 1 0 0 1 ' + (PL - 1) + ' 0'
    }, stroke)), /*#__PURE__*/React.createElement("path", _extends({
      key: ++k,
      d: 'M ' + (PL - 1) + ' ' + PW + ' A 1 1 0 0 1 ' + PL + ' ' + (PW - 1)
    }, stroke)), /*#__PURE__*/React.createElement("path", _extends({
      key: ++k,
      d: 'M 0 ' + (PW - 1) + ' A 1 1 0 0 1 1 ' + PW
    }, stroke)), /*#__PURE__*/React.createElement("rect", _extends({
      key: ++k,
      x: -GOAL_D,
      y: GOAL_Y,
      width: GOAL_D,
      height: GOAL_W
    }, stroke)), /*#__PURE__*/React.createElement("rect", _extends({
      key: ++k,
      x: PL,
      y: GOAL_Y,
      width: GOAL_D,
      height: GOAL_W
    }, stroke)));
  }

  // ── Direction-of-play arrow (outside the touchline) ────────────────────
  if (direction !== 'none') {
    var span = extent === 'half-left' ? [14, 38.5] : extent === 'half-right' ? [66.5, 91] : [39.5, 65.5];
    var ax0 = direction === 'left' ? span[1] : span[0];
    var ax1 = direction === 'left' ? span[0] : span[1];
    var ay = PW + 5;
    var hd = direction === 'left' ? -1 : 1;
    lines.push(/*#__PURE__*/React.createElement("line", _extends({
      key: ++k,
      x1: ax0,
      y1: ay,
      x2: ax1 - hd * 0.6,
      y2: ay
    }, stroke)), /*#__PURE__*/React.createElement("path", {
      key: ++k,
      d: 'M ' + ax1 + ' ' + ay + ' L ' + (ax1 - hd * 2.6) + ' ' + (ay - 1.5) + ' L ' + (ax1 - hd * 2.6) + ' ' + (ay + 1.5) + ' Z',
      fill: tone.line
    }));
  }

  // ── Labels + plotted data (unrotated, mapped through pt) ───────────────
  if (zoneLabels && (zones === 'thirds' || zones === 'grid')) {
    [['Defensive third', 17.5], ['Middle third', 52.5], ['Final third', 87.5]].forEach(function (t) {
      var p = pt(t[1], portrait ? 3.6 : 3.4);
      over.push(/*#__PURE__*/React.createElement("text", {
        key: ++k,
        x: p[0],
        y: p[1],
        style: labelStyle,
        dominantBaseline: "middle"
      }, t[0].toUpperCase()));
    });
  }
  if (zoneLabels && (zones === 'halfspaces' || zones === 'grid')) {
    var lx = extent === 'half-right' ? 78.75 : 26.25;
    [['Wing', 6.9], ['Half-space', 19.34], ['Centre', 34], ['Half-space', 48.66], ['Wing', 61.08]].forEach(function (t) {
      var p = pt(lx, t[1]);
      over.push(/*#__PURE__*/React.createElement("text", {
        key: ++k,
        x: p[0],
        y: p[1],
        style: labelStyle,
        dominantBaseline: "middle"
      }, t[0].toUpperCase()));
    });
  }
  areas.forEach(function (r, i) {
    var s = (areaLabels[i] || '').trim();
    if (!s) return;
    var p = pt(r[0] + 1.4, r[1] + (portrait ? 1.4 : 3.2));
    over.push(/*#__PURE__*/React.createElement("text", {
      key: 'al' + i,
      x: p[0],
      y: p[1] + (portrait ? 1.8 : 0),
      style: Object.assign({}, labelStyle, {
        textAnchor: 'start',
        fill: 'var(--accent)'
      })
    }, s.toUpperCase()));
  });
  if (direction !== 'none' && dirLabel) {
    var mp = pt(extent === 'half-left' ? 26.25 : extent === 'half-right' ? 78.75 : 52.5, PW + 9.2);
    over.push(/*#__PURE__*/React.createElement("text", {
      key: ++k,
      x: mp[0] + (portrait ? 2.6 : 0),
      y: mp[1],
      style: labelStyle,
      dominantBaseline: "middle"
    }, String(dirLabel).toUpperCase()));
  }
  passes.forEach(function (ps, i) {
    var c = MARK_COLORS[ps.k] || MARK_COLORS.a;
    var p1 = pt(ps.x1, ps.y1),
      p2 = pt(ps.x2, ps.y2);
    var ang = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
    var bx = p2[0] - 2 * Math.cos(ang),
      by = p2[1] - 2 * Math.sin(ang);
    var nx = Math.sin(ang),
      ny = -Math.cos(ang);
    over.push(/*#__PURE__*/React.createElement("line", {
      key: 'p' + i,
      x1: p1[0],
      y1: p1[1],
      x2: bx,
      y2: by,
      stroke: c,
      strokeWidth: lw,
      vectorEffect: "non-scaling-stroke",
      opacity: "0.9"
    }), /*#__PURE__*/React.createElement("path", {
      key: 'ph' + i,
      d: 'M ' + p2[0] + ' ' + p2[1] + ' L ' + (bx + nx) + ' ' + (by + ny) + ' L ' + (bx - nx) + ' ' + (by - ny) + ' Z',
      fill: c
    }));
  });
  markers.forEach(function (m, i) {
    var p = pt(m.x, m.y);
    if (m.k === 'ball') {
      over.push(/*#__PURE__*/React.createElement("circle", {
        key: 'm' + i,
        cx: p[0],
        cy: p[1],
        r: "0.9",
        fill: "var(--canvas)",
        stroke: "var(--ink)",
        strokeWidth: lw * 0.8,
        vectorEffect: "non-scaling-stroke"
      }));
      return;
    }
    var c = MARK_COLORS[m.k] || MARK_COLORS.a;
    over.push(/*#__PURE__*/React.createElement("circle", {
      key: 'm' + i,
      cx: p[0],
      cy: p[1],
      r: "1.9",
      fill: c
    }));
    if (m.n !== undefined && m.n !== null && m.n !== '') {
      over.push(/*#__PURE__*/React.createElement("text", {
        key: 'mn' + i,
        x: p[0],
        y: p[1],
        fill: "#ffffff",
        fontFamily: "var(--font-mono)",
        fontSize: "1.9",
        fontWeight: "500",
        textAnchor: "middle",
        dominantBaseline: "central"
      }, m.n));
    }
  });

  // ── ViewBox: extent, orientation, aspect crop ──────────────────────────
  var bx0 = extent === 'half-right' ? PL / 2 : -Math.max(pad, full ? 2.6 : 0.5);
  var bx1 = extent === 'half-left' ? PL / 2 : PL + Math.max(pad, full ? 2.6 : 0.5);
  var by0 = -pad;
  var by1 = PW + pad + (direction !== 'none' ? dirLabel ? 9.5 : 5.5 : 0);
  var vx, vy, vw, vh;
  if (portrait) {
    vx = by0;
    vy = PL - bx1;
    vw = by1 - by0;
    vh = bx1 - bx0;
  } else {
    vx = bx0;
    vy = by0;
    vw = bx1 - bx0;
    vh = by1 - by0;
  }
  var aspect = props.aspect && props.aspect !== 'natural' ? String(props.aspect).split(/[:/x]/).map(Number) : null;
  if (aspect && aspect.length === 2 && aspect[0] > 0 && aspect[1] > 0) {
    var r = aspect[0] / aspect[1];
    var anchor = props.anchor || 'center';
    if (vw / vh > r) {
      var nw = vh * r;
      vx += anchor === 'left' ? 0 : anchor === 'right' ? vw - nw : (vw - nw) / 2;
      vw = nw;
    } else if (vw / vh < r) {
      var nh = vw / r;
      vy += anchor === 'top' ? 0 : anchor === 'bottom' ? vh - nh : (vh - nh) / 2;
      vh = nh;
    }
  }
  var surface = props.surface === 'canvas' ? 'var(--canvas)' : props.surface === 'soft' ? 'var(--canvas-soft)' : props.surface && props.surface !== 'none' ? props.surface : null;

  // ── Crest: inscribed in the centre circle, or small in a pitch corner ──
  var crest = props.crest || 'none';
  var crestEls = [];
  if (crest !== 'none' && props.crestSrc) {
    var cop = isFinite(Number(props.crestOpacity)) ? Number(props.crestOpacity) : 1;
    var cx, cy, cw;
    if (crest === 'center') {
      cw = ARC_R * 2; // fill the centre circle
      var cc = pt(PL / 2, PW / 2);
      cx = cc[0] - ARC_R;
      cy = cc[1] - ARC_R;
    } else {
      cw = isFinite(Number(props.crestSize)) && Number(props.crestSize) > 0 ? Number(props.crestSize) : 7;
      var suf = crest.split('-')[1] || 'tr';
      var inset = 2.2;
      var rpw = portrait ? PW : PL,
        rph = portrait ? PL : PW; // rendered pitch bounds
      cx = suf.charAt(1) === 'l' ? inset : rpw - inset - cw;
      cy = suf.charAt(0) === 't' ? inset : rph - inset - cw;
    }
    crestEls.push(/*#__PURE__*/React.createElement("image", {
      key: "crest",
      href: props.crestSrc,
      x: cx,
      y: cy,
      width: cw,
      height: cw,
      opacity: cop,
      preserveAspectRatio: "xMidYMid meet"
    }));
  }
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: vx + ' ' + vy + ' ' + vw + ' ' + vh,
    width: props.width !== undefined ? props.width : '100%',
    height: props.height,
    style: props.style,
    className: props.className,
    role: "img",
    "aria-label": props.ariaLabel || 'Football pitch diagram',
    preserveAspectRatio: "xMidYMid meet"
  }, surface ? /*#__PURE__*/React.createElement("rect", {
    x: vx,
    y: vy,
    width: vw,
    height: vh,
    fill: surface
  }) : null, /*#__PURE__*/React.createElement("g", {
    transform: portrait ? 'translate(0 ' + PL + ') rotate(-90)' : undefined
  }, under, lines), over, crestEls);
}
Object.assign(__ds_scope, { Pitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/pitch/Pitch.jsx", error: String((e && e.message) || e) }); }

// examples/guidelines/ds-base.js
try { (() => {
// Loads this design system into the template. In a consuming project, point
// base at the bound DS folder relative to this file (e.g. '_ds/<folder>' at
// the project root, '../_ds/<folder>' one level down) — one line to edit.
(() => {
  if (window.__psgDsBaseLoaded) return;
  window.__psgDsBaseLoaded = true;
  const base = '../..';
  for (const p of ["fonts/_virage-faces.css", "colors_and_type.css", "styles.css"]) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page (e.g. _ds/<folder> at the project root, ../_ds/<folder> one level down); in a fresh design system this can just mean the bundle is not compiled yet');
  document.head.appendChild(s);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "examples/guidelines/ds-base.js", error: String((e && e.message) || e) }); }

// examples/quarterly-update/ds-base.js
try { (() => {
// Loads this design system into the template. In a consuming project, point
// base at the bound DS folder relative to this file (e.g. '_ds/<folder>' at
// the project root, '../_ds/<folder>' one level down) — one line to edit.
(() => {
  if (window.__psgDsBaseLoaded) return;
  window.__psgDsBaseLoaded = true;
  const base = '../..';
  for (const p of ["fonts/_virage-faces.css", "colors_and_type.css", "styles.css"]) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page (e.g. _ds/<folder> at the project root, ../_ds/<folder> one level down); in a fresh design system this can just mean the bundle is not compiled yet');
  document.head.appendChild(s);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "examples/quarterly-update/ds-base.js", error: String((e && e.message) || e) }); }

// examples/research-hub/demo-data.js
try { (() => {
/* Research Hub — demo data layer.
   Replaces the original Firebase/EmailJS/RSS backends with static in-memory
   sample data so the interfaces can be shown standalone. No network calls,
   nothing is persisted. */
(function () {
  'use strict';

  function daysFromNow(n) {
    var d = new Date();
    d.setDate(d.getDate() + n);
    d.setHours(9, 0, 0, 0);
    return d;
  }
  function iso(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function ts(d) {
    return {
      toDate: function () {
        return d;
      }
    };
  }

  /* ---- Calendar events ---- */
  var events = [{
    id: 'ev1',
    title: 'Monthly research meeting',
    type: 'meeting',
    date: iso(daysFromNow(2)),
    time: '15:00',
    notes: 'Progress round for all ongoing studies.'
  }, {
    id: 'ev2',
    title: 'Abstract deadline — ECSS 2026',
    type: 'deadline',
    date: iso(daysFromNow(9)),
    time: '',
    notes: ''
  }, {
    id: 'ev3',
    title: 'Journal club: hamstring injury prevention',
    type: 'meeting',
    date: iso(daysFromNow(16)),
    time: '17:30',
    notes: ''
  }, {
    id: 'ev4',
    title: 'ECSS Annual Congress',
    type: 'congress',
    date: iso(daysFromNow(28)),
    time: '',
    notes: 'Three posters accepted.'
  }, {
    id: 'ev5',
    title: 'Data collection window — U19 squad',
    type: 'other',
    date: iso(daysFromNow(35)),
    time: '10:00',
    notes: ''
  }, {
    id: 'ev6',
    title: 'Kick-off meeting (past)',
    type: 'meeting',
    date: iso(daysFromNow(-12)),
    time: '15:00',
    notes: ''
  }];

  /* ---- Tip of the week posts ---- */
  var tipPosts = [{
    id: 'tip1',
    title: 'Monitoring load: keep the ratio simple',
    createdAt: ts(daysFromNow(-3)),
    body: 'A quick reminder from this month\u2019s data review: the simplest week-to-week load comparison caught every flagged case that the more complex models did.\n\nBefore adding new metrics, make sure the basic ones are collected consistently \u2014 missing sessions distort every ratio built on top of them.',
    charts: [{
      title: 'Flagged cases detected by method',
      rows: [{
        label: 'Week-to-week %',
        value: '11'
      }, {
        label: 'ACWR (rolling)',
        value: '10'
      }, {
        label: 'EWMA model',
        value: '9'
      }]
    }]
  }, {
    id: 'tip2',
    title: 'Writing abstracts: lead with the finding',
    createdAt: ts(daysFromNow(-10)),
    body: 'Reviewers read dozens of abstracts in a sitting. Put the main result in the first two sentences, then explain how you got it. Background last, not first.',
    charts: []
  }];

  /* ---- PDF library ---- */
  var libEntries = [{
    id: 'lib1',
    title: 'Match running performance in elite youth soccer: a longitudinal analysis',
    authors: 'Rossi M, Bianchi L, Ferrari A',
    journal: 'J Sports Sci',
    year: '2025',
    pmid: '39914821',
    createdAt: ts(daysFromNow(-5))
  }, {
    id: 'lib2',
    title: 'Hamstring strength asymmetry and injury risk in academy players',
    authors: 'Moreau P, Dubois C',
    journal: 'Scand J Med Sci Sports',
    year: '2024',
    pmid: '38804417',
    createdAt: ts(daysFromNow(-20))
  }, {
    id: 'lib3',
    title: 'GPS-derived acceleration profiles across playing positions',
    authors: 'Garcia T, Silva R, Costa V',
    journal: 'Int J Sports Physiol Perform',
    year: '2024',
    pmid: '38215530',
    createdAt: ts(daysFromNow(-41))
  }];

  /* ---- Article feed (replaces the PubMed RSS proxy) ---- */
  function rssDate(n) {
    var d = daysFromNow(-n);
    return d.toISOString().slice(0, 19).replace('T', ' ');
  }
  var rssItems = [{
    title: 'Effects of congested fixture periods on sprint performance in professional soccer',
    link: '#demo-article-1',
    guid: 'demo-1',
    pubDate: rssDate(1),
    description: 'A repeated-measures study across two seasons examining high-speed running output during congested schedules.',
    author: ''
  }, {
    title: 'Nordic hamstring exercise compliance and injury incidence: a multi-club cohort',
    link: '#demo-article-2',
    guid: 'demo-2',
    pubDate: rssDate(2),
    description: 'Prospective cohort across 14 academy squads relating programme compliance to hamstring injury rates.',
    author: ''
  }, {
    title: 'Heat acclimatisation strategies for youth tournaments: a systematic review',
    link: '#demo-article-3',
    guid: 'demo-3',
    pubDate: rssDate(4),
    description: 'Review of 23 studies on acclimatisation protocols for adolescent athletes competing in hot environments.',
    author: ''
  }, {
    title: 'Sleep monitoring in elite adolescent athletes using consumer wearables',
    link: '#demo-article-4',
    guid: 'demo-4',
    pubDate: rssDate(6),
    description: 'Validation of wrist-worn devices against polysomnography in a residential academy setting.',
    author: ''
  }, {
    title: 'Return-to-play criteria after ACL reconstruction in football: expert consensus',
    link: '#demo-article-5',
    guid: 'demo-5',
    pubDate: rssDate(9),
    description: 'Delphi consensus among 41 practitioners on objective criteria for staged return to play.',
    author: ''
  }, {
    title: 'Positional differences in match-play deceleration demands',
    link: '#demo-article-6',
    guid: 'demo-6',
    pubDate: rssDate(12),
    description: 'Analysis of deceleration density by position from 380 professional matches.',
    author: ''
  }];
  window.DEMO_RSS_ITEMS = rssItems;

  /* Intercept the RSS proxy call the pages make and answer with demo items. */
  var origFetch = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function (url, opts) {
    if (typeof url === 'string' && url.indexOf('api.rss2json.com') !== -1) {
      return Promise.resolve({
        ok: true,
        json: function () {
          return Promise.resolve({
            status: 'ok',
            items: rssItems
          });
        }
      });
    }
    return origFetch ? origFetch(url, opts) : Promise.reject(new Error('fetch unavailable'));
  };

  /* ---- Research ideas (admin) ---- */
  var ideas = [{
    id: 'id1',
    title: 'Effect of travel fatigue on training quality after away fixtures',
    submitterName: 'Costanza Gavioli',
    submitterEmail: 'costanza@example.com',
    objective: 'Quantify the impact of travel duration on next-day training output.',
    sample: 'First-team squad, one full season of GPS data.',
    methods: 'Linked travel logs with session GPS metrics; mixed-effects models.',
    links: '',
    notes: '',
    status: 'pending',
    screeningNotes: '',
    createdAt: ts(daysFromNow(-2))
  }, {
    id: 'id2',
    title: 'Screening jump asymmetries as a marker of readiness',
    submitterName: 'Lorenzo Di Girolamo',
    submitterEmail: 'lorenzo@example.com',
    objective: 'Test whether weekly CMJ asymmetry predicts soft-tissue complaints.',
    sample: 'U19 and U17 squads over 6 months.',
    methods: 'Weekly force-plate jumps; survival analysis on complaint onset.',
    links: 'https://example.com/protocol',
    notes: 'Force plates already available.',
    status: 'accepted',
    screeningNotes: 'Strong fit with current priorities.',
    createdAt: ts(daysFromNow(-15)),
    decisionMessage: 'Approved — please align the testing schedule with the S&C staff.',
    meetingProposed: true,
    meetingDate: iso(daysFromNow(7)),
    meetingTime: '14:00'
  }, {
    id: 'id3',
    title: 'Nutrition knowledge questionnaire for academy players',
    submitterName: 'Giorgia Silvestri',
    submitterEmail: 'giorgia@example.com',
    objective: 'Assess baseline nutrition knowledge across age groups.',
    sample: 'All academy age groups.',
    methods: 'Validated questionnaire, cross-sectional design.',
    links: '',
    notes: '',
    status: 'declined',
    screeningNotes: 'Overlaps with an ongoing project.',
    createdAt: ts(daysFromNow(-30)),
    decisionMessage: 'A similar survey is already running this season — let\u2019s revisit next year.',
    meetingProposed: false,
    meetingDate: '',
    meetingTime: ''
  }];

  /* ---- PDF requests (admin) ---- */
  var pdfRequests = [{
    id: 'req1',
    articleTitle: 'Effects of congested fixture periods on sprint performance in professional soccer',
    requesterEmail: 'staff@example.com',
    notes: 'Needed for the next journal club.',
    status: 'pending',
    createdAt: ts(daysFromNow(-1))
  }, {
    id: 'req2',
    articleTitle: 'Positional differences in match-play deceleration demands',
    requesterEmail: 'coach@example.com',
    notes: '',
    status: 'fulfilled',
    pdfLink: 'https://example.com/pdf',
    createdAt: ts(daysFromNow(-8))
  }];

  /* ---- PhD studies per student ---- */
  function study(o) {
    return Object.assign({
      id: 's' + Math.random().toString(36).slice(2, 8),
      title: 'Study',
      open: false,
      objectives: '',
      dataset: {
        name: '',
        link: ''
      },
      dataCollection: {
        status: 'to_start',
        startDate: '',
        notes: ''
      },
      dataAnalysis: {
        status: 'to_start',
        startDate: '',
        notes: ''
      },
      paperWriting: {
        intro: false,
        methods: false,
        results: false,
        discussion: false,
        status: 'not_started'
      },
      submission: {
        status: 'not_submitted',
        journal: '',
        revisionNotes: ''
      },
      presentations: []
    }, o);
  }
  window.DEMO_PHD_STUDIES = {
    parma: [study({
      id: 'st1',
      title: 'Longitudinal monitoring of neuromuscular fatigue',
      published: true,
      open: false,
      objectives: 'Track neuromuscular fatigue markers across a competitive season and relate them to training load.',
      dataset: {
        name: 'Season 24/25 force-plate dataset',
        link: 'https://example.com/dataset'
      },
      dataCollection: {
        status: 'done',
        startDate: '',
        notes: 'Complete for season 24/25.'
      },
      dataAnalysis: {
        status: 'done',
        startDate: '',
        notes: ''
      },
      paperWriting: {
        intro: true,
        methods: true,
        results: true,
        discussion: true,
        status: 'completed'
      },
      submission: {
        status: 'under_review',
        journal: 'Eur J Sport Sci',
        revisionNotes: 'Minor revisions requested.'
      },
      presentations: [{
        congress: 'ECSS Annual Congress',
        year: '2025',
        description: 'Oral presentation of preliminary findings.',
        type: 'oral'
      }]
    }), study({
      id: 'st2',
      title: 'Warm-up duration and sprint readiness',
      open: false,
      objectives: 'Compare short vs standard warm-up protocols on sprint output.',
      dataCollection: {
        status: 'ongoing',
        startDate: '',
        notes: 'Two squads enrolled.'
      },
      dataAnalysis: {
        status: 'to_start',
        startDate: iso(daysFromNow(21)),
        notes: ''
      },
      paperWriting: {
        intro: true,
        methods: false,
        results: false,
        discussion: false,
        status: 'in_progress'
      }
    })],
    foro: [study({
      id: 'st3',
      title: 'Deceleration demands in small-sided games',
      open: false,
      objectives: 'Profile deceleration density across SSG formats.',
      dataCollection: {
        status: 'done',
        startDate: '',
        notes: ''
      },
      dataAnalysis: {
        status: 'ongoing',
        startDate: '',
        notes: 'Mixed models in progress.'
      },
      paperWriting: {
        intro: true,
        methods: true,
        results: false,
        discussion: false,
        status: 'in_progress'
      }
    })],
    valencia: [study({
      id: 'st4',
      title: 'Sleep and recovery in residential academy players',
      open: false,
      objectives: 'Describe sleep patterns and their relation to perceived recovery.',
      dataCollection: {
        status: 'ongoing',
        startDate: '',
        notes: ''
      }
    })],
    verona: [study({
      id: 'st5',
      title: 'Jump asymmetry as a readiness marker',
      open: false,
      objectives: 'Weekly CMJ asymmetry vs soft-tissue complaints.',
      dataCollection: {
        status: 'to_start',
        startDate: iso(daysFromNow(14)),
        notes: 'Awaiting ethics approval.'
      }
    })],
    chieti: [study({
      id: 'st6',
      title: 'Nutrition periodisation around match day',
      open: false,
      objectives: 'Audit energy intake vs expenditure around MD-1 to MD+1.',
      dataCollection: {
        status: 'ongoing',
        startDate: '',
        notes: ''
      },
      dataAnalysis: {
        status: 'to_start',
        startDate: '',
        notes: ''
      }
    })]
  };

  /* ---- Notify helpers ---- */
  function sortEvents() {
    events.sort(function (a, b) {
      return a.date < b.date ? -1 : 1;
    });
  }
  function notifyEvents() {
    sortEvents();
    if (window.onEventsUpdated) window.onEventsUpdated(events.slice());
  }
  function notifyTips() {
    tipPosts.sort(function (a, b) {
      return b.createdAt.toDate() - a.createdAt.toDate();
    });
    if (window.onTipPostsUpdated) window.onTipPostsUpdated(tipPosts.slice());
  }
  function notifyLib() {
    if (window.onLibEntriesUpdated) window.onLibEntriesUpdated(libEntries.slice());
  }
  function notifyIdeas() {
    if (window.onIdeasUpdated) window.onIdeasUpdated(ideas.slice());
  }
  function notifyPdf() {
    if (window.onPdfRequestsUpdated) window.onPdfRequestsUpdated(pdfRequests.slice());
  }

  /* Called where the Firebase bootstrap used to run (end of each page). */
  window.__demoBoot = function () {
    notifyEvents();
    notifyTips();
    notifyLib();
  };

  /* ---- Article ratings (public pages) ---- */
  var ratings = {};
  function seedRating(id) {
    if (ratings[id]) return ratings[id];
    var h = 0;
    for (var i = 0; i < id.length; i++) {
      h = h * 31 + id.charCodeAt(i) >>> 0;
    }
    var count = 3 + h % 9;
    var avg = 3 + (h >>> 4) % 20 / 10; /* 3.0 – 4.9 */
    ratings[id] = {
      sum: Math.round(avg * count),
      count: count
    };
    return ratings[id];
  }
  window.watchArticleRatings = function (id) {
    var r = seedRating(id);
    if (window.onArticleRatingUpdated) window.onArticleRatingUpdated(id, r.sum, r.count);
  };
  window.submitRating = function (id, item, value, previousValue) {
    var r = seedRating(id);
    if (previousValue) {
      r.sum += value - previousValue;
    } else {
      r.sum += value;
      r.count += 1;
    }
    if (window.onArticleRatingUpdated) window.onArticleRatingUpdated(id, r.sum, r.count);
  };

  /* ---- Public form submissions ---- */
  window.submitResearchIdea = function (draft) {
    ideas.unshift({
      id: 'id' + Date.now(),
      title: draft.title || '',
      submitterName: draft.name || '',
      submitterEmail: draft.email || '',
      objective: draft.objective || '',
      sample: draft.sample || '',
      methods: draft.methods || '',
      links: draft.links || '',
      notes: draft.notes || '',
      status: 'pending',
      screeningNotes: '',
      createdAt: ts(new Date())
    });
    setTimeout(function () {
      if (window.onIdeaSubmitted) window.onIdeaSubmitted();
    }, 500);
  };
  window.submitPdfRequest = function (item, email, notes) {
    pdfRequests.unshift({
      id: 'req' + Date.now(),
      articleTitle: item.title || '',
      requesterEmail: email,
      notes: notes || '',
      status: 'pending',
      createdAt: ts(new Date())
    });
  };

  /* ---- Admin bridge (replaces the Firestore listeners/writers) ---- */
  window.startIdeasListener = function () {
    notifyIdeas();
  };
  window.setIdeaStatus = function (id, status) {
    var i = ideas.find(function (x) {
      return x.id === id;
    });
    if (i) {
      i.status = status;
      notifyIdeas();
    }
  };
  window.saveIdeaNote = function (id, val) {
    var i = ideas.find(function (x) {
      return x.id === id;
    });
    if (i) {
      i.screeningNotes = val;
    }
  };
  window.applyDecision = function (id, draft) {
    var i = ideas.find(function (x) {
      return x.id === id;
    });
    if (!i) return;
    i.status = draft.status;
    i.decisionMessage = draft.explain || '';
    i.meetingProposed = !!draft.meeting;
    i.meetingDate = draft.meeting ? draft.date || '' : '';
    i.meetingTime = draft.meeting ? draft.time || '' : '';
    notifyIdeas();
  };
  window.startEventsListener = function () {
    notifyEvents();
  };
  window.saveEvent = function (draft) {
    if (draft.id) {
      var e = events.find(function (x) {
        return x.id === draft.id;
      });
      if (e) {
        e.title = draft.title;
        e.type = draft.type;
        e.date = draft.date;
        e.time = draft.time || '';
        e.notes = draft.notes || '';
      }
    } else {
      events.push({
        id: 'ev' + Date.now(),
        title: draft.title,
        type: draft.type,
        date: draft.date,
        time: draft.time || '',
        notes: draft.notes || ''
      });
    }
    notifyEvents();
  };
  window.deleteEvent = function (id) {
    var i = events.findIndex(function (x) {
      return x.id === id;
    });
    if (i > -1) {
      events.splice(i, 1);
      notifyEvents();
    }
  };
  window.startPdfRequestsListener = function () {
    notifyPdf();
  };
  window.setPdfRequestStatus = function (id, status) {
    var r = pdfRequests.find(function (x) {
      return x.id === id;
    });
    if (r) {
      r.status = status;
      notifyPdf();
    }
  };
  window.sendPdfToRequester = function (id, pdfLink) {
    var r = pdfRequests.find(function (x) {
      return x.id === id;
    });
    if (r) {
      r.status = 'fulfilled';
      r.pdfLink = pdfLink;
      notifyPdf();
    }
  };
  window.startLibraryListener = function () {
    notifyLib();
  };
  window.saveLibEntry = function (id, payload) {
    if (id) {
      var e = libEntries.find(function (x) {
        return x.id === id;
      });
      if (e) Object.assign(e, payload);
    } else {
      libEntries.unshift(Object.assign({
        id: 'lib' + Date.now(),
        createdAt: ts(new Date())
      }, payload));
    }
    notifyLib();
  };
  window.deleteLibEntry = function (id) {
    var i = libEntries.findIndex(function (x) {
      return x.id === id;
    });
    if (i > -1) {
      libEntries.splice(i, 1);
      notifyLib();
    }
  };
  window.startTipPostsListener = function () {
    notifyTips();
  };
  window.saveTipPost = function (id, payload) {
    if (id) {
      var p = tipPosts.find(function (x) {
        return x.id === id;
      });
      if (p) Object.assign(p, payload);
    } else {
      tipPosts.unshift(Object.assign({
        id: 'tip' + Date.now(),
        createdAt: ts(new Date())
      }, payload));
    }
    notifyTips();
  };
  window.deleteTipPost = function (id) {
    var i = tipPosts.findIndex(function (x) {
      return x.id === id;
    });
    if (i > -1) {
      tipPosts.splice(i, 1);
      notifyTips();
    }
  };
  window.startPhdListener = function (studentId) {
    var data = (window.DEMO_PHD_STUDIES[studentId] || []).slice();
    if (window.onPhdStudiesUpdated) window.onPhdStudiesUpdated(data);
  };
  window.startAllPhdListeners = function () {
    Object.keys(window.DEMO_PHD_STUDIES).forEach(function (id) {
      if (window.onPhdAllDataUpdated) window.onPhdAllDataUpdated(id, (window.DEMO_PHD_STUDIES[id] || []).slice());
    });
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "examples/research-hub/demo-data.js", error: String((e && e.message) || e) }); }

// examples/roles/ds-base.js
try { (() => {
// Loads this design system into the template. In a consuming project, point
// base at the bound DS folder relative to this file (e.g. '_ds/<folder>' at
// the project root, '../_ds/<folder>' one level down) — one line to edit.
(() => {
  if (window.__psgDsBaseLoaded) return;
  window.__psgDsBaseLoaded = true;
  const base = '../..';
  for (const p of ["fonts/_virage-faces.css", "colors_and_type.css", "styles.css"]) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page (e.g. _ds/<folder> at the project root, ../_ds/<folder> one level down); in a fresh design system this can just mean the bundle is not compiled yet');
  document.head.appendChild(s);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "examples/roles/ds-base.js", error: String((e && e.message) || e) }); }

// hero-tweaks.jsx
try { (() => {
// Hero background tweaks — the colossal crest watermark (the baked default,
// with fade edges off) PLUS four pattern alternatives derived from ONE SIDE
// of the Eiffel-tower arch in the crest.
// Loads after tweaks-panel.jsx. Writes CSS vars onto .hero and injects SVG
// into .hero .ds-hero-pattern; base rules in index.html read the vars.

const HERO_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bgMode": "Crest watermark",
  "patColor": "#FFFFFF",
  "patOpacity": 0.16,
  "patStroke": 1.1,
  "patScale": 100,
  "patFade": 55,
  "patAccent": true,
  "patCount": 6,
  "patGap": 12,
  "patX": 84,
  "patY": -60,
  "patDensity": 105,
  "wmShow": true,
  "wmZoom": 300,
  "wmX": 75,
  "wmY": 100,
  "wmOpacity": 0.06,
  "wmRotate": 0,
  "wmFlip": false,
  "wmMask": false,
  "wmMaskInner": 38,
  "wmMaskOuter": 35
} /*EDITMODE-END*/;

// ── The arch ────────────────────────────────────────────────────────────────
// One side of the Eiffel tower lifted verbatim from the crest silhouette
// (assets/psg-watermark.svg), normalised to apex (0,0) → foot (±48.24, 100):
// near-vertical at the apex, the classic exponential flare at the foot.
const PSG_GOLD = '#CEAB5D';
const HP_W = 1440,
  HP_H = 560; // hero pattern viewBox

function eiffelSide(x, y, h, sign) {
  const s = h / 100,
    k = (sign || 1) * s;
  const n = v => +v.toFixed(2);
  return 'M' + n(x) + ',' + n(y) + 'c' + n(0.45 * k) + ',' + n(24.5 * s) + ' ' + n(6.43 * k) + ',' + n(45.5 * s) + ' ' + n(16.56 * k) + ',' + n(63.3 * s) + 'l' + n(1.48 * k) + ',' + n(2.5 * s) + 'c' + n(7.94 * k) + ',' + n(13.2 * s) + ' ' + n(18.2 * k) + ',' + n(24.6 * s) + ' ' + n(30.21 * k) + ',' + n(34.2 * s);
}
function accentColor(t) {
  return t.patColor === PSG_GOLD ? '#FFFFFF' : PSG_GOLD;
}

// ── Pattern builders (each returns inner SVG markup) ───────────────────────

// Contour echo: one side of the arch, echoed at growing scale from a shared
// apex — a fan that converges above the band and spreads as it falls.
function buildContour(t) {
  const ax = HP_W * t.patX / 100,
    ay = HP_H * t.patY / 100;
  const h0 = HP_H * 2.4 * t.patScale / 100;
  let paths = '';
  for (let i = 0; i < t.patCount; i++) {
    const h = h0 * (1 + i * t.patGap / 100);
    const frac = t.patCount > 1 ? i / (t.patCount - 1) : 0;
    const o = Math.max(0.04, 1 - frac * 0.9 * (t.patFade / 100));
    const gold = t.patAccent && i === 1;
    paths += '<path d="' + eiffelSide(ax, ay, h, -1) + '" stroke="' + (gold ? accentColor(t) : t.patColor) + '" stroke-opacity="' + (gold ? Math.min(1, o * 1.6) : o).toFixed(3) + '" vector-effect="non-scaling-stroke"/>';
  }
  return '<g fill="none" stroke-width="' + t.patStroke + '">' + paths + '</g>';
}

// Sweep: one colossal gesture — a tight ribbon of three arch lines fading
// in from the top edge and out toward the foot.
function buildSweep(t) {
  const ax = HP_W * t.patX / 100,
    ay = HP_H * t.patY / 100;
  const h0 = HP_H * 2.8 * t.patScale / 100;
  const endO = Math.max(0, 1 - t.patFade / 100).toFixed(2);
  const grad = (id, c) => '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="' + HP_H + '" gradientUnits="userSpaceOnUse">' + '<stop offset="0" stop-color="' + c + '" stop-opacity="0.2"/>' + '<stop offset="0.45" stop-color="' + c + '" stop-opacity="1"/>' + '<stop offset="1" stop-color="' + c + '" stop-opacity="' + endO + '"/></linearGradient>';
  let paths = '';
  [1, 1.075, 1.15].forEach((f, i) => {
    const gold = t.patAccent && i === 1;
    paths += '<path d="' + eiffelSide(ax, ay, h0 * f, -1) + '" stroke="url(#' + (gold ? 'hp-sg-a' : 'hp-sg') + ')" vector-effect="non-scaling-stroke"/>';
  });
  return '<defs>' + grad('hp-sg', t.patColor) + grad('hp-sg-a', accentColor(t)) + '</defs>' + '<g fill="none" stroke-width="' + t.patStroke + '">' + paths + '</g>';
}

// Arcade: the side mirrored into full silhouettes, a colonnade rising from
// the band's lower edge and fading upward.
function buildArcade(t) {
  const h = HP_H * 0.62 * t.patScale / 100;
  const yTop = HP_H - h;
  const fw = 0.4824 * h;
  const step = 2 * fw * t.patDensity / 100;
  const phase = ((t.patX - 50) / 100 * step % step + step) % step;
  let paths = '',
    best = null;
  const xs = [];
  for (let cx = phase - Math.ceil((phase + fw) / step) * step; cx < HP_W + fw; cx += step) xs.push(cx);
  xs.forEach(cx => {
    if (best === null || Math.abs(cx - HP_W * 0.7) < Math.abs(best - HP_W * 0.7)) best = cx;
  });
  xs.forEach(cx => {
    const gold = t.patAccent && cx === best;
    paths += '<path d="' + eiffelSide(cx, yTop, h, 1) + eiffelSide(cx, yTop, h, -1) + '" stroke="' + (gold ? accentColor(t) : t.patColor) + '"' + (gold ? ' stroke-opacity="1"' : ' stroke-opacity="0.85"') + ' vector-effect="non-scaling-stroke"/>';
  });
  return '<defs><linearGradient id="hp-am" x1="0" y1="' + HP_H + '" x2="0" y2="' + Math.max(0, yTop).toFixed(1) + '" gradientUnits="userSpaceOnUse">' + '<stop offset="0" stop-color="#fff" stop-opacity="1"/>' + '<stop offset="1" stop-color="#fff" stop-opacity="' + Math.max(0, 1 - t.patFade / 100).toFixed(2) + '"/></linearGradient>' + '<mask id="hp-amask"><rect x="0" y="0" width="' + HP_W + '" height="' + HP_H + '" fill="url(#hp-am)"/></mask></defs>' + '<g fill="none" stroke-width="' + t.patStroke + '" mask="url(#hp-amask)">' + paths + '</g>';
}

// Lattice: the side and its mirror crossing in a seamless tile — the tower's
// ironwork read as a fine weave, fading along the diagonal.
function buildLattice(t) {
  const T = +(90 * t.patScale / 100).toFixed(2);
  const a = eiffelSide(0.26 * T, 0, T, 1);
  const b = eiffelSide(0.74 * T, 0, T, -1);
  return '<defs><pattern id="hp-tile" width="' + T + '" height="' + T + '" patternUnits="userSpaceOnUse">' + '<path d="' + a + b + '" fill="none" stroke="' + t.patColor + '" stroke-width="' + t.patStroke + '"/></pattern>' + '<linearGradient id="hp-lg" x1="' + HP_W + '" y1="0" x2="0" y2="' + HP_H + '" gradientUnits="userSpaceOnUse">' + '<stop offset="0" stop-color="#fff" stop-opacity="1"/>' + '<stop offset="1" stop-color="#fff" stop-opacity="' + Math.max(0, 1 - t.patFade / 100).toFixed(2) + '"/></linearGradient>' + '<mask id="hp-lmask"><rect x="0" y="0" width="' + HP_W + '" height="' + HP_H + '" fill="url(#hp-lg)"/></mask></defs>' + '<rect x="0" y="0" width="' + HP_W + '" height="' + HP_H + '" fill="url(#hp-tile)" mask="url(#hp-lmask)"/>';
}
const HP_BUILDERS = {
  'Contour echo': buildContour,
  'Sweep': buildSweep,
  'Arcade': buildArcade,
  'Lattice': buildLattice
};

// Keep each composition pinned to its anchor edge when the hero's aspect
// ratio differs from the viewBox: arch feet stay on the bottom edge,
// contour/sweep apexes stay in the top-right.
const HP_ASPECT = {
  'Contour echo': 'xMaxYMin slice',
  'Sweep': 'xMaxYMin slice',
  'Arcade': 'xMidYMax slice',
  'Lattice': 'xMinYMin slice'
};
function buildPatternSvg(t) {
  const builder = HP_BUILDERS[t.bgMode];
  if (!builder) return '';
  return '<svg viewBox="0 0 ' + HP_W + ' ' + HP_H + '" preserveAspectRatio="' + (HP_ASPECT[t.bgMode] || 'xMidYMid slice') + '" style="opacity:' + t.patOpacity + '">' + builder(t) + '</svg>';
}

// ── Panel ───────────────────────────────────────────────────────────────────

function HeroBackgroundTweaks() {
  const [t, setTweak] = useTweaks(HERO_TWEAK_DEFAULTS);
  const isPattern = !!HP_BUILDERS[t.bgMode];
  const isCrest = t.bgMode === 'Crest watermark';
  React.useEffect(() => {
    const hero = document.querySelector('.hero');
    const mark = document.querySelector('.hero .ds-hero-mark');
    const layer = document.querySelector('.hero .ds-hero-pattern');
    if (!hero || !mark || !layer) return;
    hero.style.setProperty('--wm-zoom', t.wmZoom + '%');
    hero.style.setProperty('--wm-x', t.wmX + '%');
    hero.style.setProperty('--wm-y', t.wmY + '%');
    hero.style.setProperty('--hero-mark-opacity', String(t.wmOpacity));
    hero.style.setProperty('--wm-rotate', t.wmRotate + 'deg');
    hero.style.setProperty('--wm-flip', t.wmFlip ? '-1' : '1');
    hero.style.setProperty('--wm-mask-inner', t.wmMaskInner + '%');
    hero.style.setProperty('--wm-mask-outer', t.wmMaskOuter + '%');
    mark.style.display = isCrest && t.wmShow ? '' : 'none';
    if (t.wmMask) {
      mark.style.webkitMaskImage = '';
      mark.style.maskImage = '';
    } else {
      mark.style.webkitMaskImage = 'none';
      mark.style.maskImage = 'none';
    }
    layer.innerHTML = isPattern ? buildPatternSvg(t) : '';
  }, [t]);
  return /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Hero background"
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Treatment",
    value: t.bgMode,
    options: ['Crest watermark', 'Contour echo', 'Sweep', 'Arcade', 'Lattice', 'None'],
    onChange: v => setTweak('bgMode', v)
  }), isPattern && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Line colour",
    value: t.patColor,
    options: ['#FFFFFF', '#CEAB5D', '#10569F', '#E30613'],
    onChange: v => setTweak('patColor', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Opacity",
    value: t.patOpacity,
    min: 0.02,
    max: 0.6,
    step: 0.01,
    onChange: v => setTweak('patOpacity', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Line weight",
    value: t.patStroke,
    min: 0.5,
    max: 3,
    step: 0.1,
    unit: "px",
    onChange: v => setTweak('patStroke', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Scale",
    value: t.patScale,
    min: 40,
    max: 220,
    step: 5,
    unit: "%",
    onChange: v => setTweak('patScale', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Fade",
    value: t.patFade,
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
    onChange: v => setTweak('patFade', v)
  }), t.bgMode !== 'Lattice' && /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Gilded line",
    value: t.patAccent,
    onChange: v => setTweak('patAccent', v)
  }), t.bgMode === 'Contour echo' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Echoes"
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Count",
    value: t.patCount,
    min: 2,
    max: 12,
    step: 1,
    onChange: v => setTweak('patCount', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Spread",
    value: t.patGap,
    min: 4,
    max: 30,
    step: 1,
    unit: "%",
    onChange: v => setTweak('patGap', v)
  })), t.bgMode === 'Arcade' && /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Spacing",
    value: t.patDensity,
    min: 70,
    max: 200,
    step: 5,
    unit: "%",
    onChange: v => setTweak('patDensity', v)
  }), (t.bgMode === 'Contour echo' || t.bgMode === 'Sweep' || t.bgMode === 'Arcade') && /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Horizontal",
    value: t.patX,
    min: -20,
    max: 140,
    step: 1,
    unit: "%",
    onChange: v => setTweak('patX', v)
  }), (t.bgMode === 'Contour echo' || t.bgMode === 'Sweep') && /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Vertical",
    value: t.patY,
    min: -140,
    max: 40,
    step: 1,
    unit: "%",
    onChange: v => setTweak('patY', v)
  })), isCrest && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Watermark"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Show watermark",
    value: t.wmShow,
    onChange: v => setTweak('wmShow', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Size",
    value: t.wmZoom,
    min: 100,
    max: 700,
    step: 5,
    unit: "%",
    onChange: v => setTweak('wmZoom', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Opacity",
    value: t.wmOpacity,
    min: 0.02,
    max: 0.5,
    step: 0.01,
    onChange: v => setTweak('wmOpacity', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Placement"
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Horizontal",
    value: t.wmX,
    min: -50,
    max: 150,
    step: 1,
    unit: "%",
    onChange: v => setTweak('wmX', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Vertical",
    value: t.wmY,
    min: -50,
    max: 200,
    step: 1,
    unit: "%",
    onChange: v => setTweak('wmY', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Rotation",
    value: t.wmRotate,
    min: -180,
    max: 180,
    step: 1,
    unit: "\xB0",
    onChange: v => setTweak('wmRotate', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Flip horizontal",
    value: t.wmFlip,
    onChange: v => setTweak('wmFlip', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Radial fade"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Fade edges",
    value: t.wmMask,
    onChange: v => setTweak('wmMask', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Solid core",
    value: t.wmMaskInner,
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
    onChange: v => setTweak('wmMaskInner', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Fade end",
    value: t.wmMaskOuter,
    min: 0,
    max: 150,
    step: 1,
    unit: "%",
    onChange: v => setTweak('wmMaskOuter', v)
  })));
}

// Debug hook: lets tooling preview a mode without touching persisted tweaks.
window.__hpPreview = over => {
  const t = Object.assign({}, HERO_TWEAK_DEFAULTS, over || {});
  const mark = document.querySelector('.hero .ds-hero-mark');
  const layer = document.querySelector('.hero .ds-hero-pattern');
  if (mark) mark.style.display = t.bgMode === 'Crest watermark' ? '' : 'none';
  if (layer) layer.innerHTML = buildPatternSvg(t);
};
(function () {
  const mount = document.createElement('div');
  document.body.appendChild(mount);
  ReactDOM.createRoot(mount).render(/*#__PURE__*/React.createElement(HeroBackgroundTweaks, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "hero-tweaks.jsx", error: String((e && e.message) || e) }); }

// tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Pitch = __ds_scope.Pitch;

})();
