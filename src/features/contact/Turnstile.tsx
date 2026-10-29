import { useEffect, useRef } from "react";

let sdkPromise: Promise<void> | undefined;
function loadSdk(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!sdkPromise) sdkPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "cloudflare-turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { script.remove(); sdkPromise = undefined; reject(new Error("Verification could not load. Check your connection and retry.")); };
    document.head.appendChild(script);
  });
  return sdkPromise;
}
export function Turnstile({ siteKey, onToken, action = "contact", onError }: { siteKey: string; onToken: (token: string) => void; action?: "contact" | "resume"; onError?: (message: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Cloudflare SDK is external; render only after load and dispose its widget/subscriptions on unmount.
    let cancelled = false;
    let id: string | undefined;
    let observer: ResizeObserver | undefined;
    void loadSdk().then(() => {
      if (cancelled || !ref.current || !window.turnstile) return;
      let size: "compact" | "flexible" | undefined;
      const render = () => {
        if (!ref.current || !window.turnstile) return;
        const nextSize = ref.current.clientWidth < 300 ? "compact" : "flexible";
        if (size === nextSize) return;
        size = nextSize;
        if (id) window.turnstile.remove(id);
        onToken("");
        id = window.turnstile.render(ref.current, { sitekey: siteKey, action, theme: "auto", size, callback: onToken,
          "expired-callback": () => { onToken(""); onError?.("Verification expired. Complete the challenge again."); },
          "error-callback": () => { onToken(""); onError?.("Verification failed to load. Retry or contact me by email."); },
        });
      };
      observer = new ResizeObserver(render);
      observer.observe(ref.current);
      render();
    }).catch(() => { if (!cancelled) onError?.("Verification could not load. Check your connection and retry."); });
    return () => { cancelled = true; observer?.disconnect(); if (id) window.turnstile?.remove(id); };
  }, [siteKey, onToken, action, onError]);
  return <div ref={ref} className="turnstile" aria-label="Bot verification" />;
}
