export type DocumentType = 'PROFORMA' | 'QUOTATION' | 'AFFIDAVIT' | 'CONTRACT' | 'EVENT_PROGRAM' | 'LETTER' | 'CV' | 'INVOICE';

export interface DocumentSettings {
  theme?: {
    primaryColor: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
  layout?: string;
  lang?: string;
}

export interface DocumentBase {
  id?: number;
  title: string;
  doc_type: DocumentType;
  status: 'DRAFT' | 'FINAL';
  content: any;
  settings?: DocumentSettings;
  customer_name?: string;
  customer_phone?: string;
  is_polished?: boolean;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceContent {
  clientName: string;
  clientAddress: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  taxRate: number;
  bankDetails?: string;
}

export interface CVContent {
  industryTarget?: 'academic' | 'tech' | 'creative' | 'corporate';
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    jobTitle: string;
    linkedin?: string;
    github?: string;
    website?: string;
    profileImage?: string;
  };
  summary: string;
  experience: {
    id: string;
    company: string;
    title: string;
    location?: string;
    duration: string;
    description: string; // Combined responsibilities
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    location?: string;
    year: string;
    grade?: string;
  }[];
  skills: {
    technical: string[];
    soft: string[];
  } | string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
  }[];
  achievements: string[];
  publications: {
    title: string;
    journal: string;
    year: string;
  }[];
  presentations: {
    title: string;
    event: string;
    year: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  references: {
    name: string;
    position: string;
    contact: string;
  }[];
}

export interface LetterContent {
  recipient_name: string;
  recipient_address: string;
  date: string;
  subject: string;
  body: string;
  sender_name: string;
}

export type DocumentData = InvoiceContent | CVContent | LetterContent;

export interface DocumentState<T> {
  data: T;
  isLoading: boolean;
  isSaving: boolean;
  isValidated: boolean;
  error: string | null;
}
