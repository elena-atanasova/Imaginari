import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
//import ChipInput from 'material-ui-chip-input';
import { MuiChipsInput } from 'mui-chips-input'

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch(); // a hook
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    // we no longer will nuse that from the home page
    // useEffect(() => {
    //     dispatch(getPosts());  // to dispatch an action
    // }, [currentId, dispatch]);

    const searchPost = () => {
        if (search.trim() || tags) {
            // dispatch -> fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {  // keyCOde 13 is enter
            searchPost();
        }
    };

    // const handleAdd = (tag) => setTags([...tags, tag]);
    // const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
    const handleChange = (tags) => {
        setTags(tags);
    };



    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField name='search' variant='outlined' label='Search Artworks' onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <MuiChipsInput
                                //style={{ margin: '10px 0'}}
                                value={tags}
                                onChange={handleChange}
                                label='Search Tags'
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Pagination page={page}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;