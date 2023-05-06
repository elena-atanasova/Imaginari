import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid, Typography, Container } from '@material-ui/core';
import { Link } from '@mui/material';
import { Button } from '@mui/material-next';
import { Divider, Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import useStyles from '../assets/styles/AuthenticationStyles';
import { signin, signup } from '../actions/auth';
import InputField from './InputField';
import { AUTH } from '../constants/actionTypes';



import background from '../assets/images/background.jpg';
import logo from '../assets/images/logo.png';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Authentication = () => {
    // hooks for managing state
    const [isUser, setIsUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userInfo, setUserInfo] = useState(initialState);

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // sign in or sign up
    const switchAuthType = () => {
        setIsUser((prev) => !prev);
        setShowPassword(false);
    };

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = (e) => {
        // prevents page from reloading
        e.preventDefault();

        if (isUser) {
            dispatch(signup(userInfo, navigate));
        } else {
            dispatch(signin(userInfo, navigate));
        }
    };

    const googleSignInSuccess = async (res) => {
        const result = jwt_decode(res.credential);
        const token = res.credential;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/');   // redirect to home page after login
        } catch (error) {
            console.log(error)
        }
    };

    const googleSignInFail = () => {
        console.log("Can't sign in to your Google Account.");
    };

    return (
        <Box sx={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundImage: `url(${background})`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={2} alignItems='center' style={{maxWidth: '400px', width: '100%'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 40  }}>
                    <Link onClick={() => navigate('/')}><img src={logo} alt="Logo" /></Link>
                </Box>
            </Grid>

            <Box sx={{ marginLeft: 'auto', marginRight: 40, maxWidth: '400px', width: '100%'}}>
                <Container component="main" maxWidth="xs" className={classes.background}>
                    <Paper className={classes.paper} elevation={3}>
                        <Typography className={classes.welcome} variant="h4">{isUser ? 'Sign Up' : 'Sign In'}</Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {
                                    isUser && (
                                        <>
                                            <InputField name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                            <InputField name="lastName" label="Last Name" handleChange={handleChange} half />
                                        </>
                                    )}
                                <InputField name="email" label="Email Address" handleChange={handleChange} type="email" />
                                <InputField name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                                {isUser && <InputField name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                            </Grid>
                            <Button type="submit" size='large' variant="filled" color="primary" sx={{ mt: '2rem', fontFamily: "Arial", fontSize: "12px" }}>{isUser ? 'Sign Up' : 'Sign In'}</Button>
                            <Divider style={{ marginTop: '20px', marginBottom: '20px', fontFamily: 'Arial', color: 'grey', fontSize: '12px' }}>OR</Divider>

                            <Grid className={classes.googleButton} container justifyContent='center' ><GoogleLogin onSuccess={googleSignInSuccess} onError={googleSignInFail} cookiePolicy='single_host_origin' /></Grid>

                            <Grid container justifyContent="center" style={{ marginTop: '7px' }}>
                                <Grid item >
                                    <Typography className={classes.account} style={{ color: '#404040', marginBottom: '30px' }}>
                                        {isUser ? 'Already have an account?' : "Don't have an account?"}&nbsp;
                                        <Link color='secondary' onClick={switchAuthType}>{isUser ? 'Sign In' : "Sign Up"}</Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </Box>

    )
};

export default Authentication;