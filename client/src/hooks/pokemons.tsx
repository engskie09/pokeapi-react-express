import { pokemonAPI } from '../utilities/store/slice/api';

import { useAppSelector, useAppDispatch, pokemonComponent } from '../utilities/store';

export const usePokemons = () => {
    const dispatch = useAppDispatch();

    pokemonAPI.usePokemonsQuery();

    const pokemons: any[] = useAppSelector((state) => state.pokemonComponent.pokemons);

    console.log(pokemons)
};
