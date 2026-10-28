import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Download, ExternalLink, LoaderCircle, ShieldCheck, X } from "lucide-react";
import { Modal } from "./Modal";
import { Turnstile } from "../features/contact/Turnstile";
import { portfolio } from "../content/portfolio";
const PdfDocument = lazy(() => import("./PdfDocument"));

export function ResumeViewer({ intent, onClose }: { intent: "view" | "download"; onClose: () => void }) {
  const [token, setToken] = useState("");
  const [cycle, setCycle] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState("");
  const requestController = useRef<AbortController>();
  useEffect(() => {
    // Network request outlives its initiating event; abort pending delivery when the reader closes.
    return () => requestController.current?.abort();
  }, []);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const onToken = useCallback((value: string) => { setToken(value); if (value) setError(""); }, []);
  const onError = useCallback((message: string) => setError(message), []);
  useEffect(() => {
    // Verified bytes get a browser-owned URL; revoke it when the document is replaced or closed.
    if (!blob) return;
    const next = URL.createObjectURL(blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [blob]);
  useEffect(() => {
    // Initial download waits for verified response URL; no navigation to a public asset is possible.
    if (!url || intent !== "download") return;
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "Alicoben-Resume.pdf"; anchor.click();
  }, [url, intent]);
  const verify = async () => {
    if (!token || busy) return;
    setBusy(true); setError("");
    requestController.current = new AbortController();
    try {
      const response = await fetch("/api/resume", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ turnstileToken: token }), cache: "no-store", signal: requestController.current.signal });
      if (!response.ok) {
        const result: unknown = await response.json();
        throw new Error(result && typeof result === "object" && "message" in result && typeof result.message === "string" ? result.message : "Résumé could not load. Retry verification.");
      }
      if (!response.headers.get("Content-Type")?.includes("application/pdf")) throw new Error("Résumé service is unavailable. Please try again later.");
      setBlob(await response.blob());
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Résumé could not load. Try again."); setToken(""); setCycle((value) => value + 1); }
    finally { setBusy(false); }
  };
  return <Modal titleId="resume-title" onClose={onClose} className="resume-modal">
    <header className="modal-header"><h2 id="resume-title">Résumé</h2><button className="icon-button" autoFocus type="button" onClick={onClose} aria-label="Close resume viewer"><X /></button></header>
    {!blob ? <div className="resume-verification"><ShieldCheck className="verification-icon" /><h3>A quick human check</h3><p>Complete verification to {intent === "download" ? "download" : "view"} my résumé.</p><p className="fine-print">This helps limit automated downloads.</p>{siteKey ? <Turnstile key={cycle} siteKey={siteKey} action="resume" onToken={onToken} onError={onError} /> : <p role="status">Résumé verification is temporarily unavailable. <a href={`mailto:${portfolio.email}`}>Request a copy by email.</a></p>}<p className="form-status error" role="status">{error}</p><button className="button button-primary" disabled={!token || busy} onClick={() => void verify()} type="button">{busy ? <><LoaderCircle className="spin" /> Verifying…</> : intent === "download" ? "Verify & download" : "Verify & view"}</button>{siteKey && <button className="text-link" type="button" onClick={() => { setError(""); setToken(""); setCycle((value) => value + 1); }}>Retry verification</button>}</div> : <>
      <div className="resume-file-actions">{url && <><a className="button" href={url} download="Alicoben-Resume.pdf"><Download /> Download PDF</a><a className="text-link" href={url} target="_blank" rel="noopener noreferrer">Open original <ExternalLink /></a></>}</div>
      <Suspense fallback={<p className="reader-status" role="status">Preparing document…</p>}><PdfDocument blob={blob} /></Suspense>
    </>}
  </Modal>;
}
