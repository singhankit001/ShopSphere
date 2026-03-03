import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/common/ErrorBoundary';

axios.defaults.timeout = 10000; // 10s timeout

axios.interceptors.request.use((config) => {
  try {
    const rawUser = localStorage.getItem('user');
    if (rawUser && rawUser !== 'undefined') {
      const user = JSON.parse(rawUser);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (err) {
    console.error("Auth Interceptor Error:", err);
    localStorage.removeItem('user');
  }
  
  if (config.url && config.url.startsWith('http://localhost:5001/api')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    config.url = config.url.replace('http://localhost:5001/api', baseUrl);
  }
  return config;
});

import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"; // User will replace this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
          <Toaster />
        </Provider>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  </StrictMode>,
)
