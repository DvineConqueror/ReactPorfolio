import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
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
      title: "E-Commerce Website",
      description:
        "A fully responsive e-commerce platform built with React and Node.js",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "2",
      title: "Mobile Banking App",
      description:
        "A secure and intuitive banking application for iOS and Android",
      category: "Mobile",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "3",
      title: "Portfolio Design System",
      description: "A comprehensive design system with reusable components",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "4",
      title: "Task Management Dashboard",
      description: "A productivity tool for teams to manage projects and tasks",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "5",
      title: "Fitness Tracking App",
      description: "A mobile application to track workouts and nutrition",
      category: "Mobile",
      image:
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      id: "6",
      title: "Brand Identity Package",
      description: "A complete brand identity design for a startup company",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ];

  const allProjects = projects.length > 0 ? projects : defaultProjects;

  // Get unique categories from projects
  const categories = [
    "All",
    ...new Set(allProjects.map((project) => project.category)),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === selectedCategory);

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
            src={project.image}
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
            <Badge variant="secondary">{project.category}</Badge>
          </div>
          <p className="text-muted-foreground text-sm">{project.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectsGrid;
