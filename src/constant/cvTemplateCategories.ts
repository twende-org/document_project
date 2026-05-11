// src/constants/cvTemplateCategories.ts

export interface CVTemplateCategory {
  id: number;
  name: string;
  description: string;
  preview?: string; 
}

export const CV_TEMPLATE_CATEGORIES: CVTemplateCategory[] = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Sleek, contemporary design suitable for all corporate and creative industries.",
  },
  {
    id: 2,
    name: "ATS-Friendly",
    description: "Strictly formatted single-column layout optimized for machine parsing and readability.",
  },
  {
    id: 3,
    name: "Executive",
    description: "High-density, elegant design for senior leaders and corporate executives.",
  },
  {
    id: 4,
    name: "Minimalist",
    description: "Pure focus on content with intentional whitespace and clean typography.",
  },
  {
    id: 5,
    name: "Creative Portfolio",
    description: "Bold design with image support, ideal for designers and marketing professionals.",
  },
  {
    id: 6,
    name: "Internship/Student",
    description: "Structured to highlight academic achievements and growth potential for early careers.",
  },
  {
    id: 7,
    name: "Academic CV",
    description: "Formal multi-page layout optimized for research, publications, and teaching roles.",
  },
  {
    id: 8,
    name: "Corporate Standard",
    description: "Traditional and trustworthy institutional design for established professionals.",
  },
  {
    id: 9,
    name: "Technical/Engineering",
    description: "Information-dense layout focused on technical skills, projects, and toolsets.",
  },
  {
    id: 10,
    name: "International",
    description: "Global-compatible formatting adhering to international recruitment standards.",
  },
];
