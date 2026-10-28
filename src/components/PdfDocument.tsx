import { useEffect, useRef, useState } from "react";
import { GlobalWorkerOptions, getDocument, TextLayer, type PDFDocumentProxy, type PDFPageProxy } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Minus, Plus, RotateCcw } from "lucide-react";

GlobalWorkerOptions.workerSrc = workerUrl;
function PdfPage({ pdf, number, width, zoom }: { pdf: PDFDocumentProxy; number: number; width: number; zoom: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    // PDF.js owns canvas/text DOM and async rendering; cancel work before redraw/unmount.
    const host = ref.current;
    if (!host || width <= 0) return;
    let cancelled = false;
    let renderTask: ReturnType<PDFPageProxy["render"]> | undefined;
    let textLayer: TextLayer | undefined;
    let page: PDFPageProxy | undefined;
    setError("");
    host.replaceChildren();
    void (async () => {
      page = await pdf.getPage(number);
      if (cancelled) return;
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: width / base.width * zoom });
      const scale = Math.min(devicePixelRatio || 1, 2);
      host.style.width = viewport.width + "px"; host.style.height = viewport.height + "px";
      host.style.setProperty("--scale-factor", String(viewport.scale));
      host.style.setProperty("--total-scale-factor", String(viewport.scale));
      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.width = Math.floor(viewport.width * scale); canvas.height = Math.floor(viewport.height * scale);
      canvas.style.width = viewport.width + "px"; canvas.style.height = viewport.height + "px";
      host.append(canvas);
      renderTask = page.render({ canvas, viewport, transform: [scale, 0, 0, scale, 0, 0] });
      const text = document.createElement("div"); text.className = "textLayer"; host.append(text);
      textLayer = new TextLayer({ textContentSource: await page.getTextContent(), container: text, viewport });
      if (cancelled) return;
      await Promise.all([renderTask.promise, textLayer.render()]);
      const annotations: unknown[] = await page.getAnnotations();
      if (cancelled) return;
      for (const item of annotations) {
        if (!item || typeof item !== "object" || !("url" in item) || typeof item.url !== "string" || !("rect" in item) || !Array.isArray(item.rect) || item.rect.length !== 4 || !item.rect.every((n: unknown) => typeof n === "number")) continue;
        let url: URL; try { url = new URL(item.url); } catch { continue; }
        if (!["https:", "http:", "mailto:"].includes(url.protocol)) continue;
        const rect = item.rect;
        const [x1, y1] = viewport.convertToViewportPoint(Number(rect[0]), Number(rect[1])) as [number, number];
        const [x2, y2] = viewport.convertToViewportPoint(Number(rect[2]), Number(rect[3])) as [number, number];
        const link = document.createElement("a"); link.href = url.href; link.target = "_blank"; link.rel = "noopener noreferrer"; link.className = "pdf-link"; link.setAttribute("aria-label", url.href);
        Object.assign(link.style, { left: Math.min(x1, x2) + "px", top: Math.min(y1, y2) + "px", width: Math.abs(x2 - x1) + "px", height: Math.abs(y2 - y1) + "px" }); host.append(link);
      }
    })().catch((cause: unknown) => { if (!cancelled) setError(cause instanceof Error ? "Page could not render. Use Open original or retry." : "Document could not render."); });
    return () => { cancelled = true; renderTask?.cancel(); textLayer?.cancel(); };
  }, [pdf, number, width, zoom]);
  return <section className="pdf-page-wrap" aria-label={`Page ${number}`}><div className="pdf-page" ref={ref} />{error && <p role="alert">{error}</p>}</section>;
}
export default function PdfDocument({ blob }: { blob: Blob }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState("");
  const [cycle, setCycle] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Document parsing uses a local PDF worker; destroy loading task/worker on cleanup.
    let cancelled = false;
    let task: ReturnType<typeof getDocument> | undefined;
    setError(""); setPdf(null);
    void blob.arrayBuffer().then(async (bytes) => {
      if (cancelled) return;
      task = getDocument({ data: new Uint8Array(bytes), useWasm: false });
      const doc = await task.promise;
      if (!cancelled) setPdf(doc);
    }).catch(() => { if (!cancelled) setError("Document could not load. Retry or open the original PDF."); });
    return () => { cancelled = true; if (task) void task.destroy(); };
  }, [blob, cycle]);
  useEffect(() => {
    // ResizeObserver measures available reader width, including rotation; disconnect on disposal.
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setWidth(Math.max(1, Math.min(element.clientWidth - 32, 850))));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className="pdf-reader"><div className="pdf-toolbar" aria-label="Document controls"><span aria-live="polite">{pdf ? `${pdf.numPages} ${pdf.numPages === 1 ? "page" : "pages"}` : "Loading…"}</span><div><button className="icon-button" type="button" aria-label="Zoom out" disabled={zoom <= .75} onClick={() => setZoom((value) => Math.max(.75, value - .25))}><Minus /></button><output aria-live="polite">{Math.round(zoom * 100)}%</output><button className="icon-button" type="button" aria-label="Zoom in" disabled={zoom >= 2.5} onClick={() => setZoom((value) => Math.min(2.5, value + .25))}><Plus /></button><button className="text-link" type="button" onClick={() => setZoom(1)}><RotateCcw /> Fit width</button></div></div><div ref={container} className="pdf-scroll" data-lenis-prevent>{error ? <p className="reader-status" role="alert">{error} <button type="button" onClick={() => setCycle((value) => value + 1)}>Retry</button></p> : pdf ? Array.from({ length: pdf.numPages }, (_, index) => <PdfPage key={index} pdf={pdf} number={index + 1} width={width} zoom={zoom} />) : <p className="reader-status" role="status">Loading document…</p>}</div></div>;
}
