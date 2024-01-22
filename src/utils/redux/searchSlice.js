import {createSlice} from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    isLoading: false,
    aiSearchResult: null,
    error: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setAiSearchResult: (state, action) => {
      state.aiSearchResult = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setSelectedImage,
  setEnteredImageUrl,
  setAiSearchResult,
  setLoading,
  setError,
} = searchSlice.actions;

export default searchSlice.reducer;
