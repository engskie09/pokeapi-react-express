import { usePokemon } from '../hooks/pokemon';

export const Pokemon = () => {
    const { name } = usePokemon();

    return <div>{name}</div>;
};
