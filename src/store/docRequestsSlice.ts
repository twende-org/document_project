import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface DocRequest {
  id: number;
  user: number;
  user_email: string;
  user_name: string;
  doc_name: string;
  description: string;
  status: string;
  created_at: string;
}

interface DocRequestsState {
  requests: DocRequest[];
  loading: boolean;
  updatingId: number | null;
  error: string | null;
}

const initialState: DocRequestsState = {
  requests: [],
  loading: false,
  updatingId: null,
  error: null,
};

export const fetchDocRequests = createAsyncThunk(
  'docRequests/fetchDocRequests',
  async (_, { getState }) => {
    const { auth } = getState() as { auth: { access: string } };
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_BASE_URL}/api/requests/`,
      {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      }
    );
    return response.data;
  }
);

export const updateRequestStatus = createAsyncThunk(
    'docRequests/updateRequestStatus',
    async ({ id, status }: { id: number, status: string }, { getState }) => {
      const { auth } = getState() as { auth: { access: string } };
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/requests/${id}/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      );
      return response.data;
    }
  );

const docRequestsSlice = createSlice({
  name: 'docRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchDocRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch requests';
      })
      .addCase(updateRequestStatus.pending, (state, action) => {
        state.updatingId = action.meta.arg.id;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.updatingId = null;
        const index = state.requests.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(updateRequestStatus.rejected, (state) => {
        state.updatingId = null;
      });
  },
});

export default docRequestsSlice.reducer;
