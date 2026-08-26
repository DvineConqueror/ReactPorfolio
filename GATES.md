# Gates: portfolio refresh

OWNS: src/main.tsx, src/components/SiteHeader.tsx, src/features/contact/ContactForm.tsx, src/components/ProjectShowcase.tsx, src/components/ProjectGallery.tsx, src/content/portfolio.ts, src/App.tsx, src/index.css, worker/index.ts, public/_headers, eslint.config.js, README.md, package.json, package-lock.json

Scope: Lenis smooth scrolling, reliable contact errors, and the updated project and technical-skills portfolio presentation.

- [x] G1: gallery implementation exposes accessible modal behavior
  CHECK: node -e "const fs=require('fs'); const s=fs.readFileSync('src/components/ProjectGallery.tsx','utf8'); if(!s.includes('role=\"dialog\"') || !s.includes('aria-modal') || !s.includes('onClose') || !s.includes('ArrowLeft') || !s.includes('aria-live')) process.exit(1); console.log('gallery source verification passed')"
  EXPECT: gallery source verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=a3688bd4fceb/68 entries; EXPECT=matched; output-sha256=6d1926d5cdc15cf871970b211a15374bc72cf6fe25f918f6d491e1f16ab7f519; output-bytes=35

- [x] G2: BayanTrack and AnchorWatch are the only project gallery entries
  CHECK: node -e "const fs=require('fs'); const s=fs.readFileSync('src/content/portfolio.ts','utf8'); if((s.match(/gallery:\s*\[/g)||[]).length!==2 || !s.includes('title: \"BayanTrack\"') || !s.includes('title: \"AnchorWatch\"') || s.includes('title: \"Lurk\"')) process.exit(1); console.log('project gallery data verification passed')"
  EXPECT: project gallery data verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=a3688bd4fceb/68 entries; EXPECT=matched; output-sha256=bc300d231ef5d0567b30a9e77f4849128ecfbc2f874f249855b3a9dea9d7d371; output-bytes=41

- [x] G3: smooth scroll has reduced-motion fallback
  CHECK: node -e "const fs=require('fs'); const s=fs.readFileSync('src/index.css','utf8'); if(!s.includes('scroll-behavior: smooth') || !s.includes('scroll-padding-top') || !s.includes('prefers-reduced-motion')) process.exit(1); console.log('scroll motion verification passed')"
  EXPECT: scroll motion verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=a3688bd4fceb/68 entries; EXPECT=matched; output-sha256=3777ece4068231f6b3be659c555c2208e8761c957759774cef5cf0a84577f770; output-bytes=34

- [x] G4: project quality and security checks remain green
  CHECK: npm run check
  EXPECT: built in
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=a3688bd4fceb/68 entries; EXPECT=matched; output-sha256=550883944bcc274ba3ecaf3c0cc8c00b8664939d0420ef0ce946bc712dd7c7e6; output-bytes=1160

- [x] G5: browser review confirms visual direction, keyboard gallery controls, and no overlap at desktop/mobile widths
  EVIDENCE: desktop 1280x720 review matched the reference direction; no-preference Lenis wheel test moved from 0 to 32px immediately and 497.6px after 900ms; gallery opened, ArrowRight changed to the mobile snapshot, Escape closed it, focus returned to the trigger, and body scroll lock cleared; 390x844 viewport reported document scrollWidth=375 with two project cards and five skill groups sequential and non-overlapping, nine core-stack chips, no Lurk text, and empty browser error/warn logs.

- [x] G6: Lenis owns smooth scrolling and honors motion preferences
  CHECK: node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync('package.json','utf8')); const s=fs.readFileSync('src/main.tsx','utf8'); if(!p.dependencies?.lenis || !s.includes('ReactLenis') || !s.includes('smoothWheel') || !s.includes('lerp: 0.075') || !s.includes('anchors: false') || !s.includes('respectReducedMotion')) process.exit(1); console.log('lenis integration verification passed')"
  EXPECT: lenis integration verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=a3688bd4fceb/68 entries; EXPECT=matched; output-sha256=ed3275bf8aec9d0eb2af5dec412267f8e720e17835b2fc4fbf89958a06878e95; output-bytes=38

