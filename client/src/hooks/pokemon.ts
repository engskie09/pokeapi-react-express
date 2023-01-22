import { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch, pokemonAPI } from '../utilities/store';

export const usePokemon = () => {
    const params = useParams();

    const [isFetchingInfo, setIsFetchingInfo] = useState<boolean>(true);
    const [pokemon, setPokemon] = useState<any>();
    const [types, setTypes] = useState<any[]>([]);
    const [moves, setMoves] = useState<any[]>([]);

    pokemonAPI.usePokemonQuery({ name: params.name ?? '' });

    const pokemonState: any = useAppSelector((state) => state.pokemonComponent.pokemon);

    useEffect(() => {
        setIsFetchingInfo(true);

        (async () => {
            if (pokemonState) {
                const info = await axios.get(pokemonState.url);

                setPokemon({ ...pokemonState, info });
                setIsFetchingInfo(false);
            }
        })();
    }, [pokemonState]);

    useEffect(() => {
        if (pokemon) {
            const { moves: dataMove, types: dataTypes } = pokemon ? pokemon.info.data : { moves: [], types: [] };

            (async () => {
                const movesTemp: any[] = await Promise.all(
                    dataMove.map(async (move: any) => {
                        const info = await axios.get(move.move.url);

                        return { ...move, info };
                    }) as never[],
                );
                setMoves(movesTemp);
            })();

            setTypes(dataTypes);
        }
    }, [pokemon]);

    return { pokemon, types, moves, isFetchingInfo };
};
