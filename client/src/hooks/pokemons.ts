import { useEffect, useState } from 'react';
import axios from 'axios';

import { pokemonAPI } from '../utilities/store/slice/api';

import { useAppSelector, useAppDispatch, pokemonComponent } from '../utilities/store';

interface UsePokemonsProps {
    offset: number;
}

export const usePokemons = (props: UsePokemonsProps) => {
    const { offset } = props;

    console.log('offset', offset);

    const [pokemons, setPokemons] = useState<never[]>([]);
    const dispatch = useAppDispatch();

    pokemonAPI.usePokemonsQuery({ offset, limit: 20 });

    const pokemonsState: any[] = useAppSelector((state) => state.pokemonComponent.pokemons);
    const count: number = useAppSelector((state) => state.pokemonComponent.count);
    const isFetching: boolean = useAppSelector((state) => state.pokemonComponent.isFetching);

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

    return { pokemons, count, isFetching };
};
