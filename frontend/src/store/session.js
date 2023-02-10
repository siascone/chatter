import { csrfFetch } from "./csrf.js";
import { endSession } from "./users.js";

export const SET_CURRENT_USER = 'session/setCurrentUser';
export const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user: user,
        userId: user.id
    }
};

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
});

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const login = ({ username, password }) => async dispatch => {
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
    }

    return response;
};

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    if (data.user) dispatch(setCurrentUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    if (response.ok) {
        const data = await response.json();
        storeCurrentUser(data.user);
        dispatch(setCurrentUser(data.user));
    }
    
    return response;
};

export const logout = () => async (dispatch, getState) => {
    const response = await csrfFetch("/api/session", {
        method: "DELETE"
    }).then(() => {
        storeCurrentUser(null);
        dispatch(removeCurrentUser());

    }).catch(error => {
        if (error.status === 401) {
            return endSession(getState().session.user.id, dispatch)
        }
    })

    return response;
};

const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.user };
        case REMOVE_CURRENT_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default sessionReducer;