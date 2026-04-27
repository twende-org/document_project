import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { 
    getDocuments, 
    getDocument, 
    createDocument, 
    updateDocument, 
    deleteDocument, 
    polishDocument 
} from '../../api/services/documentsApi';

export interface Document {
    id: number;
    doc_type: string;
    title: string;
    customer_name?: string;
    customer_phone?: string;
    content: any;
    status: string;
    created_at: string;
    updated_at: string;
}

interface DocumentsState {
    list: Document[];
    current: Document | null;
    loading: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DocumentsState = {
    list: [],
    current: null,
    loading: false,
    status: 'idle',
    error: null,
};

// Async Thunks
export const fetchDocuments = createAsyncThunk(
    'documents/fetchAll',
    async (type: string | undefined, { rejectWithValue }) => {
        try {
            const response = await getDocuments(type);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch documents');
        }
    }
);

export const fetchDocumentById = createAsyncThunk(
    'documents/fetchById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await getDocument(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch document');
        }
    }
);

export const saveDocument = createAsyncThunk(
    'documents/save',
    async (payload: { id?: number, doc_type: string, title: string, content: any, customer_name?: string, customer_phone?: string, status?: string }, { rejectWithValue }) => {
        try {
            if (payload.id) {
                const response = await updateDocument(payload.id, payload);
                return response.data;
            } else {
                const response = await createDocument(payload as any);
                return response.data;
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to save document');
        }
    }
);

export const removeDocument = createAsyncThunk(
    'documents/remove',
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteDocument(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to delete document');
        }
    }
);

export const aiPolishDocument = createAsyncThunk(
    'documents/polish',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await polishDocument(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'AI Polishing failed');
        }
    }
);

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        setCurrentDocument(state, action: PayloadAction<Document | null>) {
            state.current = action.payload;
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchDocuments
            .addCase(fetchDocuments.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(fetchDocuments.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchDocuments.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // fetchDocumentById
            .addCase(fetchDocumentById.fulfilled, (state, action) => {
                state.current = action.payload;
            })
            // saveDocument
            .addCase(saveDocument.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveDocument.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
                const index = state.list.findIndex(doc => doc.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                } else {
                    state.list.push(action.payload);
                }
            })
            .addCase(saveDocument.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // removeDocument
            .addCase(removeDocument.fulfilled, (state, action) => {
                state.list = state.list.filter(doc => doc.id !== action.payload);
                if (state.current?.id === action.payload) {
                    state.current = null;
                }
            })
            // aiPolishDocument
            .addCase(aiPolishDocument.pending, (state) => {
                state.loading = true;
            })
            .addCase(aiPolishDocument.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload; // Polished document content
                const index = state.list.findIndex(doc => doc.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(aiPolishDocument.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentDocument, clearError } = documentsSlice.actions;
export default documentsSlice.reducer;
