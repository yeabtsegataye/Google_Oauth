import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import {GoogleOAuthProvider} from "@react-oauth/google"
import { AuthContextProvider } from './context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={`317705727663-pgbjpe7a38k1a17f71qf8728ik3pjie2.apps.googleusercontent.com`}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

