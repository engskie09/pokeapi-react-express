import { useState, useEffect } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useParams, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch, pokemonAPI } from '../utilities/store';

const swal = withReactContent(Swal);

export const usePokemon = () => {
    const params = useParams();

    const [isFetchingInfo, setIsFetchingInfo] = useState<boolean>(true);
    const [pokemon, setPokemon] = useState<any>();
    const [types, setTypes] = useState<any[]>([]);
    const [moves, setMoves] = useState<any[]>([]);

    pokemonAPI.usePokemonQuery({ name: params.name ?? '' });

    const [addFavorite] = pokemonAPI.useAddFavoriteMutation();
    const [deleteFavorite] = pokemonAPI.useDeleteFavoriteMutation();

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

    const handleOnAddFavorite = () => {

        addFavorite({ pokemon: pokemon.name, url: pokemon.url }).then((response) => {
            if ('data' in response) {
                swal.fire((response.data as any).message, '', 'success');
            } else if ('error' in response && 'status' in response.error) {
                swal.fire('Try Again', '', 'error');
            }
        });
    };

    const handleOnDeleteFavorite = () => {
        deleteFavorite({ pokemon: pokemon.name }).then((response) => {
            if ('data' in response) {
                swal.fire((response.data as any).message, '', 'success');
            } else if ('error' in response && 'status' in response.error) {
                swal.fire('Try Again', '', 'error');
            }
        });
    };

    return { pokemon, types, moves, isFetchingInfo, handleOnAddFavorite, handleOnDeleteFavorite };
};
