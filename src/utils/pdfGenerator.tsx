import i18n from "../i18n";
import { DOCUMENT_REGISTRY } from "../documents/registry";
import type { DocumentType } from "../documents/types";

export const generateClientPDF = async (docType: DocumentType, data: any, title?: string, settings?: any) => {
  const { pdf } = await import("@react-pdf/renderer");
  const manifest = DOCUMENT_REGISTRY[docType];

  if (!manifest) {
    throw new Error(`Document type "${docType}" is not registered in the Factory.`);
  }

  const { pdfComponent: PDFTemplate, defaultTitle } = manifest;
  const fileName = title || defaultTitle;

  // Inject current language into settings if not present
  const currentLang = settings?.lang || i18n.language || 'en';
  const updatedSettings = { ...settings, lang: currentLang };

  const element = <PDFTemplate data={data} settings={updatedSettings} />;

  // Wait a small moment for any pending state updates to flush
  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    const blob = await pdf(element).toBlob();
    if (!blob || blob.size === 0) {
      throw new Error("Generated PDF blob is empty.");
    }
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName.replace(/\s+/g, '_')}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    // Increased timeout to ensure browser has finished downloading before revocation
    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
  } catch (err) {
    console.error("Factory Error: PDF Assembly Failed", err);
    throw err;
  }
};

