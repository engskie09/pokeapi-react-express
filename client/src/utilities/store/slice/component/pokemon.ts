import { createSlice } from '@reduxjs/toolkit';

import { Favorite } from '../../model/favorite';
import { pokemonAPI } from '../api';

interface PokemonState {
    pokemon: any;
    pokemons: any[];
    count: number;
    favorites: Favorite[];
    isFetching: boolean;
    isFetchingList: boolean;
    isFetchingFavorites: boolean;
}

const initialState: PokemonState = {
    pokemon: undefined,
    pokemons: [],
    count: 0,
    favorites: [],
    isFetching: false,
    isFetchingList: false,
    isFetchingFavorites: false,
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

        builder.addMatcher(pokemonAPI.endpoints.favorites.matchPending, (state) => {
            state.isFetchingFavorites = true;
        });

        builder.addMatcher(pokemonAPI.endpoints.favorites.matchFulfilled, (state, action) => {
            state.favorites = action.payload;
            state.isFetchingFavorites = false;
        });
    },
});
