import axiosClient from "../axiosClient";
import { DOCUMENTS_ENDPOINTS } from "../endpoints";

export const getDocuments = (type?: string) => {
    const url = type ? `${DOCUMENTS_ENDPOINTS.list}?doc_type=${type}` : DOCUMENTS_ENDPOINTS.list;
    return axiosClient.get(url);
};

export const getDocument = (id: number) => axiosClient.get(DOCUMENTS_ENDPOINTS.detail(id));

export const createDocument = (data: { doc_type: string, title: string, content: any }) => 
    axiosClient.post(DOCUMENTS_ENDPOINTS.list, data);

export const updateDocument = (id: number, data: any) => 
    axiosClient.put(DOCUMENTS_ENDPOINTS.detail(id), data);

export const deleteDocument = (id: number) => 
    axiosClient.delete(DOCUMENTS_ENDPOINTS.detail(id));

export const polishDocument = (id: number, lang: string = 'en') => 
    axiosClient.post(DOCUMENTS_ENDPOINTS.polish(id), { language: lang });

export const downloadDocumentPdf = (id: number) => 
    axiosClient.get(DOCUMENTS_ENDPOINTS.download(id), { responseType: 'blob' });
