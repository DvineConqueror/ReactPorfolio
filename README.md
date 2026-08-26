# Henry Alicoben portfolio

React/Vite portfolio deployed as one Cloudflare Worker: static assets plus a hardened `/api/contact` endpoint.

## Local development

Frontend-only preview:

```bash
npm ci
copy .env.example .env
npm run dev
```

Worker-backed preview (required for the contact form):

```bash
copy .dev.vars.example .dev.vars
npm run dev:worker
```

Open the Worker URL printed by Wrangler, normally `http://localhost:8787`. If you keep Vite open on `http://localhost:5173`, run both servers; Vite proxies `/api/contact` to the Worker.

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
