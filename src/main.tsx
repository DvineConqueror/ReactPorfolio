import React from "react";
import ReactDOM from "react-dom/client";
import { ReactLenis } from "lenis/react";
import App from "./App";
import "@fontsource/geist/latin-400.css";
import "@fontsource/geist/latin-500.css";
import "@fontsource/geist/latin-600.css";
import "@fontsource/geist-mono/latin-400.css";
import "lenis/dist/lenis.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><ReactLenis root options={{ autoRaf: true, lerp: .1, smoothWheel: true, syncTouch: false, anchors: false, respectReducedMotion: true }}><App /></ReactLenis></React.StrictMode>,
);
