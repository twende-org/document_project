import { pdf } from "@react-pdf/renderer";
import { DOCUMENT_REGISTRY } from "../documents/registry";
import type { DocumentType } from "../documents/types";

export const generateClientPDF = async (docType: DocumentType, data: any, title?: string) => {
  const manifest = DOCUMENT_REGISTRY[docType];

  if (!manifest) {
    throw new Error(`Document type "${docType}" is not registered in the Factory.`);
  }

  const { pdfComponent: PDFTemplate, defaultTitle } = manifest;
  const fileName = title || defaultTitle;

  const element = <PDFTemplate data={data} />;

  try {
    const blob = await pdf(element).toBlob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName.replace(/\s+/g, '_')}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Factory Error: PDF Assembly Failed", err);
    throw err;
  }
};

