import { AUTH } from '../constants/actions';
import * as api from '../api/index.js';

export const signup = (formData, nav) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });
        nav('/');
    } catch (error) {
        console.log(error);
    }
}

export const signin = (formData, nav) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
        nav('/');
    } catch (error) {
        console.log(error);
    }
}

