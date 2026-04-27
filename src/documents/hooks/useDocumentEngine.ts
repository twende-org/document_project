import { useState, useCallback } from 'react';
import { DocumentService } from '../DocumentService';
import type { DocumentType, DocumentBase } from '../types';

export function useDocumentEngine<T>(initialData: T, docType: DocumentType) {
  const [formData, setFormData] = useState<T>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsValidated(false); 
  }, []);

  const handleSave = async (title: string, status: 'DRAFT' | 'FINAL' = 'DRAFT') => {
    setIsSaving(true);
    setError(null);
    try {
      await DocumentService.validate(docType as any, formData);
      const doc: DocumentBase = {
        title,
        doc_type: docType as any,
        status,
        content: formData
      };
      const savedDoc = await DocumentService.save(doc);
      setIsValidated(true);
      
      if (status === 'FINAL' && savedDoc.id) {
          await DocumentService.downloadPDF(savedDoc.id);
      }
      
      return savedDoc;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to save document';
      setError(msg);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handlePolish = async (content: string) => {
    setIsPolishing(true);
    try {
      const result = await DocumentService.polish(content, docType);
      return result.polished_content;
    } catch (err: any) {
      setError('AI Polishing failed. Returning original content.');
      throw err;
    } finally {
      setIsPolishing(false);
    }
  };

  return {
    formData,
    setFormData,
    updateField,
    handleSave,
    handlePolish,
    handleDownload: async (id: number) => {
        await DocumentService.downloadPDF(id);
    },
    isSaving,
    isPolishing,
    isValidated,
    error
  };
}
