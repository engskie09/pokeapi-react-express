import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography, Paper, Pagination, Skeleton, Stack, TextField } from '@mui/material';

import { ThemeStyleType } from '../utilities/style';
import { useLogin } from '../hooks/login';

import pokemonLogo from '../assets/pokemon-logo.png';
import { usePokemons } from '../hooks/pokemons';
import { sessionComponent, useAppDispatch, useAppSelector } from '../utilities/store';
import { pokemonTypes } from '../utilities/contant';

const pokemonStyle = {
    container: {
        margin: 1,
        textAlign: 'center',
        '&:hover': {
            backgroundColor: '#ffcb05',
        },
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

export const Pokemon = (props: PokemonProps) => {
    const { pokemon } = props;
    const navigate = useNavigate();
    const { types } = pokemon.info.data;

    return (
        <Paper
            onClick={() => {
                navigate(`/pokemon/${pokemon.name}`);
            }}
            elevation={5}
            sx={pokemonStyle.container}
        >
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

const pokemonsStyle = {
    container: { marginTop: 5 } as ThemeStyleType,
    logo: { width: 150, height: '100%' } as CSSProperties,
    title: { textAlign: 'center' } as ThemeStyleType,
    filter: {
        container: {
            margin: 1,
        } as ThemeStyleType,
    },
    navigation: {
        container: { marginLeft: 'auto', marginRight: 2 } as ThemeStyleType,
        button: { margin: 1 } as ThemeStyleType,
    },
    pagination: {
        display: 'table',
        margin: 'auto',
        paddingTop: 5,
    } as ThemeStyleType,
};

export const Pokemons = () => {
    const [page, setPage] = useState<number>(1);
    const [name, setName] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { pokemons, count, isFetchingInfo } = usePokemons({ name, pageNumber: page });

    console.log('pokemons', pokemons);

    const handlePaginationOnChange = (event: ChangeEvent<unknown>, currentPage: number) => {
        setPage(currentPage);
    };

    const handleFilterOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        setPage(1);
    };

    return (
        <Container maxWidth="lg" sx={pokemonsStyle.container}>
            <Typography sx={pokemonsStyle.title}>
                <img style={pokemonsStyle.logo} src={pokemonLogo} alt="pokemonLogo" />
            </Typography>

            <Grid container spacing={2} direction="row">
                <Grid item sx={pokemonsStyle.filter.container}>
                    <TextField onChange={handleFilterOnChange} label="Search Pokemon" variant="outlined" />
                </Grid>
                <Grid item margin={1} sx={pokemonsStyle.navigation.container}>
                    <Button
                        onClick={() => {
                            navigate('/favorites');
                        }}
                        sx={pokemonsStyle.navigation.button}
                        color="secondary"
                        variant="outlined"
                        type="button"
                    >
                        Favorites
                    </Button>
                    <Button
                        onClick={() => {
                            navigate('/teams');
                        }}
                        sx={pokemonsStyle.navigation.button}
                        color="primary"
                        variant="outlined"
                        type="button"
                    >
                        Teams
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(sessionComponent.actions.logout());
                        }}
                        sx={pokemonsStyle.navigation.button}
                        color="error"
                        variant="outlined"
                        type="button"
                    >
                        Logout
                    </Button>
                </Grid>
            </Grid>
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
                onChange={handlePaginationOnChange}
                count={count}
                color="primary"
                variant="outlined"
                shape="rounded"
                size="large"
                sx={pokemonsStyle.pagination}
            />
        </Container>
    );
};
