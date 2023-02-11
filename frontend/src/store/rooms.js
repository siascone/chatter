import { receiveMessages } from './messages';
import { receiveUsers } from './users';
import { csrfFetch } from './csrf';

const RECEIVE_ROOM = 'rooms/RECEIVE_ROOM';
const RECEIVE_ROOMS = 'rooms/RECEIVE_ROOMS';
const REMOVE_ROOM = 'rooms/REMOVE_ROOM';

export const receiveRoom = room => {
    debugger
    return {
        type: RECEIVE_ROOM, 
        room
    }
}

export const receiveRooms = rooms => {
    return {
        type: RECEIVE_ROOMS,
        rooms
    }
}

export const removeRoom = roomId => {
    return {
        type: REMOVE_ROOM,
        roomId
    }
}

export const fetchRooms = () => async dispatch => {
    return csrfFetch('/api/rooms')
        .then(({rooms, users}) => {
            dispatch(receiveRooms(rooms))
            dispatch(receiveUsers(users))
        })
}

export const fetchRoom = roomId => async dispatch => {
    return csrfFetch(`/api/rooms/${roomId}`)
        .then(({room, messages, users}) => {
            dispatch(receiveMessages(messages))
            dispatch(receiveRoom(room))
            dispatch(receiveUsers(users))
        })
}

export const createRoom = room => async dispatch => {
    const res = await csrfFetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify(room)
    })

    if (res.ok) {
        const data = await res.json();
        debugger
        dispatch(receiveRoom(data))
    }

    // return csrfFetch('/api/rooms', {
    //     method: 'POST',
    //     body: JSON.stringify(room)
    // }).then(room => dispatch(receiveRoom(room)))

    return res
}

export const destroyRoom = roomId => async dispatch => {
    return csrfFetch(`/api/rooms/${roomId}`, {
        method: 'DELETE'
    }).then(() => dispatch(removeRoom(roomId)))
}

export const roomsReducer = (state ={}, action) => {
    switch(action.type) {
        case RECEIVE_ROOM:
            debugger
            const { room } = action;
            return { ...state, [room.id]: room} 
        case RECEIVE_ROOMS:
            return { ...state, ...action.rooms }
        case REMOVE_ROOM:
            const newState = { ...state }
            delete newState[action.roomId]
            return newState
        default:
            return state
    }
}

export default roomsReducer;