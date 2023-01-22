import { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch, pokemonAPI } from '../utilities/store';
import { Favorite } from '../utilities/store/model/favorite';

export const useFavorites = () => {
    const [isFetchingInfo, setIsFetchingInfo] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    const favoritesState = useAppSelector((state) => state.pokemonComponent.favorites);

    useEffect(() => {
        if (favoritesState.length > 0) {
            setIsFetchingInfo(true);
            console.log(favoritesState);
        }
    }, [favoritesState]);

    return { favorites, isFetchingInfo };
};
