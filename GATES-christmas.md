# Gates: Christmas characters and aurora

OWNS: src/components/SeasonalArt.tsx, src/seasonal.css, src/domain/season.test.ts, STATUS.md, DESIGN.md, PRODUCT.md

- [x] G1: Christmas includes snowman, Santa, elves, reindeer, gifts and top mistletoe, visible at desktop and phone sizes
  EVIDENCE: Production IAB screenshots at 1280x720 and 390x844; measured all five character groups inside viewport at 320px and 390px. Snowman/reindeer/Santa/two elves, cabin/tree/presents and two top mistletoe SVGs visible. Phone greenery top75/bottom107 stays below header with pointer-events:none; no horizontal overflow. Screenshots output/playwright/christmas-aurora-desktop.jpg and christmas-aurora-mobile.jpg.
- [x] G2: Aurora fades in/out over dark Christmas background only, respects pause and reduced motion, and does not block content
  EVIDENCE: Dark Christmas computed display:block, season-aurora animation duration28s; observed opacity .314399 then .48, visible green/violet ribbons behind text with z-index:-1. Light computed display:none. Pause switch and emulated reduced motion computed animation:none/opacity.22; high contrast computed display:none. Off removes both aurora and top greenery. Device/viewport overrides reset.
- [x] G3: Project checks pass and production browser screenshots confirm light/dark Christmas and seasonal cleanup
  CHECK: npm run check
  EXPECT: Private résumé build verification passed
  EVIDENCE: npm run check exit=0 in PowerShell, cwd=C:/Users/domin/Coding/Portfolio/ReactPorfolio; EXPECT matched. Lint, frontend/Worker types, 50 tests in 7 files, production build and private resume guard passed. Output output/christmas-check.txt SHA256=4185399ee41b5db41e07c9afbadb5946a8506ca0108ed606ad78d148a655bf15. git diff --check exit0. Production browser screenshot confirms new scene and aurora; light/dark and Off cleanup verified through UI. No deployment; real-device Safari untested.
