import { Box, Container, Grid, Typography, Paper, Pagination } from '@mui/material';

import { ThemeStyleType } from '../utilities/style';
import { useLogin } from '../hooks/login';

import pokemonLogo from '../assets/pokemon-logo.png';
import { usePokemons } from '../hooks/pokemons';
import { useAppSelector } from '../utilities/store';

const pokemonStyle = {
    container: {
        textAlign: 'center',
    } as ThemeStyleType,
};

interface PokemonProps {
    pokemon: any;
}

const Pokemon = (props: PokemonProps) => {
    const { pokemon } = props;

    return (
        <Paper elevation={2} sx={pokemonStyle.container}>
            <img src={pokemon.info.data.sprites.front_default} alt={pokemon.info.data.sprites.front_default} />
            <Typography>{pokemon.name}</Typography>
        </Paper>
    );
};

const PokemonsStyle = {
    container: { marginTop: 5 } as ThemeStyleType,
    pagination: {} as ThemeStyleType,
};

export const Pokemons = () => {
    const { pokemons, count } = usePokemons();
    // console.log(pokemons)

    return (
        <Container maxWidth="md" sx={PokemonsStyle.container}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} direction="row">
                    {pokemons.map((pokemon: any) => (
                        <Grid key={pokemon.info.data.id} item md={3}>
                            <Pokemon pokemon={pokemon} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Pagination
                count={count}
                color="primary"
                variant="outlined"
                shape="rounded"
                sx={PokemonsStyle.pagination}
            />
        </Container>
    );
};
