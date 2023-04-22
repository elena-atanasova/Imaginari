import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH } from '../constants/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case DELETE:
            return state.filter((post) => post._id !== action.payload);
        case UPDATE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currPage: action.payload.currPage,
                totalPages: action.payload.totalPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case CREATE:
            return [...state, action.payload];

        default:
            return state;
    }
}