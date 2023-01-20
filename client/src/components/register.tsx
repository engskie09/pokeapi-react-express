import { CSSProperties } from 'react';
import { FormProvider, Controller } from 'react-hook-form';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    ButtonGroup,
} from '@mui/material';

import { ThemeStyleType } from '../utilities/style';
import { useRegister } from '../hooks/register';

import pokemonLogo from '../assets/pokemon-logo.png';

const style = {
    container: { marginTop: 5 } as ThemeStyleType,
    logo: { width: 150, height: '100%' } as CSSProperties,
    form: { maxWidth: 400 } as ThemeStyleType,
    icon: { fontSize: '70px', margin: 'auto', width: '100%', marginTop: -4 } as ThemeStyleType,
    title: { textAlign: 'center' } as ThemeStyleType,
    action: {
        container: { marginBottom: '10px' } as ThemeStyleType,
        button: { marginBottom: 2 } as ThemeStyleType,
        link: { textDecoration: 'none', color: 'inherit' } as CSSProperties,
    },
};

export const Register = () => {
    const { form, handleOnSubmit } = useRegister();

    return (
        <Container maxWidth="xs" sx={style.container}>
            <FormProvider {...form}>
                <Paper component="form" onSubmit={handleOnSubmit} noValidate autoComplete="off" sx={style.form}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" component="p" sx={style.title}>
                                <img style={style.logo} src={pokemonLogo} alt="pokemonLogo" />
                            </Typography>
                            <Grid container>
                                <Grid item sm={12} marginBottom={1} width="100%">
                                    <Controller
                                        name="username"
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                label="Username"
                                                value={value || ''}
                                                variant="standard"
                                                fullWidth
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item sm={12} width="100%">
                                    <Controller
                                        name="password"
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                label="Password"
                                                type="password"
                                                value={value || ''}
                                                variant="standard"
                                                fullWidth
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions sx={style.action.container}>
                            <ButtonGroup orientation="vertical" fullWidth>
                                <Button variant="contained" type="submit" sx={style.action.button}>
                                    Register
                                </Button>
                            </ButtonGroup>
                        </CardActions>
                    </Card>
                </Paper>
            </FormProvider>
        </Container>
    );
};
