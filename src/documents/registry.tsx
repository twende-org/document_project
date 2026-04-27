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

// Define the structure for a registered document
export interface DocumentManifest {
  type: DocumentType;
  label: string;
  pdfComponent: React.ComponentType<{ data: any }>;
  defaultTitle: string;
}

// The Central Registry
export const DOCUMENT_REGISTRY: Record<DocumentType, DocumentManifest> = {
  CV: {
    type: 'CV',
    label: 'Curriculum Vitae',
    pdfComponent: CVPDFTemplate,
    defaultTitle: 'My_Professional_CV',
  },
  INVOICE: {
    type: 'INVOICE',
    label: 'Tax Invoice',
    pdfComponent: InvoicePDFTemplate,
    defaultTitle: 'Invoice_Export',
  },
  LETTER: {
    type: 'LETTER',
    label: 'Official Letter',
    pdfComponent: LetterPDFTemplate,
    defaultTitle: 'Cover_Letter',
  },
  // Adding new types is now as simple as adding a key here!
  PROFORMA: {
    type: 'PROFORMA',
    label: 'Proforma Invoice',
    pdfComponent: InvoicePDFTemplate, // Reuse invoice template
    defaultTitle: 'Proforma_Invoice',
  },
  QUOTATION: {
    type: 'QUOTATION',
    label: 'Service Quotation',
    pdfComponent: InvoicePDFTemplate,
    defaultTitle: 'Quotation',
  },
  AFFIDAVIT: {
    type: 'AFFIDAVIT',
    label: 'Legal Affidavit',
    pdfComponent: AffidavitPDFTemplate,
    defaultTitle: 'Affidavit_Document',
  },
  CONTRACT: {
    type: 'CONTRACT',
    label: 'Service Contract',
    pdfComponent: LetterPDFTemplate,
    defaultTitle: 'Service_Agreement',
  },
  EVENT_PROGRAM: {
    type: 'EVENT_PROGRAM',
    label: 'Event Program',
    pdfComponent: EventProgramPDFTemplate,
    defaultTitle: 'Program_Schedule',
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
