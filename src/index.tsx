import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const injectFont = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  
  const style = document.createElement('style');
  style.innerHTML = `* { font-family: 'Poppins', sans-serif !important; }`;
  document.head.appendChild(style);
};

injectFont(); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
