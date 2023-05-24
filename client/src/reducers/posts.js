// using constants to prevent misspelling and bugs
import { FETCH_ALL, CREATE, UPDATE, FETCH_POST, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT } from '../constants/actions';


export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {

        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currPage: action.payload.currPage,
                totalPages: action.payload.totalPages,
            };

        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };

        case FETCH_POST:
            return { ...state, post: action.payload };

        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };

        case COMMENT:
            return {
                // for every post map
                ...state, posts: state.posts.map((post) => {

                    // return all the other posts normally
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }

                    // change the post that just received a comment
                    return post;
                })
            };

        case CREATE:
            return { ...state, posts: [...state, action.payload] };

        // return default
        default:
            return state;
    }
}