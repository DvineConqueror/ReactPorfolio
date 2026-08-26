import anchorWatch from "../assets/anchorwatch.png";
import anchorWatchMobile from "../assets/anchorwatch-mobile.png";
import bayanTrackWeb from "../assets/bayantrack_web.png";
import bayanTrackMobile1 from "../assets/bayantrack_mobile_1.png";
import bayanTrackMobile2 from "../assets/bayantrack_mobile_2.png";
import bayanTrackMobile3 from "../assets/bayantrack_mobile_3.png";

export type GalleryImage = { src: string; alt: string };
export type Project = {
  title: string;
  kicker: string;
  summary: string;
  contribution: string;
  image: string | null;
  imageAlt: string;
  gallery: GalleryImage[];
  period: string;
  organization: string;
  location: string;
  details: string[];
  stack: string[];
  repository: string;
};
export type SkillGroup = { title: string; items: string[] };

export const portfolio = {
  email: "hdominic2016@gmail.com",
  github: "https://github.com/DvineConqueror",
  linkedin: "https://ph.linkedin.com/in/henrydominicalicoben",
  intro: "I turn operational problems into clear, secure web products—from interface systems to the APIs behind them.",
  stack: ["React/Next.js", "TypeScript", "JavaScript", "Node.js", "REST APIs", "TailwindCSS", "Django", "MongoDB", "Figma"],
  projects: [
    {
      title: "BayanTrack",
      kicker: "Incident reporting system",
      summary: "Verified incident reporting with live dispatch tracking for LGUs.",
      contribution: "Web, mobile, AI, and blockchain tools for citizens and response teams.",
      image: bayanTrackWeb,
      imageAlt: "BayanTrack web dashboard",
      gallery: [
        { src: bayanTrackWeb, alt: "BayanTrack web dashboard" },
        { src: bayanTrackMobile1, alt: "BayanTrack mobile incident reporting view" },
        { src: bayanTrackMobile2, alt: "BayanTrack mobile map view" },
        { src: bayanTrackMobile3, alt: "BayanTrack mobile response view" },
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
      repository: "",
    },
    {
      title: "AnchorWatch",
      kicker: "FinTech platform",
      summary: "Stablecoin monitoring with alerts, analytics, and trend tracking.",
      contribution: "React product surfaces with an AI assistant for financial questions.",
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
  ] satisfies Project[],
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