- [x] G7: contact failures produce actionable text instead of JSON parse errors
  CHECK: node -e "const fs=require('fs'); const s=fs.readFileSync('src/features/contact/ContactForm.tsx','utf8'); if(!s.includes('response.text()') || !s.includes('response.status === 404') || !s.includes('npm run dev:worker')) process.exit(1); console.log('contact error handling verification passed')"
  EXPECT: contact error handling verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=a3688bd4fceb/68 entries; EXPECT=matched; output-sha256=c57e0e389d77cb52c34dd331b24d81aeda0dc53ab2c6e0fff070b1d9ddee280f; output-bytes=43

- [x] G8: contact worker hardens origin and upstream failure boundaries
  CHECK: node -e "const fs=require('fs'); const w=fs.readFileSync('worker/index.ts','utf8'); const h=fs.readFileSync('public/_headers','utf8'); if(!w.includes('origin !== allowedOrigin') || !w.includes('AbortSignal.timeout(5000)') || !h.includes('Content-Security-Policy') || !h.includes('X-Frame-Options') || !h.includes('Strict-Transport-Security')) process.exit(1); console.log('contact security boundary verification passed')"
  EXPECT: contact security boundary verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=a3688bd4fceb/68 entries; EXPECT=matched; output-sha256=0aea21cfb9b294d5ec70e3804da90689ad7a7c7d270194ece5950539a111cf51; output-bytes=46

- [x] G9: section navigation delegates in-page links to Lenis
  CHECK: node -e "const fs=require('fs'); const a=fs.readFileSync('src/App.tsx','utf8'); const h=fs.readFileSync('src/components/SiteHeader.tsx','utf8'); if(!a.includes('useLenis') || !a.includes('scrollTo') || !a.includes('preventDefault') || !a.includes('pushState') || !h.includes('onNavigate')) process.exit(1); console.log('Lenis navigation source verification passed')"
  EXPECT: Lenis navigation source verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=a3688bd4fceb/68 entries; EXPECT=matched; output-sha256=488d01272f2553fcadd8a9fc96bacc1c8f9a3ad6c8288a192b77ee45f28dc517; output-bytes=44

- [x] G10: Worker rate limiting stays at three requests per IP per 60 seconds
  CHECK: node -e "const fs=require('fs'); const w=fs.readFileSync('worker/index.ts','utf8'); const c=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8')); const r=c.ratelimits?.[0]?.simple; if(r?.limit!==3 || r?.period!==60 || !w.includes('CONTACT_RATE_LIMITER.limit({ key: ip })') || !w.includes('Too many messages')) process.exit(1); console.log('rate limit source verification passed')"
  EXPECT: rate limit source verification passed
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\domin\Coding\Portfolio\ReactPorfolio; path=a3688bd4fceb/68 entries; EXPECT=matched; output-sha256=4747e97217b0014fead6a3531fa3df9332fd26ed003294bf16a52f4dac816d42; output-bytes=38

- [x] G11: browser navigation visibly animates to each section and updates active navigation
  EVIDENCE: Playwright desktop run measured Projects 0 -> 28 -> 213.6 -> 704px, About 704 -> 756.8 -> 1352 -> 2012px, and Contact 2012 -> 2074.4 -> 2740.8 -> 3548.8px; each destination settled at approximately 80px below the viewport top, active nav matched the destination, and URL hashes updated. Wheel run measured 0 -> 18.4 -> 236 -> 593.6px. Mobile 390x844 run reported scrollWidth 375 and About 118.4 -> 1520 -> 2949.6px with active nav and section top 80.3px.

- [x] G12: contact section exposes the local resume PDF in an accessible viewer with a download action
  CHECK: node -e "const fs=require('fs'); const a=fs.statSync('src/assets/Alicoben-Resume.pdf'); const app=fs.readFileSync('src/App.tsx','utf8'); const v=fs.readFileSync('src/components/ResumeViewer.tsx','utf8'); if(a.size<=0 || !app.includes('Alicoben-Resume.pdf') || !app.includes('setResumeOpen') || !v.includes('role=\"dialog\"') || !v.includes('download')) process.exit(1); console.log('resume viewer source verification passed')"
  EXPECT: resume viewer source verification passed
  EVIDENCE: exit=0; source verification passed; Vite and Worker browser sessions exposed the View resume and Download controls.

- [x] G13: local Vite and Worker previews retain Lenis navigation and the resume viewer works
  EVIDENCE: Vite and Worker reported html.lenis; Projects navigation produced intermediate scroll positions before settling at #work with Projects active. The Worker served the PDF with 200 application/pdf and inline disposition; the embedded frame was not blocked after the header update. Mobile 390px verification reported scrollWidth=390 with the resume card contained. The public Vercel URL is a separate older Next.js portfolio and is not this workspace build.
