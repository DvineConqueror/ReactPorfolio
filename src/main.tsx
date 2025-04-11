import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import emailjs from '@emailjs/browser';

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
