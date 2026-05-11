import type { CVContent, InvoiceContent, LetterContent } from "./types";

export const CV_TEMPLATE: CVContent = {
  personalInfo: {
    fullName: "Alex Standard",
    jobTitle: "Senior Solutions Architect",
    email: "alex@example.com",
    phone: "+255 700 000 000",
    address: "Dar es Salaam, Tanzania",
  },
  summary: "Results-driven Solutions Architect with 10+ years of experience in designing scalable cloud architectures and leading cross-functional teams.",
  experience: [
    { 
      id: "t1", 
      title: "Lead Developer", 
      company: "Tech Systems Ltd", 
      duration: "2019 - 2024", 
      description: "Implemented enterprise-scale React applications and optimized cloud infrastructure." 
    }
  ],
  education: [
    { id: "e1", degree: "MSc in Computer Science", school: "University of Dar es Salaam", year: "2015" }
  ],
  skills: ["React", "TypeScript", "AWS", "Node.js", "Architecture Design"],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  references: []
};

export const INVOICE_TEMPLATE: InvoiceContent = {
  clientName: "Enterprise Solutions Co.",
  clientAddress: "Regency Park, Wing A, Dar es Salaam",
  invoiceDate: "2024-04-09",
  dueDate: "2024-04-23",
  items: [
    { id: "i1", description: "Professional Document Architecture", quantity: 1, unitPrice: 150000 },
    { id: "i2", description: "AI Consultation & Strategy", quantity: 2, unitPrice: 75000 }
  ],
  taxRate: 18,
  bankDetails: "NMB Bank - Branch: Corporate - Acc: 0123456789"
};

export const LETTER_TEMPLATE: LetterContent = {
  recipient_name: "The Hiring Manager",
  recipient_address: "Future Tech Ltd, Innovation District",
  date: "2024-04-09",
  subject: "RE: Application for Senior Document Specialist",
  body: "I am writing to express my strong interest in the Senior Document Specialist position. With my extensive background in digital documentation and AI-assisted architectures, I am confident in my ability to contribute to your team's success...",
  sender_name: "Twende Documents Admin"
};
