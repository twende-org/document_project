import { useState, useCallback, useEffect } from 'react';
import { DocumentService } from '../DocumentService';
import type { DocumentType, DocumentBase } from '../types';
import { generateClientPDF } from '../../utils/pdfGenerator';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { startFactory, stopFactory } from '../../store/uiSlice';
import type { RootState } from '../../store/store';

export function useDocumentEngine<T>(
  initialData: T, 
  docType: DocumentType, 
  mapping?: Record<string, string>,
  computedFields?: (data: T) => any,
  initialSettings?: DocumentBase['settings']
) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || 'guest';
  const documentId = (initialData as any)?.id || 'new';
  
  const draftKey = `draft_${docType}_${userId}_${documentId}`;
  
  const [formData, setFormData] = useState<T>(() => {
    // 1. Check for a guest draft that needs migration to the logged-in user
    if (userId !== 'guest') {
      const guestKey = `draft_${docType}_guest_${documentId}`;
      const guestSaved = localStorage.getItem(guestKey);
      if (guestSaved) {
        try {
          const parsed = JSON.parse(guestSaved) as T;
          // Migrate to new user key and remove guest draft
          localStorage.setItem(draftKey, guestSaved);
          localStorage.removeItem(guestKey);
          return parsed;
        } catch (e) {
          console.error("Failed to migrate guest draft", e);
        }
      }
    }

    // 2. Load existing draft for this specific user and document
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try {
        return JSON.parse(saved) as T;
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
    
    // 3. Fallback to server data
    return initialData;
  });
  
  const [settings, setSettings] = useState<DocumentBase['settings']>(initialSettings || {
    theme: { primaryColor: '#B91C1C' }, 
    layout: 'standard'
  });

  useEffect(() => {
    localStorage.setItem(draftKey, JSON.stringify(formData));
  }, [formData, draftKey]);

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
      await DocumentService.validate(docType, payload);
      const doc: DocumentBase = {
        title,
        doc_type: docType,
        status,
        content: payload,
        settings: settings
      };
      const savedDoc = await DocumentService.save(doc);
      setIsValidated(true);
      
      if (status === 'FINAL') {
          // Clear the local draft for this document now that it's finalized to the server
          localStorage.removeItem(draftKey);

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

