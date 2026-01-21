import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Code,
  Database,
  Figma,
  Globe,
  Layers,
  Palette,
  Server,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const SkillsSection = ({
  categories = defaultCategories,
}: {
  categories?: SkillCategory[];
}) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-background w-full">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical expertise and proficiency across various
            technologies and tools.
          </p>
          <Separator className="mt-8 max-w-md mx-auto" />
        </motion.div>

        <Tabs
          defaultValue={categories[0].name.toLowerCase()}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name.toLowerCase()}
                className="text-sm"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent
              key={category.name}
              value={category.name.toLowerCase()}
              className="space-y-8 mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="mr-3 text-primary">{skill.icon}</div>
                          <div>
                            <h3 className="font-medium">{skill.name}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {getSkillLevelLabel(skill.level)}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const getSkillLevelLabel = (level: number): string => {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Advanced";
  if (level >= 50) return "Intermediate";
  return "Beginner";
};

const defaultCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 60, icon: <Code size={24} /> },
      { name: "TypeScript", level: 60, icon: <Code size={24} /> },
      { name: "Tailwind CSS", level: 80, icon: <Palette size={24} /> },
      { name: "Next.js", level: 50, icon: <Globe size={24} /> },
      { name: "HTML/CSS", level: 100, icon: <Layers size={24} /> },
      { name: "JavaScript", level: 90, icon: <Code size={24} /> },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 80, icon: <Server size={24} /> },
      { name: "Express", level: 80, icon: <Server size={24} /> },
      { name: "PostgreSQL", level: 10, icon: <Database size={24} /> },
      { name: "MongoDB", level: 80, icon: <Database size={24} /> },
      { name: "GraphQL", level: 0, icon: <Code size={24} /> },
      { name: "REST APIs", level: 90, icon: <Globe size={24} /> },
    ],
  },
  {
    name: "Design",
    skills: [
      { name: "Figma", level: 90, icon: <Figma size={24} /> },
      { name: "UI/UX", level: 85, icon: <Palette size={24} /> },
      { name: "Responsive Design", level: 100, icon: <Layers size={24} /> },
      { name: "Wireframing", level: 90, icon: <Layers size={24} /> },
      { name: "Prototyping", level: 85, icon: <Figma size={24} /> },
      { name: "Design Systems", level: 80, icon: <Palette size={24} /> },
    ],
  },
];

export default SkillsSection;
