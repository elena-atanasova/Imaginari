import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, COMMENT } from '../constants/actions';
import * as api from '../api'; // import everything from the actions as api

export const getPost = (id) => async (dispatch) => {            // dealing with async logic, thus the syntax, thunk
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

// Action Creators - return actions
export const getPosts = (p) => async (dispatch) => {            // dealing with async logic, thus the syntax, thunk
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(p);
        
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
}

export const createPost = (p, nav) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(p);
        nav(`/posts/${data._id}`);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }

}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (v, id) => async (dispatch)  => {
    try {
        const { data } = await api.comment(v, id);
        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, p) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, p); // returns the updated post
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}



