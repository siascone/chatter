import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { 
    receiveMessage, 
    removeMessage, 
    getMessages, 
    createMeassge, 
    destroyMessage } from '../../store/messages';
import { fetchRoom } from '../../store/rooms';
import { receiveUser } from '../../store/users';
import Message from './Message';

function Room () {
    const dispatch = useDispatch();
    const history = useHistory();

    const [body, setBody] = useState('');
    const [usersInRoom, setUsersInRoom] = useState({});

    const { id: roomId } = useParams();

    const messages = useSelector(getMessages(roomId));
    const currentUserId = useSelector(state => state.session.user.id);
    const room = useSelector(state => state.rooms[roomId]);

    const activeMessageRef = useRef(null);
    const messageUlRef = useRef(null);
    const prevRoom = useRef(null);
    const numMessages = useRef(0);

    const activeMessageId = parseInt(history.location.hash.slice(1));
    const usersInRoomArray = Object.values(usersInRoom);

    useEffect(() => {
        if (roomId === prevRoom.current && numMessages.current < messages.length) {
            if (history.location.hash) {
                history.push(history.location.pathname);
                scrollToBottom();
            }
        }
        numMessages.current = messages.length;
    }, [messages, roomId, history])

    useEffect(() => {
        dispatch(fetchRoom(roomId)).then(() => {
            if (activeMessageRef.current) {
                scrollToMessage();
            } else {
                scrollToBottom();
            }
            prevRoom.current = roomId;
        })
    }, [roomId, dispatch]);

    const scrollToBottom = () => {
        messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
    }

    const scrollToMessage = () => {
        activeMessageRef.current.focus();
        activeMessageRef.current.scrollIntoView();
    }

    //TO DO setReaction
}

export default Room;