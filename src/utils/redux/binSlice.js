import {createSlice} from '@reduxjs/toolkit';

export const binSlice = createSlice({
  name: 'bin',
  initialState: {
    selectedBinId: null,
    selectedBin: {},
  },
  reducers: {
    setSelectedBinId: (state, action) => {
      state.selectedBinId = action.payload;
    },
    setSelectedBin: (state, action) => {
      state.selectedBin = action.payload;
    },
  },
});

export const {setSelectedBinId, setSelectedBin} = binSlice.actions;

export default binSlice.reducer;
