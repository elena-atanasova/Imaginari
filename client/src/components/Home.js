import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { MuiChipsInput } from 'mui-chips-input'

import { getPostsBySearch } from '../actions/posts';
import Posts from './Posts';
import Pagination from './Pagination';
import useStyles from '../assets/styles/HomeStyles';

// custom hook to retrieve query params
function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const [currID, setCurrID] = useState(0);

    const handlePressKey = (event) => {
        if (event.keyCode === 13) {  // keyCode 13 is enter
            searchPost();
        }
    };

    const handleTags = (t) => {
        setTags(t);
    };

    // searching posts by query
    const searchPost = () => {
        if (search.trim() || tags) {
            // dispatch -> fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }

    return (
        <Grow in>
            <Container maxWidth='xl' >
                <Grid container className={classes.container} justifyContent="space-between" alignItems="stretch" spacing={2} >
                    {/* search fields */}
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <AppBar className={classes.searchBar} color="inherit" position="static">
                                <TextField name="search" variant="outlined" label="Search Artworks" onKeyPress={handlePressKey} fullWidth size="small" value={search} onChange={(event) => setSearch(event.target.value)} />
                            </AppBar>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppBar className={classes.searchBar} color="inherit" position="static">
                                <MuiChipsInput value={tags} label="Search Tags" onChange={handleTags} size="small" />
                            </AppBar>
                        </Grid>
                    </Grid>

                    {/* search button */}
                    <Grid item container justifyContent='center' >
                        <Button className={classes.searchButton} fullWidth color="primary" variant="contained" size="large" onClick={searchPost}>Search</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Posts setCurrentId={setCurrID} />
                    </Grid>

                    <Grid item xs={12}>
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={4} className={classes.pag}><Pagination page={page} /></Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;