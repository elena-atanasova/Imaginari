import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, TextField, Button, Divider } from '@material-ui/core';

import useStyles from '../assets/styles/DetailsStyles';
import { commentPost } from '../actions/posts';


const Comments = ({ post: p }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(p?.comments);
    const commentsReference = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();

    const handleClickAction = async () => {
        const readyComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(readyComment, p._id));
        
        setComments(newComments);
        setComment('');

        // scroll down to the last comment
        commentsReference.current.scrollIntoView({ behaviour: 'smooth' });
    }

    return (
        <div>
            <div className={classes.outerContainer}>
                <div className={classes.innerContainer}>
                    <Typography variant='h6' component='h6' fontFamily='Calibri'><b>Comments</b></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    {comments.map((c, i) => (
                        <Typography key={i} variant='body2' component='p'>
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}

                {/* automatically scroll to the last comment */}
                <div ref={commentsReference}/>    
                </div>
                {user?.result?.name && (
                <div style={{ width: '70%' }}>
                    <Typography variant='body1' component='p'>Write a Comment</Typography>
                    <TextField variant='outlined' multiline  fullWidth label='comment' minRows={4} value={comment} onChange={(event) => setComment(event.target.value)} />
                    <Button style={{ marginTop: '10px', borderRadius: '20px', backgroundColor: '#452c63', color: 'white', fontWeight: 'bold' }} fullWidth disabled={!comment} variant='contained' color='primary' onClick={handleClickAction}>Comment</Button>
                </div> )}
            </div>
        </div>
    );
};

export default Comments;