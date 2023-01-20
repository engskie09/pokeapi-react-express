import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './components/login';

const Main = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
);
