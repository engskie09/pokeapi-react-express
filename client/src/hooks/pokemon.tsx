import { useParams, useNavigate } from 'react-router-dom';

import { pokemonAPI } from '../utilities/store';

export const usePokemon = () => {
    const params = useParams();

    pokemonAPI.usePokemonQuery({ name: params.name ?? '' });

    return { name: params.name };
};
