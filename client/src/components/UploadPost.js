import React, { useState } from 'react';

import { Container, Grid } from '@material-ui/core';
import { Box } from '@mui/material';

import background from '../assets/images/background.jpg';
import Form from './Form';


export default function UploadPost() {
    const [currID, setCurrID] = useState(0);

    return (
        <Box sx={{ position: 'fixed', zIndex: '-1', top: '0', left: '0', right: '0', bottom: '0', backgroundImage: `url(${background})`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth='xl' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)', marginLeft: '-240px' }}>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} >
                    <Grid item xs={12} sm={6} md={3}>
                        <Form currentId={currID} setCurrentId={setCurrID} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
