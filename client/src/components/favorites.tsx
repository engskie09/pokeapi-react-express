import { CSSProperties } from 'react';

import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    Pagination,
    Skeleton,
    Stack,
    TextField,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
} from '@mui/material';

import pokemonLogo from '../assets/pokemon-logo.png';

import { Pokemon } from './pokemons';

import { ThemeStyleType } from '../utilities/style';
import { pokemonTypes } from '../utilities/contant';

import { useFavorites } from '../hooks/favorites';

const style = {
    container: { marginTop: 5 } as ThemeStyleType,
    logo: { width: 150, height: '100%' } as CSSProperties,
    title: { textAlign: 'center', m: 2 } as ThemeStyleType,
};

export const Favorites = () => {
    const { favorites, isFetchingInfo } = useFavorites();
    const navigate = useNavigate();
    console.log('favorites', favorites);

    return (
        <Container maxWidth="lg" sx={style.container}>
            <Typography variant="h5" sx={style.title}>
                <img style={style.logo} src={pokemonLogo} alt="pokemonLogo" />
                <br />
                Your Favorite Pokemons
            </Typography>
            <Button
                onClick={() => {
                    navigate(-1);
                }}
                sx={{ margin: 1 }}
                color="warning"
                variant="outlined"
                type="button"
            >
                Back
            </Button>
            <Box>
                <Grid container spacing={2} direction="row" sx={{ display: isFetchingInfo ? 'none' : '' }}>
                    {favorites.map((pokemon: any) => (
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
        </Container>
    );
};
