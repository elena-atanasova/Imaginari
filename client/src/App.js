import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Authentication from './components/Authentication';
import PostDetails from './components/PostDetails/PostDetails.jsx';

const App = () => {
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
                        <Route path='/posts/:id' element={<PostDetails />} />
                        <Route path="/auth" element={!user ? <Authentication /> : <Navigate to='/posts' />} />
                    </Routes>
                </Container>
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
}

export default App; 