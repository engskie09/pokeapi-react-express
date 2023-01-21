import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Paper, Pagination, Skeleton, Stack } from '@mui/material';

import { ThemeStyleType } from '../utilities/style';
import { useLogin } from '../hooks/login';

import pokemonLogo from '../assets/pokemon-logo.png';
import { usePokemons } from '../hooks/pokemons';
import { useAppSelector } from '../utilities/store';
import { pokemonTypes } from '../utilities/contant';

const pokemonStyle = {
    container: {
        margin: 1,
        textAlign: 'center',
    } as ThemeStyleType,
    image: { width: '96px', height: '96px' } as CSSProperties,
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
};

interface PokemonProps {
    pokemon: any;
}

const Pokemon = (props: PokemonProps) => {
    const { pokemon } = props;
    const { types } = pokemon.info.data;
    console.log(pokemon);
    return (
        <Paper elevation={5} sx={pokemonStyle.container}>
            <Grid container spacing={1} direction="row" sx={pokemonStyle.typesContainer}>
                {types.map((type: any) => (
                    <Grid key={type.type.name} item>
                        <Box
                            sx={{
                                ...pokemonStyle.typeContainer,
                                backgroundColor: pokemonTypes[type.type.name as keyof typeof pokemonTypes],
                            }}
                        >
                            <Typography variant="subtitle1" sx={pokemonStyle.typeLabel}>
                                {type.type.name}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <img
                src={pokemon.info.data.sprites.front_default ?? pokemonLogo}
                alt={pokemon.info.data.sprites.front_default}
                style={pokemonStyle.image}
            />
            <Typography>{pokemon.name}</Typography>
        </Paper>
    );
};

const PokemonsStyle = {
    container: { marginTop: 5 } as ThemeStyleType,
    pagination: {
        display: 'table',
        margin: 'auto',
        paddingTop: 5,
    } as ThemeStyleType,
};

export const Pokemons = () => {
    const [page, setPage] = useState(1);

    const { pokemons, count, isFetchingInfo } = usePokemons({ pageNumber: page });

    const handleOnChange = (event: ChangeEvent<unknown>, currentPage: number) => {
        setPage(currentPage);
    };

    return (
        <Container maxWidth="lg" sx={PokemonsStyle.container}>
            <Box>
                <Grid container spacing={2} direction="row" sx={{ display: isFetchingInfo ? 'none' : '' }}>
                    {pokemons.map((pokemon: any) => (
                        <Grid key={pokemon.info.data.id} item md={3}>
                            <Pokemon pokemon={pokemon} />
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={2} direction="row" sx={{ display: isFetchingInfo ? '' : 'none' }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((index: any) => (
                        <Grid key={index} item md={3}>
                            <Stack spacing={1}>
                                <Skeleton variant="rectangular" width={270} height={120} />
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Pagination
                onChange={handleOnChange}
                count={count}
                color="primary"
                variant="outlined"
                shape="rounded"
                size="large"
                sx={PokemonsStyle.pagination}
            />
        </Container>
    );
};
