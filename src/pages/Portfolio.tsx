import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ProjectsGrid from "../components/ProjectsGrid";
import SkillsSection from "../components/SkillsSection";
import ContactForm from "../components/ContactForm";
import ThemeToggle from "../components/ThemeToggle";

const Portfolio = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // Apply theme to document
    document.documentElement.classList.toggle("dark");
  };

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div
      className={`min-h-screen w-full bg-background ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Portfolio</div>
          <ul className="flex space-x-6">
            <li>
              <a href="#hero" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-primary transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="hover:text-primary transition-colors"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="pt-16">
        <section id="hero" className="min-h-screen flex items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="w-full"
          >
            <HeroSection />
          </motion.div>
        </section>

        <section id="projects" className="py-20 bg-muted/30">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              My Projects
            </h2>
            <ProjectsGrid />
          </motion.div>
        </section>

        <section id="skills" className="py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
            <SkillsSection />
          </motion.div>
        </section>

        <section id="contact" className="py-20 bg-muted/30">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Get In Touch
            </h2>
            <ContactForm />
          </motion.div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
