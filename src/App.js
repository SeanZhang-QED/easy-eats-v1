import React, {useState} from "react";
import './App.css';
import {AppBar, Toolbar, Box, Link, Alert, Snackbar} from '@mui/material';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Typography from '@mui/material/Typography';
import LoginForm from "./components/LoginForm";
import FoodList from "./components/FoodList";
import MyCart from "./components/MyCart";
import SignupForm from "./components/SignupForm";

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Easy Eats
            </Link>{' '}
            {new Date().getFullYear()}
            {'. All Rights Reserved. Website Made by Sean - '}
            <Link color="inherit" href="mailto:Sean.XUANZHANG@gmail.com">
                Xuan Zhang
            </Link>
            {'. '}
        </Typography>
    );
}

function App() {
    const [authed, setAuthed] = useState(false);
    const [signupOk, setSignupOk] = useState(false);

    return (
        <Box>
            <Snackbar
                anchorOrigin={{ horizontal:'center', vertical:'top',}}
                autoHideDuration = {2000}
                open={signupOk}
                onClose={()=>setSignupOk(false)}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Signed Up successfully!
                </Alert>
            </Snackbar>
            {/* Header */}
            <AppBar position="relative">
                <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start'}}>
                    <FoodBankIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap
                                sx={{ flexGrow: 1 }} // this line of code split the title and drawer
                    >
                        Easy Eats
                    </Typography>
                    <div>{authed ? <MyCart/> : <SignupForm onSuccess={()=>{setSignupOk(true)}}/> }</div>
                </Toolbar>
            </AppBar>
            {/* Content */}
            <main style={{
                padding: "50px 50px 0 50px",
                height: "calc(100vh - 64px - 160px)",
                overflowY: "auto",
            }}>
                {authed ? (
                    <FoodList />
                ) : (<LoginForm onSuccess={() => setAuthed(true)} />
                )}
                {/*<LoginForm onSuccess={() => setAuthed(true)} />*/}
            </main>

            {/* Footer */}
            <Box sx = {{ bgcolor: 'background.paper', p: 6, pb: 2, pt: 4, }}
                 component="footer">
                <Typography
                    variant="h6"
                    align="center"
                    gutterBottom>
                    {'Easy Eats - A Online Food Order React project like Doordash.'}
                    <Link href="https://www.linkedin.com/in/xuan-zhang-62120b21a/" underline="hover"> About Me. </Link>
                </Typography>
                <Copyright sx={{ mt: 0 }} />
            </Box>
        </Box>
    );
}

export default App;
