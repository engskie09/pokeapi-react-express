import { createSlice } from '@reduxjs/toolkit';

import { pokemonAPI } from '../api';

interface PokemonState {
    pokemons: any[];
}

const initialState: PokemonState = {
    pokemons: [],
};

export const pokemonComponent = createSlice({
    name: 'pokemonComponent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(pokemonAPI.endpoints.pokemons.matchFulfilled, (state, action) => {
            state.pokemons = action.payload.results;
        });
    },
});
