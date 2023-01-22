import { createSlice } from '@reduxjs/toolkit';

import { pokemonAPI } from '../api';

interface PokemonState {
    pokemon: any;
    pokemons: any[];
    count: number;
    isFetching: boolean;
    isFetchingList: boolean;
}

const initialState: PokemonState = {
    pokemon: undefined,
    pokemons: [],
    count: 0,
    isFetching: false,
    isFetchingList: false,
};

export const pokemonComponent = createSlice({
    name: 'pokemonComponent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(pokemonAPI.endpoints.pokemons.matchPending, (state) => {
            state.isFetchingList = true;
        });

        builder.addMatcher(pokemonAPI.endpoints.pokemons.matchFulfilled, (state, action) => {
            state.pokemons = action.payload.results;
            state.count = Math.ceil(action.payload.count / 20);
            state.isFetchingList = false;
        });

        builder.addMatcher(pokemonAPI.endpoints.pokemon.matchPending, (state) => {
            state.isFetching = true;
        });

        builder.addMatcher(pokemonAPI.endpoints.pokemon.matchFulfilled, (state, action) => {
            state.pokemon = action.payload;
            state.isFetching = false;
        });
    },
});
