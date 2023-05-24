import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post'
import useStyles from '../assets/styles/PostsStyles';

const Posts = ({ setCurrentId: setCurrID }) => {
    const { posts, isLoading } = useSelector((s) => s.posts);
    const classes = useStyles();

    if (!posts.length && !isLoading) return 'No posts';

    return (
        // if page is isLoading, display a loading spinner

        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (

                    // make the grid responsive fo different screen sizes
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrID} />
                    </Grid>

                ))}
            </Grid>
        )
    );
}

export default Posts;