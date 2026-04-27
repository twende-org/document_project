// store/uiSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark' | 'professional';
  isSignInModalOpen: boolean;
}

const initialState: UIState = { 
  theme: 'dark',
  isSignInModalOpen: false
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
  },
});

export const { setTheme, openSignInModal, closeSignInModal } = uiSlice.actions;
export default uiSlice.reducer;
