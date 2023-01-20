import { createSlice } from '@reduxjs/toolkit';

import { Trainer } from '../../model/trainer';
import { trainerAPI } from '../api';

interface SessionState {
    token: string;
    trainer?: Trainer;
    isAuthenticated: boolean;
}

const initialState: SessionState = {
    token: '',
    trainer: undefined,
    isAuthenticated: false,
};

export const sessionComponent = createSlice({
    name: 'sessionComponent',
    initialState,
    reducers: {
        checkToken: (state) => {
            const token = localStorage.getItem('token');

            if (token !== '' || token !== null) {
                state.token = token ?? '';
            } else {
                state.token = '';
                state.isAuthenticated = false;
            }
        },
        logout: (state) => {
            state.token = '';
            state.trainer = undefined;
            state.isAuthenticated = false;

            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(trainerAPI.endpoints.login.matchFulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.token = action.payload.token;
            state.isAuthenticated = true;
        });
    },
});
