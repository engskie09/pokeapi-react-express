import { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch, pokemonAPI } from '../utilities/store';
import { Favorite } from '../utilities/store/model/favorite';

export const useFavorites = () => {
    const [isFetchingInfo, setIsFetchingInfo] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<any[]>([]);

    pokemonAPI.useFavoritesQuery();

    const favoritesState = useAppSelector((state) => state.pokemonComponent.favorites);

    useEffect(() => {
        setIsFetchingInfo(true);

        (async () => {
            if (favoritesState.length > 0) {
                const favoritesTemp: never[] = await Promise.all(
                    favoritesState.map(async (pokemon: any) => {
                        const info = await axios.get(pokemon.url);

                        return { ...pokemon, info };
                    }) as never[],
                );

                setFavorites(favoritesTemp);
                setIsFetchingInfo(false);
            }
        })();
    }, [favoritesState]);

    return { favorites, isFetchingInfo };
};
