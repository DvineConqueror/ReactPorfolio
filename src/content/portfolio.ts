import anchorWatch from "../assets/anchorwatch.png";
import anchorWatchMobile from "../assets/anchorwatch-mobile.png";
import bayanTrackWeb from "../assets/bayantrack_web.png";
import bayanTrackMobile1 from "../assets/bayantrack_mobile_1.png";
import bayanTrackMobile2 from "../assets/bayantrack_mobile_2.png";
import bayanTrackMobile3 from "../assets/bayantrack_mobile_3.png";
import aioConvert from "../assets/projects/aio-convert.png";
import aioDownload from "../assets/projects/aio-download.png";
import gpos from "../assets/projects/gpos.jpg";
import lurkTerminal from "../assets/projects/lurk-terminal.png";
import lurkTitle from "../assets/projects/lurk-title.png";
import raceConnect from "../assets/projects/raceconnect.png";
import smartDtr from "../assets/projects/smartdtr.png";
import typeroo from "../assets/projects/typeroo.png";

export type GalleryImage = { src: string; alt: string };
export type Project = {
  id: string;
  group: "featured" | "other";
  role: string;
  title: string;
  kicker: string;
  summary: string;
  contribution: string;
  decision?: string;
  evidence?: string;
  status?: string;
  image: string | null;
  imageAlt: string;
  gallery: GalleryImage[];
  period?: string;
  organization?: string;
  location?: string;
  details: string[];
  stack: string[];
  fullStack?: string[];
  repository?: string;
};
export type SkillGroup = { title: string; items: string[] };

