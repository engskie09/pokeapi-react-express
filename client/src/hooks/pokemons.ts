import { useEffect, useState } from 'react';
import axios from 'axios';

import { useAppSelector, useAppDispatch, pokemonAPI } from '../utilities/store';

interface UsePokemonsProps {
    name: string;
    pageNumber: number;
}

export const usePokemons = (props: UsePokemonsProps) => {
    const { name, pageNumber } = props;

    const [isFetchingInfo, setIsFetchingInfo] = useState<boolean>(true);

    const [pokemons, setPokemons] = useState<never[]>([]);
    const dispatch = useAppDispatch();

    const { refetch } = pokemonAPI.usePokemonsQuery({ pageSize: 20, pageNumber, name });

    console.log(pageNumber);

    const pokemonsState: any[] = useAppSelector((state) => state.pokemonComponent.pokemons);
    const count: number = useAppSelector((state) => state.pokemonComponent.count);
    const isFetching: boolean = useAppSelector((state) => state.pokemonComponent.isFetching);

    useEffect(() => {
        setIsFetchingInfo(true);

        (async () => {
            if (pokemonsState.length > 0) {
                const pokemonsTemp: never[] = await Promise.all(
                    pokemonsState.map(async (pokemon: any) => {
                        const info = await axios.get(pokemon.url);

                        return { ...pokemon, info };
                    }) as never[],
                );

                setPokemons(pokemonsTemp);
                setIsFetchingInfo(false);
            }
        })();
    }, [pokemonsState]);

    useEffect(() => {
        refetch();
    }, [pageNumber, name]);

    return { pokemons, count, isFetching, isFetchingInfo };
};
