PSG Performance Workspace — deployable build
=============================================

This folder is a complete static website. It needs no build step.

WHAT'S HERE
  index.html          Entry point (open this at the site root)
  hub-*.jsx / *.js    The app (transpiled in the browser by hub-loader.js)
  hub.css             App chrome styling
  _ds/                PSG Performance design system (fonts, styles, components)
  assets/             Crest + watermark SVGs

HOW TO HOST IT
  Must be served over http(s), NOT opened as a file:// path
  (the app fetches its own source files, which browsers block on file://).

  Easiest — Netlify (free, works with a private repo):
    1. netlify.com -> sign up
    2. "Add new site" -> "Deploy manually" -> drag this whole folder in
    3. You get a live URL immediately.

  Or connect a GitHub repo (Netlify / Vercel / Cloudflare Pages):
    - Push these files to your repo (no build command, publish directory = root)
    - The service auto-deploys on every push.

  GitHub Pages: works only on a PUBLIC repo for free accounts;
  private-repo Pages needs a paid plan. Use Netlify/Vercel/Cloudflare for
  free private hosting.

IMPORTANT
  - A private *repo* only hides source code. The live site is public to anyone
    with the link. Access control comes from Firebase (Auth + Firestore rules).
  - Live data uses the existing Firebase project (phd-tracker-22d93). Lock down
    your Firestore security rules before sharing the link widely.
  - The "Preview as" role picker on sign-in is still the mock from the prototype.
