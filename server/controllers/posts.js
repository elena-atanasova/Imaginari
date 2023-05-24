// create all the handlers for the routes
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js'

export const getPost = async (request, response) => {
    const { id } = request.params;

    try {

        const post = await PostMessage.findById(id);
        response.status(200).json(post);

    } catch (error) {

        response.status(404).json({ message: error.message });

    }
}

export const getPosts = async (request, response) => {
    const { page } = request.query;
    try {

        const LIMIT = 8;   // max number of posts per page
        const startIndex = (Number(page) - 1) * LIMIT;   // get the starting index of every page
        const total = await PostMessage.countDocuments({});
        // retriving all the messages that are in the database; it takes time so it is an asynchonious action, meaning we have to add 'await' and 'async'
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        response.status(200).json({ data: posts, currPage: Number(page), totalPages: Math.ceil(total / LIMIT) });

    } catch (error) {
        response.status(404).json({ message:error.message });
    }

}

// QUERY -> /posts?page=1 -> page = 1
// PARAMS -> /posts/123 -> id = 123

export const getPostsBySearch = async (request, response) => {
    const { searchQuery, tags } = request.query;

    try {

        const title = new RegExp(searchQuery, 'i');  // i flag means ignore case
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        response.json({ data: posts });

    } catch (error) {

        response.status(404).json({ message: error.message });

    }
}

export const createPost = async (request, response) => {
    const post = request.body;
    const newPostMessg = new PostMessage({ ...post, creator: request.userId, createdAt: new Date().toISOString() });

    try {

        await newPostMessg.save();
        response.status(201).json(newPostMessg);

    } catch (error) {

        response.status(409).json({ message:error.message });

    }
}


export const deletePost = async (request, response) => {
    const { id } = request.params;

    // error message
    if (!mongoose.Types.ObjectId.isValid(id)) return response.status(404).send('Post with that id does not exist');

    await PostMessage.findByIdAndRemove(id);

    response.json({ message: 'Post deleted successfully' });
}


export const likePost = async (request, response) => {
    const { id } = request.params;

    // logic for ensuring a user can like a post only once
    if (!request.userId) return response.json({ message: 'Unauthenticated user' });

    // error message
    if (!mongoose.Types.ObjectId.isValid(id)) return response.status(404).send('Post with that id does not exist');

    const post = await PostMessage.findById(id);

    // check if already liked, so should be dislike button not like
    const index = post.likes.findIndex((id) => id === String(request.userId));
    if (index === -1) {
        // like the post
        post.likes.push(request.userId);
    } else {
        // dislike post
        post.likes = post.likes.filter((id) => id !== String(request.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    response.json(updatedPost);
}

export const commentPost = async (request, response) => {
    const { id } = request.params;
    const { value } = request.body;
    const post = await PostMessage.findById(id);

    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    response.json(updatedPost);
}


export const updatePost = async (request, response) => {
    const { id: _id } = request.params;  // when make request -> /posts/123 -> 123 is id
    const post = request.body;

    // error message
    if (!mongoose.Types.ObjectId.isValid(_id)) return response.status(404).send('Post with that id does not exist');
    // empty
    { }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    response.json(updatedPost);
}
