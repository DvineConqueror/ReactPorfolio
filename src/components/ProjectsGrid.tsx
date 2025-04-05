import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import RConnect from "../assets/RConnect.jpg";
import SMARTDTR from "../assets/SmartDTR.jpg";
import Typeroo from "../assets/Typeroo.jpg";
import LM from "../assets/LegendaryMotorsports.png";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string | string[];
  projectURL?: string;
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectsGridProps {
  projects?: Project[];
}

const ProjectsGrid = ({ projects = [] }: ProjectsGridProps) => {
  // Default projects if none are provided
  const defaultProjects: Project[] = [
    {
      id: "1",
      title: "Smart DTR",
      description:
        "An online platform designed to make Daily Time Record (DTR) management more efficient and accessible.",
      category: "Mobile",
      projectURL: SMARTDTR,
      demoUrl: "https://example.com",
      githubUrl: "https://github.com/DvineConqueror/SMARTDTR-remade",
    },
    {
      id: "2",
      title: "Race Connect",
      description:
        "A dedicated social media platform for motorsports enthusiasts.",
      category: ["Mobile", "Web Development"],
      projectURL: RConnect,
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "3",
      title: "Legendary Motorsports",
      description:
        "Legendary motorsports is a wiki website that lets you browse information about cars and motorcycles",
      category: "Web Development",
      projectURL: LM,
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "4",
      title: "Typeroo",
      description: "The word game typeroo converted into desktop app, using Java.",
      category: "Design",
      projectURL: Typeroo,
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="overflow-hidden h-full bg-card transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.projectURL}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Overlay with actions */}
          <div
            className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            {project.demoUrl && (
              <Button size="sm" variant="secondary" asChild>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
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

        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-xl">{project.title}</h3>
            <Badge variant="secondary">{Array.isArray(project.category) ? project.category.join(', ') : project.category}</Badge>
          </div>
          <p className="text-muted-foreground text-sm">{project.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectsGrid;
