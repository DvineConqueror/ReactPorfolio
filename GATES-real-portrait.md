# Gates: Real portrait and unobtrusive color control

OWNS: src/components/InteractivePortrait.tsx, src/index.css, src/assets/portrait/real-*, src/domain/portrait.test.ts, STATUS.md, PRODUCT.md

- [x] G1: Supplied real photo replaces portrait, generated poses preserve identity and smooth cursor tracking, touch/reduced motion use original
  EVIDENCE: Chromium production preview verified atlas loading, left/right columns 1/5, color filter toggle, reduced-motion original photo fallback and retained seasonal overlay. At 390px no horizontal overflow, 120px portrait and transparent 44px toggle. At 320px stacked portrait 150px fits; existing flexible Turnstile minimum leaves 5px page overflow. Desktop screenshot output/playwright/real-portrait-desktop.jpg; mobile output/playwright/real-portrait-mobile.jpg.
- [x] G2: Color control has no solid tile, retains accessible hit target, and larger portrait fits desktop/mobile with seasonal decorations
  EVIDENCE: Chromium production preview verified atlas loading, left/right columns 1/5, color filter toggle, reduced-motion original photo fallback and retained seasonal overlay. At 390px no horizontal overflow, 120px portrait and transparent 44px toggle. At 320px stacked portrait 150px fits; existing flexible Turnstile minimum leaves 5px page overflow. Desktop screenshot output/playwright/real-portrait-desktop.jpg; mobile output/playwright/real-portrait-mobile.jpg.
- [x] G3: Project checks and browser verification pass
  CHECK: npm run check
  EXPECT: Private résumé build verification passed
  EVIDENCE: PowerShell; cwd=C:/Users/domin/Coding/Portfolio/ReactPorfolio; npm run check exit=0; EXPECT matched; lint and both typechecks pass; 50 tests pass; production build/private resume guard pass; SHA256=3583E2628881B735895C0749315C5E2ECB7ED86A6212E996624D896B7C5A7FD0; git diff --check exit=0.
