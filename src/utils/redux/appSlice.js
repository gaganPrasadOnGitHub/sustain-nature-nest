import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  isNightMode: null,
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
    setIsCreditMenuVisible: (state, action) => {
      state.isCreditMenuVisible = action.payload;
      if (action.payload) {
        state.isCategoryMenuVisible = false;
        state.isLanguageMenuVisible = false;
        state.isTextSearchOptionsVisible = false;
        state.isImageSearchMenuVisible = false;
      }
    },
    setIsCategoryMenuVisible: (state, action) => {
      state.isCategoryMenuVisible = action.payload;
      if (action.payload) {
        state.isCreditMenuVisible = false;
        state.isLanguageMenuVisible = false;
        state.isTextSearchOptionsVisible = false;
        state.isImageSearchMenuVisible = false;
      }
    },
    setIsLanguageMenuVisible: (state, action) => {
      state.isLanguageMenuVisible = action.payload;
      if (action.payload) {
        state.isCreditMenuVisible = false;
        state.isCategoryMenuVisible = false;
        state.isTextSearchOptionsVisible = false;
        state.isImageSearchMenuVisible = false;
      }
    },
    setIsTextSearchOptionsVisible: (state, action) => {
      state.isTextSearchOptionsVisible = action.payload;
      if (action.payload) {
        state.isCreditMenuVisible = false;
        state.isCategoryMenuVisible = false;
        state.isLanguageMenuVisible = false;
        state.isImageSearchMenuVisible = false;
      }
    },
    setIsImageSearchMenuVisible: (state, action) => {
      state.isImageSearchMenuVisible = action.payload;
      if (action.payload) {
        state.isCreditMenuVisible = false;
        state.isCategoryMenuVisible = false;
        state.isLanguageMenuVisible = false;
        state.isTextSearchOptionsVisible = false;
      }
    },
  },
});

export const {
  setLanguage,
  setNightMode,
  setIsCreditMenuVisible,
  setIsCategoryMenuVisible,
  setIsLanguageMenuVisible,
  setIsTextSearchOptionsVisible,
  setIsImageSearchMenuVisible,
} = appSlice.actions;

export default appSlice.reducer;
