import { CSSProperties } from 'react';
import { Box, Container, Grid, Typography, Paper, Pagination, Skeleton, Stack, TextField } from '@mui/material';

import { usePokemon } from '../hooks/pokemon';

import pokemonLogo from '../assets/pokemon-logo.png';
import { ThemeStyleType } from '../utilities/style';
import { pokemonTypes } from '../utilities/contant';

const style = {
    container: { marginTop: 5 } as ThemeStyleType,
    logo: { width: 150, height: '100%'} as CSSProperties,
    title: { textAlign: 'center', m: 2 } as ThemeStyleType,
    pokemon: {
        container: {
            textAlign: 'center',
        } as ThemeStyleType,
        name: {
            fontSize: 20,
            fontWeight: 'bold',
        } as ThemeStyleType,
        typesContainer: {
            marginLeft: 0.5,
        } as ThemeStyleType,
        typeContainer: {
            width: 'max-content',
            marginLeft: 1,
            borderRadius: 2,
        } as ThemeStyleType,
        typeLabel: {
            margin: 0.5,
            fontSize: 20,
            color: '#fff',
        } as ThemeStyleType,
    },
};

export const Pokemon = () => {
    const { pokemon } = usePokemon();
    const { types } = pokemon.info.data;

    console.log(pokemon);

    return (
        <Container maxWidth="sm" sx={style.container}>
            <Typography sx={style.title}>
                <img style={style.logo} src={pokemonLogo} alt="pokemonLogo" />
            </Typography>
            {pokemon ? (
                <Paper elevation={5}>
                    <Box sx={style.pokemon.container}>
                        <Grid container spacing={1} direction="row" sx={style.pokemon.typesContainer}>
                            {types.map((type: any) => (
                                <Grid key={type.type.name} item>
                                    <Box
                                        sx={{
                                            ...style.pokemon.typeContainer,
                                            backgroundColor: pokemonTypes[type.type.name as keyof typeof pokemonTypes],
                                        }}
                                    >
                                        <Typography variant="subtitle1" sx={style.pokemon.typeLabel}>
                                            {type.type.name}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        <img style={style.logo} src={pokemon.info.data.sprites.front_default} alt="pokemonLogo" />
                        <Typography sx={style.pokemon.name}>{pokemon.name}</Typography>
                    </Box>
                </Paper>
            ) : (
                <span />
            )}
        </Container>
    );
};
