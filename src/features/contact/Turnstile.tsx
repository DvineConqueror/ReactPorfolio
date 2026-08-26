import React, { useEffect, useRef } from "react";

const SCRIPT_ID = "cloudflare-turnstile-script";

export function Turnstile({ siteKey, onToken }: { siteKey: string; onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // External sync only: Cloudflare owns widget lifecycle; render-time derivation cannot initialize its SDK.
    let widgetId: string | undefined;
    let cancelled = false;
    const render = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetId = window.turnstile.render(containerRef.current, { sitekey: siteKey, theme: "dark", size: "flexible", callback: onToken, "expired-callback": () => onToken(""), "error-callback": () => onToken("") });
    };
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (window.turnstile) render();
    else if (existing) existing.addEventListener("load", render, { once: true });
    else {
      const script = document.createElement("script"); script.id = SCRIPT_ID; script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; script.async = true; script.defer = true; script.addEventListener("load", render, { once: true }); document.head.appendChild(script);
    }
    return () => { cancelled = true; existing?.removeEventListener("load", render); if (widgetId && window.turnstile) window.turnstile.remove(widgetId); };
  }, [onToken, siteKey]);
  return <div ref={containerRef} className="turnstile" aria-label="Bot verification" />;
}
