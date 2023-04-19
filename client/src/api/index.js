import axios from 'axios';  // use to make api calls

const url = 'http://localhost:5000/posts';  // the url pointing to the backend route

export const fetchPosts = () => axios.get(url); // get the posts
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);