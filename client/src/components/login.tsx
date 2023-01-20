import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, Controller } from 'react-hook-form';

import { Button, Card, CardActions, CardContent, Grid, Paper, TextField, Typography, ButtonGroup } from '@mui/material';

import { ThemeStyleType } from '../utilities/style';
import { useLogin } from '../hooks/login';

const style = {
    container: { maxWidth: 400 } as ThemeStyleType,
    icon: { fontSize: '70px', margin: 'auto', width: '100%', marginTop: -4 } as ThemeStyleType,
    title: { textAlign: 'center' } as ThemeStyleType,
    action: {
        container: { marginBottom: '10px' } as ThemeStyleType,
        button: { marginBottom: 2 } as ThemeStyleType,
        link: { textDecoration: 'none', color: 'inherit' } as CSSProperties,
    },
};

export const Login = () => {
    const { form, handleOnSubmit } = useLogin();

    return (
        <FormProvider {...form}>
            <Paper component="form" onSubmit={handleOnSubmit} noValidate autoComplete="off" sx={style.container}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="p" sx={style.title}>
                            Login
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
                                Login
                            </Button>
                            <Button variant="text">
                                <Link to="/sign-up" style={style.action.link}>
                                    Not registered yet? signup now.
                                </Link>
                            </Button>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </Paper>
        </FormProvider>
    );
};
