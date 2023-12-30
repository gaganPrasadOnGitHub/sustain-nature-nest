import {createSlice} from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    searchResult: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {setSearchTerm, setSearchResult, setLoading, setError} =
  searchSlice.actions;

export default searchSlice.reducer;
