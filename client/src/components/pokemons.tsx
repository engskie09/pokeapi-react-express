import { Box, Container, Grid, Item } from '@mui/material';

import { ThemeStyleType } from '../utilities/style';
import { useLogin } from '../hooks/login';

import pokemonLogo from '../assets/pokemon-logo.png';

const style = {
    container: { marginTop: 5 } as ThemeStyleType,
};

export const Pokemons = () => (
    <Container maxWidth="md" sx={style.container}>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item md={3}>
                    Pokemon
                </Grid>
                <Grid item md={3}>
                    Pokemon
                </Grid>
                <Grid item md={3}>
                    Pokemon
                </Grid>
                <Grid item md={3}>
                    Pokemon
                </Grid>
            </Grid>
        </Box>
    </Container>
);
