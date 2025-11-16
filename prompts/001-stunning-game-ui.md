<objective>
Design and implement a visually jaw-dropping HTML/CSS/JS experience that makes the traitors game irresistible to play by showcasing premium aesthetics, motion, and polish.
</objective>

<context>
- Review @CLAUDE.md to align with project conventions before touching any files.
- This is a browser-based game landing/entry experience; the goal is to spark excitement, convey mystery, and convert visitors into players.
- Prioritize iconography, typography, and the overall look & feel so the interface feels modern, cinematic, and high-end.
</context>

<requirements>
1. Build a hero-focused layout with immersive background layers, bold headline, CTA, social proof, and teaser for gameplay mechanics.
2. Incorporate an icon grid or feature list that leans on bespoke iconography and typographic hierarchy to explain game roles/mechanics.
3. Add interactive sections (e.g., hoverable cards, parallax panels, animated stats) that respond to cursor/touch input.
4. Implement a curated typography stack (display + supporting font) and consistent spacing scale; explain choices within inline comments only when absolutely necessary.
5. Use SVG/icon fonts for scalable icons and ensure they blend with the overall art direction.
6. Deliver buttery-smooth animations/micro-interactions (e.g., CSS transitions, keyframes, scroll reveals) while respecting performance.
7. Ensure full responsiveness from 320px up, with layout shifts, typography scaling, and touch targets tuned for mobile.
8. Go beyond the basics: layer gradients, glassmorphism, neon glows, or other tasteful effects without overwhelming usability.
</requirements>

<implementation>
- Use semantic HTML with ARIA where needed; structure sections for hero, features/icons, gameplay teaser, community/testimonials, and footer.
- Favor modern CSS (custom properties, clamp(), container queries if supported) to manage theming, spacing, and typography.
- Centralize color palette, shadows, and motion tokens so future tweaks are simple.
- Keep JavaScript modular; encapsulate animations/interactive behaviors (e.g., requestAnimationFrame loops, IntersectionObserver) to avoid global leaks.
- Never rely on external UI frameworks unless already present; work within vanilla HTML/CSS/JS to maintain control over visuals.
- Explain "why" for any hard constraints: e.g., limit animation duration for accessibility, throttle scroll events for performance.
</implementation>

<output>
Create or update files with these deliverables:
- `./index.html` – semantic markup for the full experience, referencing the stylesheet and script.
- `./styles/main.css` – comprehensive styling system covering layout, typography, icons, animations, responsive adjustments.
- `./scripts/main.js` – interactive behaviors (hover states, parallax, animation orchestration, responsive nav toggles, etc.).
</output>

<verification>
Before finishing:
1. Validate layout across desktop (~1440px), tablet (~768px), and mobile (~375px) breakpoints.
2. Test key interactions (hover/tap animations, parallax, CTA focus states) in at least one modern Chromium-based browser.
3. Run any available formatters/linters defined in the repo; ensure console is free of errors.
</verification>

<success_criteria>
- Page instantly communicates a premium, mysterious game vibe and encourages users to play.
- Typography/iconography feel curated and cohesive, with obvious hierarchy.
- Animations are smooth, performant, and enhance—never hinder—usability.
- Experience remains fully responsive and interactive across devices.
- Code is clean, maintainable, and aligned with project conventions from CLAUDE.md.
</success_criteria>


<!-- Completed 2025-11-16T06:10:56.547144+00:00 | Landing page, CSS system, and interactions implemented. -->
