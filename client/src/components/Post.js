import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Card, CardActions, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import useStyles from '../assets/styles/PostStyles';
import { deletePost, likePost } from '../actions/posts'


const Post = ({ post, setCurrID }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [likes, setLikes] = useState(post?.likes); // quicker load of the likes on the frontend
    const [hover, setHover] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const userID = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userID);
    const [currID, setCurrentId] = useState(0);

    // sub-component
    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userID)
                ? (
                    <><ThumbUpAltOutlined style={{ color: '#662d91' }} fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                ) : (
                    <><ThumbUpAltIcon style={{ color: '#662d91' }} fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                );
        }
        return <><ThumbUpAltOutlined style={{ color: '#662d91' }} fontSize="small" />&nbsp;Like</>;
    };

    const handleLike = () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userID));
        } else {
            setLikes([...post.likes, userID]);
        }
    };

    const openPost = () => navigate(`/posts/${post._id}`);

    return (
        <Card className={`${classes.card} ${hover ? classes.hoveredCard : ''}`} raised elevation={4} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <ButtonBase className={classes.action} onClick={() => openPost()}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.top}>
                        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>)
                }
            </ButtonBase>

            {/* information to display after hovering */}
            {hover && (
                <div className={classes.hoverInfo}>
                    <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                </div>
            )}

            <CardActions className={classes.actions}>
                <Typography className={classes.name}>{post.name}</Typography>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>

                {/* user can only delete their own post */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon style={{ color: '#662d91' }} fontSize="small" />
                    </Button>)}
            </CardActions>
        </Card >
    );
}

export default Post;