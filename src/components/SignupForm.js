import React, {useState} from 'react';
import {
    Avatar, Backdrop,
    Box,
    Button,
    Checkbox, CircularProgress,
    Container,
    FormControlLabel,
    Grid,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {signup} from "../utils";

const style = {
    position: 'absolute',
    top: '30%',
    left: '49%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    paddingLeft:0,
    paddingRight:0
};

function SignupForm(props) {
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);


    const handleClick = ()=> setOpen(true);

    const handleClose = () => setOpen(false);

    const handleSubmit = (event) =>{
        // Step 1: start loading
        setLoading(true);

        // Step 2: get the data in the form
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // data.get(key is the name of the TextField)


        const signupData = {
            "email":data.get("username"),
            "password":data.get("password")
        }
        // signup(signupData);

        // Step 3: sent data to the backend
        signup(signupData)
            .then(() => {
                // version 2: using only mui
                props.onSuccess();
            })
            .catch((err) => {
            })
            .finally(() => {
                setOpen(false);
                setLoading(false);
            });
    };

    return (
        <div>
            <Button onClick={handleClick}>
                <Typography color={"white"}>
                    Sign Up Now!
                </Typography>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                    <Container component="main" maxWidth="xs" sx={style}>
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
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="firstName"
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="username"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </Box>
                    </Container>
            </Modal>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
}

export default SignupForm;