import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

const container = document.getElementById('root');
if (!container) throw new Error('Portfolio root element is missing');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter basename={process.env.PUBLIC_URL || "/"}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
