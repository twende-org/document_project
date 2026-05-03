import { useState, useCallback } from 'react';
import { DocumentService } from '../DocumentService';
import type { DocumentType, DocumentBase } from '../types';
import { generateClientPDF } from '../../utils/pdfGenerator';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { startFactory, stopFactory } from '../../store/uiSlice';

export function useDocumentEngine<T>(
  initialData: T, 
  docType: DocumentType, 
  mapping?: Record<string, string>,
  computedFields?: (data: T) => any
) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState<T>(initialData);
  const [settings, setSettings] = useState<DocumentBase['settings']>({
    theme: { primaryColor: '#B91C1C' }, // Default system color
    layout: 'standard'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPayload = () => {
    let payload: any = { ...formData };
    
    // Apply computed fields first (e.g. totals)
    if (computedFields) {
      payload = { ...payload, ...computedFields(formData) };
    }

    // Apply mapping transformations
    if (mapping) {
      Object.entries(mapping).forEach(([backendKey, frontendKey]) => {
        if (frontendKey in payload) {
          payload[backendKey] = payload[frontendKey];
          // Delete the original camelCase key if it differs from the backend key
          if (backendKey !== frontendKey) {
            delete payload[frontendKey];
          }
        }
      });
    }
    return payload;
  };

  const updateField = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsValidated(false); 
  }, []);

  const handleSave = async (title: string, status: 'DRAFT' | 'FINAL' = 'DRAFT') => {
    setIsSaving(true);
    setError(null);
    const payload = getPayload();
    try {
      await DocumentService.validate(docType as any, payload);
      const doc: DocumentBase = {
        title,
        doc_type: docType as any,
        status,
        content: payload,
        settings: settings
      };
      const savedDoc = await DocumentService.save(doc);
      setIsValidated(true);
      
      if (status === 'FINAL') {
          dispatch(startFactory("Finalizing and generating PDF..."));
          try {
            await generateClientPDF(docType, formData, title, settings);
          } finally {
            dispatch(stopFactory());
          }
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
      const result = await DocumentService.polish(content, docType, i18n.language);
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
    settings,
    setSettings,
    updateField,
    handleSave,
    handlePolish,
    handleDownload: async (title: string) => {
        dispatch(startFactory("Manufacturing your PDF..."));
        try {
          await generateClientPDF(docType, formData, title, settings);
        } finally {
          dispatch(stopFactory());
        }
    },
    isSaving,
    isPolishing,
    isValidated,
    error
  };
}

