import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App';
import { StoreProvider } from './Context/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider>
        <App />
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);
