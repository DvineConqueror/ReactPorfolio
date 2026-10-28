# Henry Alicoben portfolio

React/Vite portfolio deployed as one Cloudflare Worker: static assets, `/api/contact`, and server-verified résumé delivery at `/api/resume`.

## Local development

Frontend-only preview:

```bash
npm ci
copy .env.example .env
npm run dev
```

Worker-backed preview (required for contact and résumé delivery):

```bash
copy .dev.vars.example .dev.vars
npm run dev:worker
```

Open the Worker URL printed by Wrangler, normally `http://localhost:8787`. If you keep Vite open on `http://localhost:5173`, run both servers; Vite proxies `/api/*` to the Worker. Match `ALLOWED_ORIGIN` to the Worker origin, and allow the frontend hostname in the Turnstile widget configuration.

The plain Vite preview and a static Vercel deployment do not expose `/api/contact` unless the Worker is running behind them, so a 404 there is expected. Serve the built site through this Worker, or add a Vercel Function that calls the same email API.

## Contact delivery

Contact requests pass through Cloudflare Turnstile, Worker-native rate limiting (3 requests/minute/IP), bounded Zod validation, a honeypot, same-origin enforcement, then Resend. Resend replaces SMTP and adds provider-level rate limits and delivery logs; Worker controls abuse before email delivery.

Create a Turnstile widget and verified Resend sending domain, then configure:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put RESEND_API_KEY
```

Update `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` in `wrangler.jsonc`. Set `VITE_TURNSTILE_SITE_KEY` as a GitHub repository variable.

If the form returns `503`, the sender is still a placeholder or one of the Worker secrets is missing. The sender must be an address on a verified Resend domain. For local testing, open the exact `localhost` URL allowed by your Turnstile widget; `127.0.0.1` is a different hostname.

## Protected résumé

Both viewing and downloading require a fresh Turnstile challenge with action `resume`. `POST /api/resume` accepts `{ "turnstileToken": "..." }`; the Worker validates origin, bounded request, rate limit (5 attempts/minute/IP), Siteverify success, hostname and action before returning the PDF with private/no-store headers. Expired or reused challenges fail closed. The contact form uses its separate limit and action.

The original résumé is `worker/private/resume.bin`, imported only by the Worker as binary data. It must never be imported into frontend code or copied into `public`/`dist`. Existing `/assets/Alicoben-Resume*.pdf` URLs return 404 through Worker-first routing. Verify with `node scripts/verify-resume-build.mjs` and `npx wrangler deploy --dry-run --outdir output/worker` after `npm run build`.

The reader lazy-loads local PDF.js/worker files after verification. Bytes and blob URLs stay in memory for the active reader and are disposed on close. Certificates remain public with original download links. Turnstile reduces automated access; it does not verify identity or prevent copying. Existing public copies, repository history and already-downloaded documents remain outside this protection.

Local browser automation should mock Turnstile/response delivery or use Cloudflare's documented test keys; never add a production verification bypass. Production requires the existing `TURNSTILE_SECRET_KEY` and matching `VITE_TURNSTILE_SITE_KEY`, plus authorized hostnames. Changing deployment origin requires updating `ALLOWED_ORIGIN` when explicitly set.

## GitHub CI/CD

Add repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Pull requests run lint, strict type checks, tests, build, and a high-severity dependency audit. Pushes to `main` deploy only after quality gates pass.

## Commands

```bash
npm run check
npm run deploy
```
