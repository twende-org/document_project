export type DocumentType = 'PROFORMA' | 'QUOTATION' | 'AFFIDAVIT' | 'CONTRACT' | 'EVENT_PROGRAM' | 'LETTER' | 'CV' | 'INVOICE';

export interface DocumentBase {
  id?: number;
  title: string;
  doc_type: DocumentType;
  status: 'DRAFT' | 'FINAL';
  content: any;
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
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    jobTitle: string;
  };
  summary: string;
  experience: any[];
  education: any[];
  skills: string[];
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
