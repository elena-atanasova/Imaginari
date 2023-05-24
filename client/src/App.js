import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Container } from '@material-ui/core';

import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Authentication from './components/Authentication.js';
import Details from './components/Details.js';
import UploadPost from './components/UploadPost.js';


const App = () => {

    // get the user
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId='494780283820-3p6d7tdqitgnav3rlsk0md5sqmaigi04.apps.googleusercontent.com'>
                <Container maxWidth='xl'>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate to='/posts' />} />
                        <Route path='/posts' element={<Home />} />
                        <Route path='/posts/search' element={<Home />} />
                        <Route path='/posts/:id' element={<Details />} />
                        <Route path="/auth" element={!user ? <Authentication /> : <Navigate to='/posts' />} />
                        <Route path='/upload' element={<UploadPost />} />
                    </Routes>
                </Container>
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
}

export default App; 