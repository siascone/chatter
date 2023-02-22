import { receiveMessages } from './messages';
import { receiveUsers } from './users';
import { csrfFetch } from './csrf';

const RECEIVE_ROOM = 'rooms/RECEIVE_ROOM';
const RECEIVE_ROOMS = 'rooms/RECEIVE_ROOMS';
const REMOVE_ROOM = 'rooms/REMOVE_ROOM';

export const receiveRoom = room => {
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
    const res = await csrfFetch('/api/rooms')

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveRooms(data.rooms))
        dispatch(receiveUsers(data.users))
    }
   
    //     .then(({rooms, users}) => {
    //         dispatch(receiveRooms(rooms))
    //         dispatch(receiveUsers(users))
    //     })
    return res
}

export const fetchRoom = roomId => async dispatch => {
    const res = await csrfFetch(`/api/rooms/${roomId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(receiveMessages(data.messages))
        dispatch(receiveRoom(data.room))
        dispatch(receiveUsers(data.users))
    }

    return res
    // .then(({room, messages, users}) => {
    //     dispatch(receiveMessages(messages))
    //     dispatch(receiveRoom(room))
    //     dispatch(receiveUsers(users))
    // })
}

export const createRoom = room => async dispatch => {
    const res = await csrfFetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify(room)
    })

    if (res.ok) {
        const data = await res.json();
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