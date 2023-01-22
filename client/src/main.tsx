import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Login } from './components/login';
import { Register } from './components/register';
import { Pokemon } from './components/pokemon';
import { Pokemons } from './components/pokemons';
import { Favorites } from './components/favorites';

import { store } from './utilities/store';
import { Session } from './components/session';

const Main = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Session />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pokemon/:name" element={<Pokemon />} />
                <Route path="/pokemons" element={<Pokemons />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<span>Not Found</span>} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
);
