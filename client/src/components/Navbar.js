import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Button, Toolbar, Avatar, InputBase, Badge, Menu, MenuItem, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Box, Stack, IconButton, Tooltip } from '@mui/material';
import { ColorLensRoundedIcon } from '@mui/icons-material';
//import { Button } from '@mui/material-next';


import * as actionType from '../constants/actionTypes';

import useStyles from '../assets/styles/NavbarStyles';
import logo from '../assets/images/logo.png';
import MenuIcon from '@material-ui/icons/Menu';


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    };

    // to automatically refresh and redirect after login
    useEffect(() => {
        const token = user?.token;  // check if it exists

        // for manual sign up

        //check if jwt has expired
        if (token) {   // first check if exist, and then decode
            const decodedToken = decode(token);   // decode gives info when the token is expiring

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    const uploadPost = () => {
        //navigate('/share');
    };

    if (location.pathname === '/auth') return null;

    return (
        <AppBar color='white' position='static' className={classes.appBar}>
            <Container maxWidth='x1'>
                <Toolbar disableGutters>
                    <Typography><Link to='/'><img className={classes.image} src={logo} alt='icon' height='45px' /></Link></Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link to='/posts'><Button sx={{ my: 2, color: 'white', display: 'block' }}>Discover</Button></Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            <Toolbar>
                                <Button className={classes.share} color='primary' variant='outlined' size='small' onClick={uploadPost}>Share Your Work</Button>
                                <Tooltip title='Open settings'>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Toolbar>
                        ) : (
                            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                        )}
                        <Menu sx={{ mt: '45px' }} ig='menu-appbar' anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Account</MenuItem>
                            <MenuItem>Dashboard</MenuItem>
                            <MenuItem onClick={() => { logout(); handleCloseUserMenu(); }}>Logout</MenuItem>
                        </Menu>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
        // <AppBar className={classes.appBar} position='static' color='inherit'>
        //     <Link to='/' className={classes.container}><img className={classes.image} src={logo} alt='icon' height='45px' /></Link>
        //     {/* <Link to="/posts" style={{ textDecoration: 'none' }}>Discover</Link> */}

        //     <Toolbar className={classes.toolbar}>

        //         {user ? (
        //             <div className={classes.profile}>

        //                 <Button className={classes.share} variant="contained" color="primary">Share Your Work</Button>

        //                 <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
        //                 <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
        //                 <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
        //             </div>
        //         ) : (
        //             <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        //         )}
        //     </Toolbar>

        // </AppBar>
    );
};

export default Navbar;