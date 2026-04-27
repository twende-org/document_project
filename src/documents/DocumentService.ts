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

  async polish(content: string, docType: string) {
    const response = await axiosClient.post(`/api/ai/polish/`, {
      data: content,
      type: docType
    });
    return response.data;
  }
};


