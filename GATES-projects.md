# Gates: Expanded portfolio projects

OWNS: project content, project presentation/dialog, imported project images, related styles and documentation

- [x] G1: Four featured/four other projects use verified facts, assets and source links
  EVIDENCE: Verified portfolio.test.ts and source review: featured BayanTrack/AnchorWatch/AIO Converter/GPOS; other Lurk/RaceConnect/SmartDTR/Typeroo. All supplied assets copied intact under src/assets/projects; existing AnchorWatch reused. Verified links match supplied repositories; unknown metadata omitted.

- [x] G2: Project checks pass including protected résumé build guard
  CHECK: npm run check
  EXPECT: Private résumé build verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=efa668e0ce4d/78 entries; EXPECT=matched; output-sha256=569e1a174d3718b015e9ba90c9c57b5a1b346623eac233e34d27feb1092de2af; output-bytes=3259

- [x] G3: Desktop/tablet/mobile project dialogs, galleries, focus/scroll restoration, themes and reduced motion verified
  EVIDENCE: Playwright Chromium passed all eight project flows at 390x844, 768x1024 and 1440x900, including gallery navigation, no upscaling/cropping, mobile viewport/close access, native background inertness, Escape/focus restoration, actual wheel background lock, theme and reduced motion. Evidence: output/playwright/expanded-projects-evidence.json and output/projects-verification.md.

- [x] G4: Certificate, résumé entry and contact validation regressions checked without external submissions
  EVIDENCE: Both certificate previews/original links passed; both resume intents open protected gate; empty contact shows four local errors. API request counter remained zero and uncaught browser errors zero. Turnstile/API traffic intercepted; no live verification or messages sent.

- [x] G5: Desktop/mobile visual inspection and one detector pass completed; findings resolved or explained
  EVIDENCE: Inspected desktop/mobile projects and dialog screenshots in one batched round and confirmed dark/phone/desktop details. Scoped Impeccable detector returned [] in output/project-detector.json. No implementation defects identified; bounded confirmation complete.
