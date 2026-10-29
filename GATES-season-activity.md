# Gates: Seasonal atmosphere and GitHub activity

OWNS: src/components/SeasonalArt.tsx, src/seasonal.css, src/domain/season*, src/domain/contributions*, src/components/GitHubActivity*, src/hooks/useContributions.ts, worker/contributions*, worker/index.ts, src/App.tsx, src/components/SiteHeader.tsx, STATUS.md, PRODUCT.md, DESIGN.md

- [x] G1: Shared chat status and recent changes are carried into STATUS.md with historical evidence distinguished from current checks
  EVIDENCE: Shared chat read in IAB; STATUS.md records redesign, eight projects, portrait, theme reveal, seasonal changes and prior unverified gates separately from current results.
- [x] G2: Halloween light stays readable with dimmer colors, side webs, descending/ascending spiders and intermittent lightning; Christmas has faster denser snow
  EVIDENCE: Production screenshots in output/playwright/season-update-halloween-light-desktop.jpg and season-update-halloween-dark-desktop.jpg; mobile Halloween and Christmas screenshots. Computed Halloween light bg rgb(232,223,210), ink rgb(48,37,53); two spiders with 14s/19s transform cycles, two streak SVGs in 17s opacity cycle. Browser measured 96 desktop/48 mobile flakes with 4s–8s durations. Mobile spiders fit the 14px gutters; no intercepted input.
- [x] G3: Real GitHub calendar, recent graph, totals and streaks render with honest ranges; unavailable data has retry and profile link
  EVIDENCE: Live /api/contributions HTTP 200 application/json; 369 days 2025-10-26–2026-10-29, total 1169. Production UI: 369 cells, 30 bars, 4-day current/14-day longest/334 recent contributions. Failure state observed before Worker startup, retry restored data. Daily-count disclosure opens. Screenshots season-update-activity-desktop.jpg and season-update-activity-mobile.jpg.
- [x] G4: Parsing, calendar arithmetic, upstream failures, seasonal markup and project regression checks pass
  CHECK: npm run check
  EXPECT: Private résumé build verification passed
  EVIDENCE: Direct npm run check, exit=0, shell=PowerShell, cwd=C:/Users/domin/Coding/Portfolio/ReactPorfolio; EXPECT matched; lint and both typechecks passed, 49 tests in 7 files passed, production build and private resume guard passed. Output SHA256=9ce598eeb3f25086dbf56029e1ebb242338397b59b455c9646eb5227127995f6; output=output/season-activity-check.txt. Worker deploy --dry-run also exited 0; git diff --check exited 0.
- [x] G5: Desktop/mobile, both palettes, Off cleanup, motion controls and reduced motion verified in browser
  EVIDENCE: IAB Chromium checks at 320x800,390x844,768x1024,1024x768,1440x900 plus default 1280x720; no horizontal overflow. Halloween/Christmas light/dark and Off verified; Off has zero weather/stage/lights/portrait ornaments. Switch pauses both spiders and hides lightning. Emulated reduced motion: no visible snow, lightning display:none, spider animation:none and disabled switch with explanation. Mobile navigation/picker and daily table operated; production reload preserves Halloween/light. Production CSP retained; no app/CSP errors observed, only existing local Turnstile hostname warning. Device emulation reset. Real-device Safari/live Turnstile remain untested.
