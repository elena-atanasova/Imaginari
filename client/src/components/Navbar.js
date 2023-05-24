import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { AppBar, Typography, Toolbar, Avatar, Button, Menu, MenuItem, Container } from '@material-ui/core';
import { Box, IconButton, Tooltip } from '@mui/material';

import useStyles from '../assets/styles/NavbarStyles';
import logo from '../assets/images/logo.png';


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [anchorElUser, setAnchorElUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    };

    useEffect(() => {   // automatically refresh and redirect after user logs in
        const token = user?.token;  // check if user exists

        // manual sign up
        //check if jwt has expired
        if (token) {   // first checks if it exists, then decode
            const decodedToken = decode(token);   // decode -> gives info when the token is expiring

            // if token has expired, the users is logged out
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    // open settings menu
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    // close settings menu
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // redirect to the uploads page
    const uploadPost = () => {
        navigate('/upload');
    };

    // the navigation bar is not displayed on the log in/sign up page
    if (location.pathname === '/auth') return null;

    return (
        <AppBar color='inherit' position='static' className={classes.appBar}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography><Link to='/'><img className={classes.image} src={logo} alt='icon' height='45px' /></Link></Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link style={{fontFamily: 'Calibri', fontSize: '20px', textDecoration: 'none', color: 'black' }} to='/posts'>Discover</Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {/* only show button for uploading artwork when user is logged in */}
                        {user ? (
                            <Toolbar>
                                <Button style={{marginRight: '10px', fontFamily: 'Calibri', fontSize: "14px", borderRadius: '20px' }} color='primary' variant='outlined' size='small' onClick={uploadPost}>Share Your Work</Button>
                                <Tooltip title='Open settings'>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Toolbar>
                        ) : (
                            <Button style={{ fontFamily: "Calibri", fontSize: "16px", borderRadius: '20px', backgroundColor: '#452c63' }} component={Link} to="/auth" variant='contained' color="primary">Sign In</Button>
                        )}
                        <Menu sx={{ mt: '45px' }} ig='menu-appbar' anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem onClick={() => { logout(); handleCloseUserMenu(); }}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;