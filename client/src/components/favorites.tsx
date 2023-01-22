import { CSSProperties } from 'react';
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
} from '@mui/material';

import pokemonLogo from '../assets/pokemon-logo.png';
import { ThemeStyleType } from '../utilities/style';
import { pokemonTypes } from '../utilities/contant';

import { useFavorites } from '../hooks/favorites';

const style = {
    container: { marginTop: 5 } as ThemeStyleType,
    logo: { width: 150, height: '100%' } as CSSProperties,
    title: { textAlign: 'center', m: 2 } as ThemeStyleType,
};

export const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <Container maxWidth="sm" sx={style.container}>
            <Typography sx={style.title}>
                <img style={style.logo} src={pokemonLogo} alt="pokemonLogo" />
            </Typography>
            <Box>
                {JSON.stringify(favorites)}
            </Box>
        </Container>
    );
};
