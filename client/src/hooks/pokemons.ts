import { useEffect, useState } from 'react';
import axios from 'axios';

import { pokemonAPI } from '../utilities/store/slice/api';

import { useAppSelector, useAppDispatch, pokemonComponent } from '../utilities/store';

export const usePokemons = () => {
    const [pokemons, setPokemons] = useState<never[]>([]);
    const dispatch = useAppDispatch();

    pokemonAPI.usePokemonsQuery({ offset: 0, limit: 20 });

    const pokemonsState: any[] = useAppSelector((state) => state.pokemonComponent.pokemons);
    const countState: number = useAppSelector((state) => state.pokemonComponent.count);

    useEffect(() => {
        (async () => {
            if (pokemonsState.length > 0) {
                const pokemonsTemp: never[] = await Promise.all(
                    pokemonsState.map(async (pokemon: any) => {
                        const info = await axios.get(pokemon.url);

                        return { ...pokemon, info };
                    }) as never[],
                );

                setPokemons(pokemonsTemp);
            }
        })();
    }, [pokemonsState]);

    return { pokemons, count: countState };
};
