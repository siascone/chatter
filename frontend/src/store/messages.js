import { csrfFetch } from "./csrf";

const RECEIVE_MESSAGE = 'messages/RECEIVE_MESSAGE';
const RECEIVE_MESSAGES = 'messages/RECEIVE_MESSAGES';
const REMOVE_MESSAGE = 'messages/REMOVE_MESSAGE';

export const receiveMessage = message => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export const receiveMessages = messages => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    }
}

export const removeMessage = messageId => {
    return {
        type: REMOVE_MESSAGE,
        messageId
    }
}

export const getMessages = roomId => state => {
    return Object.values(state.messages)
        .filter(message => message.roomId === parseInt(roomId))
        .map(message => ({
            ...message,
            author: state.users[message.authorId]?.username
        }))
        .sort(({ createdAt: timeA }, { createdAt: timeB }) => Math.sign(new Date(timeA).getTime() - new Date(timeB).getTime()))
}

export const createMeassge = message => {
    return csrfFetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(message)
    })
}

export const destroyMessage = messageId => {
    csrfFetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
    })
}

export const messagesReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_MESSAGE:
            const { message } = action;
            return { ...state, [message.id]: message }
        case RECEIVE_MESSAGES:
            return { ...state, ...action.messages }
        case REMOVE_MESSAGE:
            const newState = { ...state }
            delete newState[action.messageId]
            return newState
        default:
            return state
    }
}

