import axiosClient from '../api/axiosClient';
import type { DocumentBase, DocumentType } from './types';

export const DocumentService = {
  async validate(docType: DocumentType, content: any) {
    const response = await axiosClient.post(`/api/documents/validate/`, {
      doc_type: docType,
      content: content
    });
    return response.data;
  },

  async getPublicDocument(id: string) {
    // Note: This uses a public endpoint that doesn't require tokens
    const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/documents/${id}/public/`);
    if (!response.ok) throw new Error("Document not found");
    return response.json();
  },

  async save(document: DocumentBase) {
    const method = document.id ? 'put' : 'post';
    const url = document.id 
      ? `/api/documents/${document.id}/` 
      : `/api/documents/`;
    
    const response = await axiosClient({
      method,
      url,
      data: document
    });
    return response.data;
  },

  async downloadPDF(id: number | string) {
    const response = await axiosClient.get('/api/documents/' + id + '/download_pdf/', {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'document_' + id + '.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  async polish(content: string, docType: string, lang: string = 'en') {
    const response = await axiosClient.post(`/api/ai/polish/`, {
      data: content,
      type: docType,
      language: lang
    });
    return response.data;
  },

  async generateLetter(data: any) {
    const response = await axiosClient.post(`/api/generate-letter/`, data);
    return response.data;
  }
};
