import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  isNightMode: false,
  focusScroll: false,
  isCreditMenuVisible: false,
  isCategoryMenuVisible: false,
  isLanguageMenuVisible: false,
  isTextSearchOptionsVisible: false,
  isImageSearchMenuVisible: false,
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
    setFocusScroll: (state, action) => {
      state.focusScroll = action.payload;
    },
    setIsCreditMenuVisible: (state, action) => {
      state.isCreditMenuVisible = action.payload;
    },
    setIsCategoryMenuVisible: (state, action) => {
      state.isCategoryMenuVisible = action.payload;
    },
    setIsLanguageMenuVisible: (state, action) => {
      state.isLanguageMenuVisible = action.payload;
    },
    setIsTextSearchOptionsVisible: (state, action) => {
      state.isTextSearchOptionsVisible = action.payload;
    },
    setIsImageSearchMenuVisible: (state, action) => {
      state.isImageSearchMenuVisible = action.payload;
    },
  },
});

export const {
  setLanguage,
  setNightMode,
  setFocusScroll,
  setIsCreditMenuVisible,
  setIsCategoryMenuVisible,
  setIsLanguageMenuVisible,
  setIsTextSearchOptionsVisible,
  setIsImageSearchMenuVisible,
} = appSlice.actions;

export default appSlice.reducer;
