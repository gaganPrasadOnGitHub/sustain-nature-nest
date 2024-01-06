import React from 'react';
import 'animate.css/animate.min.css';
import './index.css';
import './App.css';
import {Provider} from 'react-redux';
import Store from './utils/redux/store';
import Router from './routes/router';

function App() {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
}

export default App;
