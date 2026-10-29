# Gates: Deployed portrait and favicon

OWNS: src/components/InteractivePortrait.tsx, src/domain/portrait.ts, src/domain/portrait.test.ts, src/index.css, public/favicon.svg, index.html, DESIGN.md, GATES-deployed-portrait.md

Scope: Diagnose deployed cursor tracking, smooth portrait pose changes and replace favicon with a monochrome monogram. Windows animations were confirmed disabled; preserve reduced-motion behavior.

- [x] G1: Project quality checks and protected build pass
  CHECK: npm run check
  EXPECT: Private résumé build verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=92e990666ea0/78 entries; EXPECT=matched; output-sha256=a39914fcc59e0ddf9696462ec180d1b5da4284df05996ef7bac86c1b5c7af0f1; output-bytes=2715

- [x] G2: Browser checks verify intermediate head angles, interruptible cursor following and reduced-motion behavior
  EVIDENCE: Local production Worker at :8789 in installed Brave passed 11 browser assertions: intermediate angles trace 0,1,2,3,4,5; interruptible reversal; vertical/diagonal targets; neutral return; one opaque frame; reduced-motion static original; mobile fit. Evidence: output/playwright/natural-portrait-production-check.js and natural-portrait-desktop.png / natural-portrait-mobile.png. Live Chromium/Brave tracking also confirmed; Windows SPI_GETCLIENTAREAANIMATION=false explains manual reduced-motion behavior.

- [x] G3: New favicon renders and page references its fresh URL
  EVIDENCE: Production browser assertion confirms /favicon.svg?v=ha-2 loads successfully. Visually inspected output/playwright/favicon-ha-preview.png at 16px, 32px and 64px; monochrome ha. mark is intact.
