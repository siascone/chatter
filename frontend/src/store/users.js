import { SET_CURRENT_USER, removeCurrentUser, storeCurrentUser, REMOVE_CURRENT_USER } from "./session";

const RECEIVE_USER = 'users/RECEIVE_USER';
const RECEIVE_USERS = 'users/RECEIVE_USERS';

export const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    }
}
export const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export const endSession = (currentUserId, dispatch) => {
    storeCurrentUser(null);
    return dispatch(removeCurrentUser(currentUserId));
}

export const usersReducer = (state = {}, action) => {
    switch(action.type) {
        // case RECEIVE_USER:

        case SET_CURRENT_USER:
            const nextState = { ...state }
            nextState[action.userId] = action.user
            return nextState;
        case RECEIVE_USERS:
            return { ...state, ...action.users }
        case REMOVE_CURRENT_USER:
            const newState = { ...state }
            delete newState[action.userId]
            return newState
        default:
            return state;

    }
}