export const portfolio = {
  email: "hdominic2016@gmail.com",
  github: "https://github.com/DvineConqueror",
  linkedin: "https://ph.linkedin.com/in/henrydominicalicoben",
  intro: "I turn operational problems into clear, secure web products—from interface systems to the APIs behind them.",
  bio: "I’m a fourth-year IT student at PHINMA – University of Pangasinan, based in the Philippines. I build web, mobile and desktop software for civic reporting, financial monitoring and everyday tools.",
  availability: "Seeking an internship or entry-level development role.",
  stack: ["React/Next.js", "TypeScript", "JavaScript", "Node.js", "REST APIs", "TailwindCSS", "Django", "MongoDB", "Figma"],
  projects: [
    {
      id: "bayantrack",
      group: "featured",
      role: "Developer",
      title: "BayanTrack",
      kicker: "Incident reporting system",
      summary: "Verified incident reporting with live dispatch tracking for LGUs.",
      contribution: "Built the web portal, Flutter mobile app, Django backend and blockchain incident audit trails.",
      decision: "Kept citizen reporting and staff coordination in separate mobile and web interfaces, connected through the Django API. This gives each audience its own workflow while sharing incident data.",
      evidence: "The quick-report screenshot shows nearby duplicate reports before submission. The gallery also includes mobile onboarding and sign-in, plus the staff portal sign-in screen.",
      image: bayanTrackMobile3,
      imageAlt: "BayanTrack quick report checking nearby duplicate incidents before submission",
      gallery: [
        { src: bayanTrackMobile3, alt: "BayanTrack quick report: nearby duplicate incidents and review or submit actions" },
        { src: bayanTrackWeb, alt: "BayanTrack staff portal sign-in screen" },
        { src: bayanTrackMobile1, alt: "BayanTrack mobile onboarding screen" },
        { src: bayanTrackMobile2, alt: "BayanTrack mobile welcome and sign-in screen" },
      ],
      period: "Jan. 2026",
      organization: "PHINMA University of Pangasinan",
      location: "Dagupan City, Pangasinan",
      details: [
        "Flutter app with Riverpod, Dio, and live maps.",
        "Next.js portal with React, TypeScript, TanStack Query, Zustand, and Tailwind.",
        "Django API with MongoDB, blockchain audit trails, and AI triage.",
      ],
      stack: ["Flutter", "Next.js 16", "React 19", "TypeScript", "Django", "MongoDB", "Blockchain", "AI"],
      fullStack: ["Flutter", "Riverpod", "Dio", "Next.js 16", "React 19", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS", "Django", "MongoDB", "Blockchain", "AI"],
    },
    {
      id: "anchorwatch",
      group: "featured",
      role: "Developer",
      title: "AnchorWatch",
      kicker: "FinTech platform",
      summary: "Stablecoin monitoring with alerts, analytics, and trend tracking.",
      contribution: "Built the web and mobile applications for stablecoin monitoring, alerts and historical trends.",
      decision: "Combined market dashboards with natural-language summaries so users can inspect trends visually and ask questions about the same financial data.",
      evidence: "Desktop and mobile dashboard screenshots show the monitoring interface. The linked frontend repository provides the implementation to review.",
      image: anchorWatch,
      imageAlt: "AnchorWatch dashboard showing stablecoin market monitoring",
      gallery: [
        { src: anchorWatch, alt: "AnchorWatch desktop dashboard" },
        { src: anchorWatchMobile, alt: "AnchorWatch mobile dashboard" },
      ],
      period: "Oct. 2025",
      organization: "PHINMA University of Pangasinan",
      location: "Dagupan City, Pangasinan",
      details: [
        "Live alerts, analytics dashboards, and historical trends.",
        "LLM summaries and natural-language financial queries.",
      ],
      stack: ["React", "FastAPI", "Python", "MongoDB", "Flutter", "TensorFlow"],
      repository: "https://github.com/DvineConqueror/AnchorWatch_Web_Frontend",
    },
    {
      id: "aio-converter",
      group: "featured",
      role: "Developer",
      title: "AIO Converter",
      kicker: "Windows desktop utility",
      summary: "Local file conversion, with optional online video and audio downloads.",
      contribution: "Built the entire Windows application, from conversion and download workspaces to local engine integration and queued jobs.",
      status: "Release candidate",
      decision: "Local conversions run through desktop engines and a serial job queue. Optional link downloads use a separate workspace and require an internet connection.",
      evidence: "Conversion and download screenshots show the two workspaces. Source includes the queue and desktop bridge; no public installer is offered here.",
      image: aioConvert,
      imageAlt: "AIO Converter desktop file-conversion workspace",
      gallery: [
        { src: aioConvert, alt: "AIO Converter: local file conversion, queue, and output-folder selection" },
        { src: aioDownload, alt: "AIO Converter: online video and audio download workspace" },
      ],
      details: [
        "Local conversion stays offline; optional video and audio link downloads require internet access.",
        "ImageMagick handles image conversion, resizing, and quality adjustments. FFmpeg and ffprobe handle audio/video conversion, compression, extraction, and inspection.",
        "LibreOffice converts office documents; Poppler renders PDFs and extracts text; Pandoc converts ebooks and markup; 7-Zip handles archives.",
        "yt-dlp handles downloads from supported websites, with Deno providing JavaScript support for YouTube extraction.",
        "Plain TypeScript DOM interface, a serial job queue, and an Electron desktop bridge. Windows packaging uses electron-builder with NSIS.",
        "Application source is MIT; bundled engines retain their own licenses. The repository describes a release candidate; no public installer is offered here.",
      ],
      stack: ["Electron", "TypeScript", "FFmpeg", "ImageMagick"],
      fullStack: ["Electron", "TypeScript", "HTML/CSS", "Vite", "esbuild", "electron-builder", "NSIS", "Node.js test runner", "Playwright", "GitHub Actions", "npm", "ImageMagick", "FFmpeg", "ffprobe", "LibreOffice", "Poppler", "Pandoc", "7-Zip", "yt-dlp", "Deno"],
      repository: "https://github.com/DvineConqueror/AIO-Converter",
    },
    {
      id: "gpos",
      group: "featured",
      role: "Developer",
      title: "GPOS",
      kicker: "Grocery point of sale",
      summary: "Product browsing, checkout, inventory, and sales reporting for a grocery store.",
      contribution: "Built the entire SmartGPOS (GPOS) web application, including the frontend and backend for the grocery point-of-sale system.",
      decision: "The interface keeps the product catalog and checkout cart together, with search, categories and visible stock for the cashier’s purchase flow.",
      evidence: "The supplied screenshot shows product search, stock levels and a checkout cart. The source repository documents inventory, receipts and sales reporting.",
      image: gpos,
      imageAlt: "GPOS grocery product catalog and checkout cart",
      gallery: [{ src: gpos, alt: "GPOS: grocery product search, stock levels, and checkout cart" }],
      details: [
        "Product catalog with search, category filtering, stock visibility, and cart-based checkout.",
        "Repository documents inventory management, transaction history, receipts, sales analytics, and admin/cashier roles.",
        "React and TypeScript frontend with an Express API, MongoDB/Mongoose persistence, and Socket.IO integration.",
      ],
      stack: ["React", "TypeScript", "Express", "MongoDB", "Socket.IO"],
      fullStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "Express", "MongoDB", "Mongoose", "Socket.IO", "TanStack Query", "React Hook Form", "Chart.js", "Recharts"],
      repository: "https://github.com/DvineConqueror/GStorePOS-System",
    },
    {
      id: "lurk",
      group: "other",
      role: "Developer",
      title: "Lurk",
      kicker: "Sci-fi game",
      summary: "A sci-fi game with equipment purchasing, backed by game, API, and smart-contract code.",
      contribution: "Developer on the Lurk game project.",
      image: lurkTerminal,
      imageAlt: "Lurk supply terminal with oxygen, battery, flashlight, and medical-kit purchases",
      gallery: [
        { src: lurkTerminal, alt: "Lurk: supply terminal and equipment purchases" },
        { src: lurkTitle, alt: "Lurk: title screen against a space backdrop" },
      ],
      details: [
        "Unity 6 project with C# gameplay code, Universal Render Pipeline, Input System, and AI Navigation.",
        "The supplied supply-terminal screen shows equipment purchasing and credits.",
        "Repository includes an Express/TypeScript backend with Prisma/PostgreSQL, inventory and shop routes, and wallet integration code.",
        "Solidity shop contract uses OpenZeppelin, with Hardhat tooling and ethers integration. Repository code does not establish a deployed contract or verified multiplayer functionality.",
      ],
      stack: ["Unity", "C#", "TypeScript", "PostgreSQL", "Solidity"],
      fullStack: ["Unity 6", "C#", "URP", "Input System", "AI Navigation", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Solidity", "Hardhat", "OpenZeppelin", "ethers"],
      repository: "https://github.com/DvineConqueror/Lurk_Game_Development",
    },
    {
      id: "raceconnect",
      group: "other",
      role: "Developer",
      title: "RaceConnect",
      kicker: "Racing community administration",
      summary: "An admin interface for users, reported content, and racing-category activity.",
      contribution: "Developer of the RaceConnect admin interface.",
      image: raceConnect,
      imageAlt: "RaceConnect admin dashboard with category chart and moderation navigation",
      gallery: [{ src: raceConnect, alt: "RaceConnect: user totals, reported content, and posts by racing category" }],
      details: [
        "Dashboard summarizes users, reported posts and items, and activity by racing category.",
        "Repository includes user moderation, notifications, and announcement interfaces.",
        "PHP/PDO server pages with browser JavaScript, CSS, and Chart.js. Database connection configuration is outside the linked admin repository.",
      ],
      stack: ["PHP", "JavaScript", "HTML/CSS", "Chart.js"],
      fullStack: ["PHP", "PDO", "JavaScript", "HTML/CSS", "Chart.js"],
      repository: "https://github.com/DvineConqueror/RaceConnect-Admin",
    },
    {
      id: "smartdtr",
      group: "other",
      role: "Developer",
      title: "SmartDTR",
      kicker: "Android duty scheduling",
      summary: "Appointment and duty views for students and teachers, with upcoming and completed schedules.",
      contribution: "Developer on the SmartDTR project.",
      image: smartDtr,
      imageAlt: "SmartDTR mobile preview with appointment action and upcoming and completed duties",
      gallery: [{ src: smartDtr, alt: "SmartDTR supplied mobile preview: appointment action and duty schedules" }],
      details: [
        "Native Android application written in Kotlin with XML layouts and View Binding.",
        "Retrofit/Gson, coroutines, AndroidX, and Material components support the application interface and API integration.",
        "Repository includes PHP/Laravel route and Eloquent model code for students, teachers, and duties.",
      ],
      stack: ["Kotlin", "Android", "Retrofit", "PHP/Laravel"],
      fullStack: ["Kotlin", "Android", "XML layouts", "View Binding", "Retrofit", "Gson", "Coroutines", "AndroidX", "Material Components", "PHP", "Laravel", "Eloquent"],
      repository: "https://github.com/DvineConqueror/SMARTDTR-remade",
    },
    {
      id: "typeroo",
      group: "other",
      role: "Developer",
      title: "Typeroo",
      kicker: "Desktop typing game",
      summary: "A Java desktop recreation of an earlier typing-game project.",
      contribution: "Developer of the Typeroo desktop recreation.",
      image: typeroo,
      imageAlt: "Supplied Typeroo project preview with How to Play and Play Game actions",
      gallery: [{ src: typeroo, alt: "Supplied Typeroo project preview; linked repository contains the Java desktop recreation" }],
      details: [
        "Desktop recreation of the earlier OJT typing-game project at PHINMA University of Pangasinan.",
        "Java Swing interface uses AWT, sampled audio, and difficulty-selection handlers.",
        "Supplied image is a project preview; its parity with the linked desktop build has not been established.",
      ],
      stack: ["Java", "Swing", "AWT"],
      repository: "https://github.com/DvineConqueror/Typeroo-Desktop-App",
    },
  ] as Project[],
  approach: [
    { number: "01", title: "Frame", description: "Find the real user constraint, success signal, and smallest shippable outcome." },
    { number: "02", title: "Build", description: "Connect interface and infrastructure in thin, testable slices with clear boundaries." },
    { number: "03", title: "Harden", description: "Verify accessibility, edge cases, security boundaries, performance, and deployment." },
  ],
  technicalSkills: [
    { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "PHP", "SQL", "Solidity", "Dart", "HTML", "CSS", "Java", "Kotlin"] },
    { title: "Frameworks & Libraries", items: ["React", "Next.js", "Node.js", "Express.js", "Django", "FastAPI", "Flutter", "TensorFlow", "PyTorch", "Kotlin Multiplatform", "JavaFX"] },
    { title: "Databases", items: ["MongoDB", "PostgreSQL", "Supabase"] },
    { title: "Tools & Platforms", items: ["Git", "GitHub", "Docker", "Figma", "Postman", "VS Code", "Google Cloud", "Firebase", "Ethereum (Sepolia)"] },
    { title: "Concepts", items: ["REST APIs", "Full-Stack Development", "AI Integration", "Blockchain & Smart Contracts", "Responsive Design", "MVC", "Authentication", "CRUD"] },
  ] satisfies SkillGroup[],
};
