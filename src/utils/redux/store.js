import appSlice from './appSlice';
import binReducer from './binSlice';
import searchReducer from './searchSlice';
import {configureStore} from '@reduxjs/toolkit';

const Store = configureStore({
  reducer: {
    appData: appSlice,
    bin: binReducer,
    search: searchReducer,
  },
});

export default Store;
