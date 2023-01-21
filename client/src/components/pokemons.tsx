import { Box, Container, Grid, Item } from '@mui/material';

import { ThemeStyleType } from '../utilities/style';
import { useLogin } from '../hooks/login';

import pokemonLogo from '../assets/pokemon-logo.png';
import { usePokemons } from '../hooks/pokemons';
import { useAppSelector } from '../utilities/store';

const style = {
    container: { marginTop: 5 } as ThemeStyleType,
};

export const Pokemons = () => {
    const { pokemons } = usePokemons();
    //console.log(pokemons)

    return (
        <Container maxWidth="md" sx={style.container}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item md={3}>
                        {pokemons.map((pokemon: any) => (
                            <Box key={pokemon.name}>{pokemon.name}</Box>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};
