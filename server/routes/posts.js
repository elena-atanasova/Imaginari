import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js';   // we want to add it before specific actions

const router = express.Router();

router.get('/', getPosts); // all users no matter logged in or not can see the posts
router.post('/', auth, createPost); // to create a post have to be logged in
// router.get('/:id', getPost); don't need it cause we don't have a separate page for the posts
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;