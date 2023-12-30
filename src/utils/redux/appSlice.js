import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  isNightMode: false,
  isMenuVisible: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setNightMode: (state, action) => {
      state.isNightMode = action.payload;
    },
    toggleNightMode: (state) => {
      state.isNightMode = !state.isNightMode;
    },
    setMenuVisibility: (state, action) => {
      state.isMenuVisible = action.payload;
    },
    toggleMenuVisibility: (state) => {
      state.isMenuVisible = !state.isMenuVisible;
    },
  },
});

export const {
  setLanguage,
  setNightMode,
  toggleNightMode,
  setMenuVisibility,
  toggleMenuVisibility,
} = appSlice.actions;

export default appSlice.reducer;
