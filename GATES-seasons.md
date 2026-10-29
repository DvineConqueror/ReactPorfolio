# Gates: Seasonal modes

OWNS: seasonal state/picker/art/styles, app/header integration, theme settling, focused tests and documentation

- [x] G1: Independent persisted Off/Halloween/Christmas controls work on desktop and mobile with native/fallback dismissal
  EVIDENCE: Main Brave run passed native keyboard/outside dismissal, Escape/focus restoration, separate preference persistence, Popover fallback and blocked-storage behavior. Production run confirmed adjacent buttons, viewport fit, selected/current-option behavior and System changes. Evidence: output/playwright/seasons-evidence.json (109 checks) and seasons-production-evidence.json (17 checks).

- [x] G2: Original pixel folk-art, adaptive light/dark accents and clear seasonal scene satisfy the approved composition
  EVIDENCE: Original inline SVG art includes all requested figures and ornament types, with 112px desktop/tablet and 80px phone scenes, light/dark accent variants, pointer-transparent edges and no horizontal overflow across six palette-season combinations. Desktop/mobile captures inspected together; imagery/document content unchanged.

- [x] G3: Motion pause/reduction, bounded snow, rapid changes, theme settling and Off cleanup verified
  EVIDENCE: Verified manual/device/visibility/dialog/theme-snapshot pauses, 32/16 visible flakes and approved durations, no duplicate particles on resume, immediate keyboard changes, latest season after rapid choices, pending theme palette settlement and zero seasonal animation objects/art after Off. Main evidence records all cases.

- [x] G4: Project checks and protected résumé build guard pass
  CHECK: npm run check
  EXPECT: Private résumé build verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=efa668e0ce4d/78 entries; EXPECT=matched; output-sha256=bb03b3f75914b5218eac60d4c8918f0c36661a1ae8e7e15e39468ca38afcf6c3; output-bytes=3259

- [x] G5: Three viewport sizes/six palette-season combinations, overlays, production CSP and one bounded visual/detector pass verified
  EVIDENCE: Three viewport/six palette-season checks passed. Production Worker CSP unchanged; certificate and resume readers pause snow, protected delivery remains gated, contact validates locally and mobile navigation still works. One scoped detector returned [] in output/season-detector.json. Batched visual review and bounded confirmation complete; details/limits in output/seasons-verification.md.
