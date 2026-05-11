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
      { id: 'modern', label: 'Modern Professional', desc: 'Sleek contemporary design.' },
      { id: 'ats', label: 'ATS Optimized', desc: 'Maximum parser compatibility.' },
      { id: 'executive', label: 'Executive', desc: 'Senior leadership layout.' },
      { id: 'minimal', label: 'Minimalist', desc: 'Clean and airy spacing.' },
      { id: 'creative', label: 'Creative', desc: 'Visual-heavy portfolio style.' },
      { id: 'student', label: 'Student/Intern', desc: 'Education-focused layout.' },
      { id: 'academic', label: 'Academic', desc: 'Research and publication focus.' },
      { id: 'corporate', label: 'Corporate', desc: 'Traditional formal design.' },
      { id: 'technical', label: 'Technical', desc: 'Skills and project intensive.' },
      { id: 'international', label: 'International', desc: 'Global standard formatting.' }
    ]
  },
  INVOICE: {
    type: 'INVOICE',
    label: 'Tax Invoice',
    pdfComponent: InvoicePDFTemplate,
    defaultTitle: 'Invoice_Export',
    templates: [
      { id: 'standard', label: 'invoice.templates.standard.label', desc: 'invoice.templates.standard.desc' },
      { id: 'modern', label: 'invoice.templates.modern.label', desc: 'invoice.templates.modern.desc' },
      { id: 'compact', label: 'invoice.templates.compact.label', desc: 'invoice.templates.compact.desc' },
      { id: 'elegant', label: 'invoice.templates.elegant.label', desc: 'invoice.templates.elegant.desc' }
    ]
  },
  LETTER: {
    type: 'LETTER',
    label: 'Official Letter',
    pdfComponent: LetterPDFTemplate,
    defaultTitle: 'Cover_Letter',
    templates: [
      { id: 'standard', label: 'letter.templates.standard.label', desc: 'letter.templates.standard.desc' },
      { id: 'modern', label: 'letter.templates.modern.label', desc: 'letter.templates.modern.desc' },
      { id: 'compact', label: 'letter.templates.compact.label', desc: 'letter.templates.compact.desc' },
      { id: 'elegant', label: 'letter.templates.elegant.label', desc: 'letter.templates.elegant.desc' },
      { id: 'certificate', label: 'letter.templates.certificate.label', desc: 'letter.templates.certificate.desc' }
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
      { id: 'standard', label: 'affidavit.templates.standard.label', desc: 'affidavit.templates.standard.desc' },
      { id: 'modern', label: 'affidavit.templates.modern.label', desc: 'affidavit.templates.modern.desc' },
      { id: 'compact', label: 'affidavit.templates.compact.label', desc: 'affidavit.templates.compact.desc' },
      { id: 'elegant', label: 'affidavit.templates.elegant.label', desc: 'affidavit.templates.elegant.desc' }
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
      { id: 'standard', label: 'event.templates.standard.label', desc: 'event.templates.standard.desc' },
      { id: 'modern', label: 'event.templates.modern.label', desc: 'event.templates.modern.desc' },
      { id: 'compact', label: 'event.templates.compact.label', desc: 'event.templates.compact.desc' },
      { id: 'elegant', label: 'event.templates.elegant.label', desc: 'event.templates.elegant.desc' }
    ]
  }
};

export const CV_STYLES_REGISTRY: Record<string, React.ComponentType<any>> = {
  "Modern Professional": CVPDFTemplate,
  "ATS-Friendly": CVPDFTemplate,
  "Executive": CVPDFTemplate,
  "Minimalist": CVPDFTemplate,
  "Creative Portfolio": CVPDFTemplate,
  "Internship/Student": CVPDFTemplate,
  "Academic CV": CVPDFTemplate,
  "Corporate Standard": CVPDFTemplate,
  "Technical/Engineering": CVPDFTemplate,
  "International": CVPDFTemplate,
};
