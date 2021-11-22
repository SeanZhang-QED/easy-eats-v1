import React, {Component} from 'react';
import { login } from "../utils";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    CircularProgress,
    Button,
    Alert,
    Snackbar,
    Backdrop
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


class LoginForm extends Component {
    state = {
        theme: createTheme(),
        loading: false,
        openAlert: false,
        alertSuccess: false,
        alertError: false,
    }

    handleSubmit = (event) => {
        // Step 1: start loading
        this.setState({ loading: true });

        // Step 2: get the data in the form
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // data.get(key is the name of the TextField)

        // Step 3: sent data to the backend
        login(data)
            .then(() => {
                // version 2: using only mui
                this.setState({alertSuccess: true});
                this.props.onSuccess();
            })
            .catch((err) => {
                this.setState({alertError: true});
                setTimeout(() => this.setState({ alertError: false }), 2000); //2 seconds
            })
            .finally(() => {
                this.setState({loading: false,});
            });
    };

    componentWillUnmount() {
        this.setState = ()=>false;
    }

    render() {
        return (
            <ThemeProvider theme={this.state.theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                        {this.state.alertError
                            ?
                            <Snackbar
                                anchorOrigin={{ horizontal:'center', vertical:'top',}}
                                autoHideDuration = {2000}
                                open={this.state.alertError}
                            >
                                <Alert severity="error" sx={{ width: '100%' }}>
                                    Unauthorized - Incorrect Username or Password!
                                </Alert>
                            </Snackbar>
                            : ""
                        }
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Email Address"
                                name="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={this.state.loading}
                            >
                                {'Sign in'}
                            </Button>
                            <Backdrop
                                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                                open={this.state.loading}
                            >
                                <CircularProgress color="inherit"/>
                            </Backdrop>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

export default LoginForm;