import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './index.css'
import App from './App.jsx'

axios.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith('http://localhost:5001/api')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    config.url = config.url.replace('http://localhost:5001/api', baseUrl);
  }
  return config;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </StrictMode>,
)
