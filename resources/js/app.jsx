import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes/Router';
import { AuthProvider } from './Contexts/AuthContex';

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
