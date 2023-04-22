import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId='494780283820-3p6d7tdqitgnav3rlsk0md5sqmaigi04.apps.googleusercontent.com'>
                <Container maxWidth='lg'>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                    </Routes>
                </Container>
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
}

export default App;