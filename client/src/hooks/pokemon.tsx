import { useParams, useNavigate } from 'react-router-dom';

// TODO Pokemon Page

export const usePokemon = () => {
    const params = useParams();

    return { name: params.name };
};
