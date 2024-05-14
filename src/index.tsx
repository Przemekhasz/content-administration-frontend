import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import i18n from "i18next";

ReactDOM.render(
    <React.StrictMode>
        <Router>
                <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
