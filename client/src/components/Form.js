import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { TextField, Typography, Paper } from '@material-ui/core';
import { Button } from '@mui/material-next';

import { createPost, updatePost } from '../actions/posts';
import useStyles from '../assets/styles/FormStyles';


const Form = ({ currentId: currID, setCurrentId: setCurrID }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currID ? state.posts.posts.find((p) => p._id === currID) : null);  // for updating the posts

    const navigate = useNavigate();
    const dispatch = useDispatch();  // allows to dispatch actions
    const user = JSON.parse(localStorage.getItem('profile'));

    // to use the styles
    const classes = useStyles();

    // post post exists, set the data
    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    // after submission, clean the form
    const clear = () => {
        setCurrID(0);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };

    const handleSubmitButton = async (e) => {
        e.preventDefault();     // to prevent from getting refresh in the browser

        if (currID === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
        } else {
            dispatch(updatePost(currID, { ...postData, name: user?.result?.name }));
        }
        clear();
    };

    return (
        <Paper className={classes.fix} elevation={4}>

            <form className={`${classes.main} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmitButton}>
                {/* change depending on the action */}
                <Typography
                    className={classes.create}
                    variant='h5'>{currID ? 'Edit' : 'Upload'} Your Artwork</Typography>

                <TextField name="title"
                    variant="standard"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })
                    } />
                <TextField name="message" variant="standard" label="Description" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField style={{ marginBottom: '35px' }}
                    name="tags"
                    variant="standard"
                    label="Tags (Comma Separated)"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') }
                    )} />

                <div className={classes.file}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button
                    type="submit"
                    size='large'
                    variant="filled"
                    color="primary"
                    sx={{ mt: '20px', fontFamily: "Calibri", fontSize: "14px", fontWeight: 'bold' }}
                    fullWidth>Upload</Button>

                <Button type="submit"
                    size='large'
                    variant="filled"
                    color="secondary"
                    sx={{ mt: '20px', fontFamily: "Calibri", fontSize: "14px", fontWeight: 'bold' }}
                    onClick={clear} fullWidth>
                    Clear
                </Button>

            </form>

        </Paper>
    );
}

export default Form;