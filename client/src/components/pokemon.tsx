import { usePokemon } from '../hooks/pokemon';

export const Pokemon = () => {
    const { pokemon } = usePokemon();

    return <div>{JSON.stringify(pokemon)}</div>;
};
