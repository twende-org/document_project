// store/uiSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark' | 'professional';
  isSignInModalOpen: boolean;
  factoryLoading: {
    isLoading: boolean;
    message?: string;
  };
}

const initialState: UIState = { 
  theme: 'dark',
  isSignInModalOpen: false,
  factoryLoading: {
    isLoading: false
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark' | 'professional'>) {
      state.theme = action.payload;
    },
    openSignInModal(state) {
      state.isSignInModalOpen = true;
    },
    closeSignInModal(state) {
      state.isSignInModalOpen = false;
    },
    startFactory(state, action: PayloadAction<string | undefined>) {
      state.factoryLoading = {
        isLoading: true,
        message: action.payload
      };
    },
    stopFactory(state) {
      state.factoryLoading.isLoading = false;
    }
  },
});

export const { setTheme, openSignInModal, closeSignInModal, startFactory, stopFactory } = uiSlice.actions;
export default uiSlice.reducer;

