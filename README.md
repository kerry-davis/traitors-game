# Traitors — Social Deduction PWA

This repository now hosts a single-page Progressive Web App that runs purely in the browser using HTML, CSS, and JavaScript. The UI is bundled directly into `index.html` via CDN-hosted React and Babel, so no build step is required.

## Key files

- `index.html` – contains the entire app, theme styling, inline JSX/React logic, and registers the service worker.
- `sw.js` – caches the shell assets (`index.html`, icons) so the experience works offline.
- `manifest.json` and the SVG icons – define the metadata that lets the browser install the app.
- `metadata.json` – documents the story behind the app for any external tooling that consumes it.

## Running the app

1. Host the directory on any static server, or simply open `index.html` in a modern browser.
2. The app handles its own theming, game logic, and service-worker registration automatically.
3. Install it as a PWA via the browser’s install prompt once the manifest and service worker are active.

No `npm` install or build step is required because the app ships as plain HTML/CSS/JS.
