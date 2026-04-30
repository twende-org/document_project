import type { DocumentType } from './types';
import CVPDFTemplate from './cv/PDFTemplate';
import InvoicePDFTemplate from './invoice/PDFTemplate';
import LetterPDFTemplate from './letter/PDFTemplate';
import AffidavitPDFTemplate from './affidavit/PDFTemplate';
import EventProgramPDFTemplate from './event-program/PDFTemplate';

// CV Specific Templates
import CVAdvancedPDF from '../components/templates/cv-templates/cv-methods/CVAdvancedPDF';
import CVIntermediatePDF from '../components/templates/cv-templates/cv-methods/CVIntermediatePDF';
import CVMinimalPDF from '../components/templates/cv-templates/cv-methods/CVMinimalPDF';
import CVModernPDF from '../components/templates/cv-templates/cv-methods/CVModernPDF';
import CVTraditionalPDF from '../components/templates/cv-templates/cv-methods/CVTraditionalPDF';
import CVCreativePDF from '../components/templates/cv-templates/cv-methods/CVCreativePDF';

export interface DocumentTemplate {
  id: string;
  label: string;
  desc: string;
}

// Define the structure for a registered document
export interface DocumentManifest {
  type: DocumentType;
  label: string;
  pdfComponent: React.ComponentType<{ data: any, settings?: any }>;
  defaultTitle: string;
  templates: DocumentTemplate[];
}

// The Central Registry
export const DOCUMENT_REGISTRY: Record<DocumentType, DocumentManifest> = {
  CV: {
    type: 'CV',
    label: 'Curriculum Vitae',
    pdfComponent: CVPDFTemplate,
    defaultTitle: 'My_Professional_CV',
    templates: [
      { id: 'standard', label: 'Executive Professional', desc: 'Classic corporate layout for seasoned leaders.' },
      { id: 'modern', label: 'Modern Creative', desc: 'Clean, contemporary design for tech & creative roles.' },
      { id: 'compact', label: 'Technical Efficient', desc: 'Dense layout optimized for multiple pages of experience.' },
      { id: 'elegant', label: 'Elegant Academic', desc: 'Sophisticated layout with refined typography and spacing.' }
    ]
  },
  INVOICE: {
    type: 'INVOICE',
    label: 'Tax Invoice',
    pdfComponent: InvoicePDFTemplate,
    defaultTitle: 'Invoice_Export',
    templates: [
      { id: 'standard', label: 'Standard Corporate', desc: 'Official tax-compliant corporate invoice.' },
      { id: 'modern', label: 'Modern Digital', desc: 'Stylish digital-first receipt and invoice.' },
      { id: 'compact', label: 'Mini Receipt', desc: 'Space-saving layout for quick transactions.' },
      { id: 'elegant', label: 'Elegant Premium', desc: 'Minimalist high-end invoice for premium services.' }
    ]
  },
  LETTER: {
    type: 'LETTER',
    label: 'Official Letter',
    pdfComponent: LetterPDFTemplate,
    defaultTitle: 'Cover_Letter',
    templates: [
      { id: 'standard', label: 'Formal Business', desc: 'Strict professional format for official use.' },
      { id: 'modern', label: 'Modern Personal', desc: 'Casual yet professional personal correspondence.' },
      { id: 'compact', label: 'Brief Note', desc: 'Concise layout for short official notices.' },
      { id: 'elegant', label: 'Elegant Prestige', desc: 'Sophisticated formal correspondence for high-stakes letters.' }
    ]
  },
  PROFORMA: {
    type: 'PROFORMA',
    label: 'Proforma Invoice',
    pdfComponent: InvoicePDFTemplate,
    defaultTitle: 'Proforma_Invoice',
    templates: [
      { id: 'standard', label: 'Standard Proforma', desc: 'Standard pre-payment billing layout.' },
      { id: 'modern', label: 'Modern Quote', desc: 'Visual-heavy estimate for modern services.' },
      { id: 'compact', label: 'Simple Estimate', desc: 'Quick cost estimation layout.' },
      { id: 'elegant', label: 'Elegant Proposal', desc: 'Premium-grade proforma for high-value bids.' }
    ]
  },
  QUOTATION: {
    type: 'QUOTATION',
    label: 'Service Quotation',
    pdfComponent: InvoicePDFTemplate,
    defaultTitle: 'Quotation',
    templates: [
      { id: 'standard', label: 'Professional Bid', desc: 'Detailed service proposal layout.' },
      { id: 'modern', label: 'Sleek Offer', desc: 'Contemporary minimalist quotation.' },
      { id: 'compact', label: 'Brief Quote', desc: 'Fast, compact service estimate.' },
      { id: 'elegant', label: 'Elegant Quote', desc: 'Sophisticated minimalist quotation for elite clients.' }
    ]
  },
  AFFIDAVIT: {
    type: 'AFFIDAVIT',
    label: 'Legal Affidavit',
    pdfComponent: AffidavitPDFTemplate,
    defaultTitle: 'Affidavit_Document',
    templates: [
      { id: 'standard', label: 'Legal Standard', desc: 'Industry-standard legal declaration format.' },
      { id: 'modern', label: 'Structured Affidavit', desc: 'Modern organized legal document.' },
      { id: 'compact', label: 'Dense Statement', desc: 'Optimized for long lists of statements.' },
      { id: 'elegant', label: 'Elegant Justice', desc: 'Sophisticated legal layout with classical formal styling.' }
    ]
  },
  CONTRACT: {
    type: 'CONTRACT',
    label: 'Service Contract',
    pdfComponent: LetterPDFTemplate,
    defaultTitle: 'Service_Agreement',
    templates: [
      { id: 'standard', label: 'Formal Agreement', desc: 'Comprehensive legal service contract.' },
      { id: 'modern', label: 'Modern Service Terms', desc: 'User-friendly modern contract terms.' },
      { id: 'compact', label: 'Summary Terms', desc: 'One-page summary agreement.' },
      { id: 'elegant', label: 'Elegant Agreement', desc: 'High-end contract layout with refined aesthetic borders.' }
    ]
  },
  EVENT_PROGRAM: {
    type: 'EVENT_PROGRAM',
    label: 'Event Program',
    pdfComponent: EventProgramPDFTemplate,
    defaultTitle: 'Program_Schedule',
    templates: [
      { id: 'standard', label: 'Ceremonial Classic', desc: 'Traditional formal event schedule.' },
      { id: 'modern', label: 'Sleek Timeline', desc: 'Modern interactive-style timeline.' },
      { id: 'compact', label: 'Pocket Guide', desc: 'Small, efficient schedule overview.' },
      { id: 'elegant', label: 'Elegant Gala', desc: 'Artistic centered layout for premium events.' }
    ]
  }
};

export const CV_STYLES_REGISTRY: Record<string, React.ComponentType<any>> = {
  Basic: CVTraditionalPDF,
  Modern: CVModernPDF,
  Intermediate: CVIntermediatePDF,
  Advanced: CVAdvancedPDF,
  Minimalist: CVMinimalPDF,
  Creative: CVCreativePDF,
};
