import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye, Smartphone, Monitor, X } from "lucide-react";
import RaceConnectImg from "../assets/race_connect.png";
import RaceConnectMobileImg from "../assets/race_connect-mobile.jpg";
import SmartDTRImg from "../assets/smart_dtr.png";
import TyperooImg from "../assets/typeroo.png";
import MotorsportsImg from "../assets/motorsports.png";
import GroceryPOSImg from "../assets/grocery_pos.jpg";
import AnchorWatchImg from "../assets/anchorwatch.png";
import AnchorWatchMobileImg from "../assets/anchorwatch-mobile.png";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string | string[];
  projectURL?: string;
  mobileProjectURL?: string; // Added field
  githubUrl?: string;
  fullWidth?: boolean;
}

const ProjectDetails = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [showMobile, setShowMobile] = useState(false);
  // Reset view when project changes
  React.useEffect(() => setShowMobile(false), [project]);

  const hasMobile = !!project.mobileProjectURL && project.mobileProjectURL !== project.projectURL;
  const currentImage = showMobile && project.mobileProjectURL ? project.mobileProjectURL : project.projectURL;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* @ts-ignore */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white/90 bg-gray-500 hover:text-white hover:bg-black/100 z-50"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={showMobile ? "mobile" : "desktop"}
              src={currentImage}
              alt={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`max-w-full max-h-[85vh] object-contain ${showMobile ? "shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-gray-800 rounded-[2rem]" : "shadow-lg rounded-md"}`}
            />
          </AnimatePresence>

          {hasMobile && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {/* @ts-ignore */}
              <Button
                size="sm"
                variant={!showMobile ? "default" : "secondary"}
                className="gap-2"
                onClick={() => setShowMobile(false)}
              >
                <Monitor className="h-4 w-4" />
                Desktop
              </Button>
              {/* @ts-ignore */}
              <Button
                size="sm"
                variant={showMobile ? "default" : "secondary"}
                className="gap-2"
                onClick={() => setShowMobile(true)}
              >
                <Smartphone className="h-4 w-4" />
                Mobile
              </Button>
            </div>
          )}
        </div>

        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
          <div className="flex gap-4 justify-center">
            {project.githubUrl && (
              // @ts-ignore
              <Button variant="outline" className="text-white border-white bg-transparent hover:bg-white/20" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectsGridProps {
  projects?: Project[];
}

const ProjectsGrid = ({ projects = [] }: ProjectsGridProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Default projects if none are provided
  const defaultProjects: Project[] = [
    {
      id: "1",
      title: "Smart DTR",
      description:
        "An online platform designed to make Daily Time Record (DTR) management more efficient and accessible.",
      category: "Mobile",
      mobileProjectURL: SmartDTRImg, // Mobile app, so mobile URL is prioritized or same
      projectURL: SmartDTRImg,
      githubUrl: "https://github.com/DvineConqueror/SMARTDTR-remade",
    },
    {
      id: "2",
      title: "Race Connect",
      description:
        "A dedicated social media platform for motorsports enthusiasts.",
      category: ["Mobile", "Web Development"],
      projectURL: RaceConnectImg,
      mobileProjectURL: RaceConnectMobileImg,
      githubUrl: "https://github.com/DvineConqueror/RaceConnect-Admin",
    },
    {
      id: "3",
      title: "Legendary Motorsports",
      description:
        "Legendary motorsports is a wiki website that lets you browse information about cars and motorcycles",
      category: "Web Development",
      projectURL: MotorsportsImg,
      githubUrl: "https://github.com",
    },
    {
      id: "4",
      title: "Typeroo",
      description: "A simple yet addictive game that helps you improve your typing skills while having fun.",
      category: "Desktop",
      projectURL: TyperooImg,
      githubUrl: "https://github.com/DvineConqueror/Typeroo-Desktop-App",
    },
    {
      id: "5",
      title: "Anchor Watch",
      description: "Built a fintech platform to monitor stablecoins with real-time alerts and analytics.",
      category: ["Web Development", "Mobile"],
      projectURL: AnchorWatchImg,
      mobileProjectURL: AnchorWatchMobileImg,
      githubUrl: "https://github.com/DvineConqueror/AnchorWatch_Web_Frontend",
    },
    {
      id: "6",
      title: "Grocery POS",
      description: "Built a POS system with inventory, sales tracking, and receipts.",
      category: "Web Development",
      projectURL: GroceryPOSImg,
      githubUrl: "https://github.com/DvineConqueror/GStorePOS-System",
    }
  ];

  const allProjects = projects.length > 0 ? projects : defaultProjects;

  // Get unique categories from projects
  const categories = [
    "All",
    ...new Set(allProjects.flatMap((project) => Array.isArray(project.category) ? project.category : [project.category])),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((project) => Array.isArray(project.category) ? project.category.includes(selectedCategory) : project.category === selectedCategory);

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work across various domains including web
            development, mobile applications, and design systems.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            // @ts-ignore
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectDetails
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const hasMobile = !!project.mobileProjectURL && project.mobileProjectURL !== project.projectURL;
  const currentImage = showMobile && project.mobileProjectURL ? project.mobileProjectURL : project.projectURL;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="overflow-hidden h-full bg-card transition-all duration-300 hover:shadow-lg flex flex-col cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(project)}
      >
        <div className="relative overflow-hidden aspect-video bg-muted group">
          <AnimatePresence mode="wait">
            <motion.img
              key={showMobile ? "mobile" : "desktop"}
              src={currentImage}
              alt={project.title}
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`w-full h-full object-cover transition-transform duration-500 ease-in-out ${isHovered ? "scale-105" : "scale-100"}`}
            />
          </AnimatePresence>

          {/* Platform Toggle */}
          {hasMobile && (
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* @ts-ignore */}
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobile(!showMobile);
                }}
                title={showMobile ? "View Desktop" : "View Mobile"}
              >
                {showMobile ? <Monitor className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
              </Button>
            </div>
          )}

          {/* Overlay with actions */}
          <div
            className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            {project.githubUrl && (
              // @ts-ignore
              <Button size="sm" variant="outline" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </div>

        <CardContent className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-xl">{project.title}</h3>
            {/* @ts-ignore */}
            <Badge variant="secondary">{Array.isArray(project.category) ? project.category.join(', ') : project.category}</Badge>
          </div>
          <p className="text-muted-foreground text-sm flex-grow">{project.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectsGrid;
