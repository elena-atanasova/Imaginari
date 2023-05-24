import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';

import Comments from './Comments';
import { getPost, getPostsBySearch } from '../actions/posts';
import useStyles from '../assets/styles/DetailsStyles';

const Details = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const classes = useStyles();

    // when the id of the post changes
    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    // recommended posts based on tags
    useEffect(() => {
        // check if post exists => if yes, dispatch a new action
        if (post) {
            // search is 'none', cause for the recommended posts we will be looking only at tags
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);

    // if a post does not exist
    if (!post) return null;

    // check if content is loading
    if (isLoading) {
        return <Paper
            className={classes.loading}
            elevation={4} >
            <CircularProgress size='10px' />
        </Paper>
    }

    const openPost = (_id) => navigate(`/posts/${_id}`);
    const recommPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        <Paper style={{ borderRadius: '20px', padding: '20px' }} elevation={4}>
            <div className={classes.card}>
                <div className={classes.part}>
                    <Typography component="h4" variant="h4">{post.title}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Typography gutterBottom variant='subtitle1'><b>Likes:</b> {post.likes.length}</Typography>
                    <Divider style={{ margin: '20px 0' }} />

                    <Typography gutterBottom variant="body1" fontSize='16px' component="p"><b>Description:</b> {post.message}</Typography>
                    <Divider style={{ margin: '20px 0' }} />

                    <Typography gutterBottom variant="body2" color='textSecondary' component="p"><b>Tags:</b> {post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Divider style={{ margin: '20px 0' }} />

                    <Typography variant="h6"><b>Artist:</b> {post?.name}</Typography>

                    <Divider style={{ margin: '20px 0' }} />
                    <Comments post={post} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>

                <div className={classes.image}>
                    {/* display either the image or if nothing is uploaded an authomatic image */}
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>

            {/* recommended posts */}
            {recommPosts.length && (
                    <div className={classes.part}>
                        <Typography gutterBottom variant='h5' color='textSecondary' component='h5'><b>Recommended Posts:</b></Typography>
                        <Divider />
                        <div className={classes.recommendations}>
                            {recommPosts.map(({ title, name, selectedFile, _id }) => (
                                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                    <img src={selectedFile} width='180px' height='120px' />
                                    <Typography variant='h6' component='h6' fontFamily='Calibri'><b>{title}</b></Typography>
                                    <Typography variant='body2' component='body2' fontFamily='Calibri'>{name}</Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </Paper>
    )
}

export default Details;