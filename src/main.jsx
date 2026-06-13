import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // Ensure matching extension lookup references

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);






