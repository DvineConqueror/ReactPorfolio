import React, { useState } from "react";
import { Moon, Sun, X, Menu, Home as HomeIcon, FolderGit2, Lightbulb, Mail } from "lucide-react";
import HeroSection from "./HeroSection";
import ProjectsGrid from "./ProjectsGrid";
import SkillsSection from "./SkillsSection";
import ContactForm from "./ContactForm";
import { Button } from "./ui/button";

const Home = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`min-h-screen bg-background ${theme === "dark" ? "dark" : ""}`}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">My Portfolio</div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            > 
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation Sidebar */}
          <div className={`
            fixed top-[73px] right-0 w-72 bg-background/95 dark:bg-background/95 border-l border-border
            transform transition-transform duration-300 ease-in-out backdrop-blur-sm rounded-lg
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            lg:hidden
          `}>
            <div className="flex flex-col p-6 gap-6 rounded-lg">
              <button
                onClick={() => {
                  scrollToSection("hero");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </button>
              <button
                onClick={() => {
                  scrollToSection("projects");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                <FolderGit2 className="h-5 w-5" />
                Projects
              </button>
              <button
                onClick={() => {
                  scrollToSection("skills");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                <Lightbulb className="h-5 w-5" />
                Skills
              </button>
              <button
                onClick={() => {
                  scrollToSection("contact");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-accent/50"
              >
                <Mail className="h-5 w-5" />
                Contact
              </button>
              <Button
                variant="ghost"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                className="flex items-center gap-2 w-fit"
              >
                {theme === "light" ? (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {" "}
        {/* Add padding to account for fixed navbar */}
        {/* Hero Section */}
        <section id="hero" className="min-h-screen">
          <HeroSection />
        </section>
        {/* Projects Section */}
        <section id="projects" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <ProjectsGrid />
          </div>
        </section>
        {/* Skills Section */}
        <section id="skills">
          <div className="container mx-auto px-4">
            <SkillsSection />
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://github.com/DvineConqueror"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://ph.linkedin.com/in/henrydominicalicoben"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/dominicalicoben"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
