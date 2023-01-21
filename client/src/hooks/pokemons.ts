import { useEffect, useState } from 'react';
import axios from 'axios';

import { pokemonAPI } from '../utilities/store/slice/api';

import { useAppSelector, useAppDispatch, pokemonComponent } from '../utilities/store';

export const usePokemons = () => {
    const [pokemons, setPokemons] = useState<never[]>([]);
    const dispatch = useAppDispatch();

    pokemonAPI.usePokemonsQuery();

    const pokemonsPayload: any[] = useAppSelector((state) => state.pokemonComponent.pokemons);

    useEffect(() => {
        (async () => {
            if (pokemonsPayload.length > 0) {
                const pokemonsTemp: never[] = await Promise.all(
                    pokemonsPayload.map(async (pokemon: any) => {
                        const info = await axios.get(pokemon.url);

                        return { ...pokemon, info };
                    }) as never[],
                );

                setPokemons(pokemonsTemp);

                console.log(pokemonsTemp);
            }
        })();
    }, [pokemonsPayload]);

    return { pokemons };
};
