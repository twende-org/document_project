import { pdf } from "@react-pdf/renderer";
import i18n from "../i18n";
import { DOCUMENT_REGISTRY } from "../documents/registry";
import type { DocumentType } from "../documents/types";

export const generateClientPDF = async (docType: DocumentType, data: any, title?: string, settings?: any) => {
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

  try {
    const blob = await pdf(element).toBlob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName.replace(/\s+/g, '_')}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Do not revoke immediately as it can cause "Malformed" or "Failed" downloads in some browsers
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
  } catch (err) {
    console.error("Factory Error: PDF Assembly Failed", err);
    throw err;
  }
};

