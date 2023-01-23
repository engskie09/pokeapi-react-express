import { CSSProperties } from 'react';
import {
    Box,
    Button,
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
} from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useNavigate } from 'react-router-dom';
import { usePokemon } from '../hooks/pokemon';

import pokemonLogo from '../assets/pokemon-logo.png';
import { ThemeStyleType } from '../utilities/style';
import { pokemonTypes } from '../utilities/contant';

const style = {
    container: { marginTop: 5 } as ThemeStyleType,
    logo: { width: 150, height: '100%' } as CSSProperties,
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
        favorite: {
            marginLeft: 'auto',
            marginRight: 2,
        } as ThemeStyleType,
        ability: {
            type: {
                textAlign: 'center',
                width: 100,
                borderRadius: 2,
            } as ThemeStyleType,
        },
    },
};

export const Pokemon = () => {
    const { pokemon, types, moves, handleOnAddFavorite, handleOnDeleteFavorite } = usePokemon();
    const navigate = useNavigate();

    const handleOnFavorite = () => {
        if (pokemon.is_favorite) {
            handleOnDeleteFavorite();
        } else {
            handleOnAddFavorite();
        }
    };

    return (
        <Container maxWidth="sm" sx={style.container}>
            <Typography sx={style.title}>
                <img style={style.logo} src={pokemonLogo} alt="pokemonLogo" />
            </Typography>
            <Button
                onClick={() => {
                    navigate(-1);
                }}
                sx={{ marginBottom: 2 }}
                color="warning"
                variant="outlined"
                type="button"
            >
                Back
            </Button>
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
                            <Grid item sx={style.pokemon.favorite}>
                                {pokemon.is_favorite ? (
                                    <StarIcon onClick={handleOnFavorite} color="primary" fontSize="large" />
                                ) : (
                                    <StarBorderIcon onClick={handleOnFavorite} color="primary" fontSize="large" />
                                )}
                            </Grid>
                        </Grid>
                        <img style={style.logo} src={pokemon.info.data.sprites.front_default} alt="pokemonLogo" />
                        <Typography sx={style.pokemon.name}>{pokemon.name}</Typography>
                        <List>
                            {moves.map((move: any) => (
                                <ListItem key={move.move.name} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={move.move.name} />
                                        <Box
                                            sx={{
                                                ...style.pokemon.ability.type,
                                                backgroundColor:
                                                    pokemonTypes[move.info.data.type.name as keyof typeof pokemonTypes],
                                            }}
                                        >
                                            <Typography variant="subtitle1" sx={style.pokemon.typeLabel}>
                                                {move.info.data.type.name}
                                            </Typography>
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Paper>
            ) : (
                <span />
            )}
        </Container>
    );
};
