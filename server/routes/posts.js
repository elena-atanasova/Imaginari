import express from 'express';

import { getPostsBySearch, getPost, getPosts, createPost, updatePost, commentPost, deletePost, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js';   // we want to add it before specific actions

const router = express.Router();

// we are in the post, so all of the routes below start with /post
router.get('/search', getPostsBySearch);
router.get('/', getPosts); // all users no matter logged in or not can see the posts
router.get('/:id', getPost);

// auth means user has to be authenticated first to do the action
router.post('/', auth, createPost); // to create a post have to be logged in
// router.get('/:id', getPost); don't need it cause we don't have a separate page for the posts
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;