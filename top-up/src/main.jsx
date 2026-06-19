// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css'  // ← WAJIB, karena CoreUI pakai Bootstrap
import '@coreui/coreui/dist/css/coreui.min.css' // ← WAJIB untuk CoreUI
import '@coreui/icons/css/all.min.css' 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import store from './admin/Store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <HelmetProvider>
      <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
