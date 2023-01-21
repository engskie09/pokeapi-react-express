import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Paper, Pagination, Skeleton, Stack } from '@mui/material';

import { ThemeStyleType } from '../utilities/style';
import { useLogin } from '../hooks/login';

import pokemonLogo from '../assets/pokemon-logo.png';
import { usePokemons } from '../hooks/pokemons';
import { useAppSelector } from '../utilities/store';

const pokemonStyle = {
    container: {
        textAlign: 'center',
    } as ThemeStyleType,
    image: { width: '96px', height: '96px' } as CSSProperties,
};

interface PokemonProps {
    pokemon: any;
}

const Pokemon = (props: PokemonProps) => {
    const { pokemon } = props;

    return (
        <Paper elevation={2} sx={pokemonStyle.container}>
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
        paddingTop: 5
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
