import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getDocuments, deleteDocument } from '../api/services/documentsApi';
import type { RootState } from '../store/store';

export function useDocuments(type?: string) {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const access = useSelector((state: RootState) => state.auth.access);

    const fetchDocuments = useCallback(async () => {
        if (!access) return;
        setLoading(true);
        try {
            const response = await getDocuments(type);
            setDocuments(response.data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch documents');
        } finally {
            setLoading(false);
        }
    }, [type]);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    const handleDelete = async (id: number) => {
        try {
            await deleteDocument(id);
            setDocuments(prev => prev.filter(doc => doc.id !== id));
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete document');
            return false;
        }
    };

    return { documents, loading, error, refresh: fetchDocuments, handleDelete };
}
