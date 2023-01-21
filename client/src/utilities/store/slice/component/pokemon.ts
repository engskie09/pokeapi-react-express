import { createSlice } from '@reduxjs/toolkit';

import { pokemonAPI } from '../api';

interface PokemonState {
    pokemons: any[];
    count: number;
    isFetching: boolean;
}

const initialState: PokemonState = {
    pokemons: [],
    count: 0,
    isFetching: false,
};

export const pokemonComponent = createSlice({
    name: 'pokemonComponent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(pokemonAPI.endpoints.pokemons.matchPending, (state) => {
            state.isFetching = true;
        });

        builder.addMatcher(pokemonAPI.endpoints.pokemons.matchFulfilled, (state, action) => {
            state.pokemons = action.payload.results;
            state.count = action.payload.count;
            state.isFetching = false;
        });
    },
});
