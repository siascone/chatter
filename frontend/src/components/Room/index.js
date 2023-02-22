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
import Message from '../Message/index';
import consumer from '../../consumer';
import './rooms.css'

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
        dispatch(fetchRoom(roomId)).then((currentUsersInRoom = {}) => {
            setUsersInRoom(currentUsersInRoom);
            if (activeMessageRef.current) {
                scrollToMessage();
            } else {
                scrollToBottom();
            }
            prevRoom.current = roomId;
        })

        const subscription = consumer.subscriptions.create(
            { channel: 'RoomsChannel', id: roomId },
            {
                received: ({ type, message, user, id }) => {
                    switch (type) {
                        case 'RECEIVE_MESSAGE':
                            dispatch(receiveMessage(message))
                            dispatch(receiveUser(user))
                            break
                        case 'DESTROY_MESSAGE':
                            dispatch(removeMessage(id))
                            break
                        case 'RECEIVE_USER':
                            setUsersInRoom(prevUsersInRoom => ({ ...prevUsersInRoom, [user.id]: user }))
                            break;
                        case 'REMOVE_USER':
                            setUsersInRoom(prevUsersInRoom => {
                                const { [id]: _removed, ...remainingUsers } = prevUsersInRoom
                                return remainingUsers
                            })
                            break;
                        default:
                            console.log('Unhandled broadcast: ', type)
                            break;
                    }
                }
            }
        )

        return () => subscription?.unsubscribe();
    }, [roomId, dispatch]);

    const scrollToBottom = () => {
        messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
    }

    const scrollToMessage = () => {
        activeMessageRef.current.focus();
        activeMessageRef.current.scrollIntoView();
    }

    const setReaction = (id, reaction) => {
        setUsersInRoom(prevUsersInRoom => ({ ...prevUsersInRoom, [id]: {...prevUsersInRoom[id], reaction } }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        createMeassge({ body, roomId, authorId: currentUserId })
            .then(() => {
                setBody('')
            })
    }

    const handleDelete = messageId => {
        destroyMessage(messageId)
    }

    const generateReactions = (...reactions) => {
        return reactions.map(reaction => (
            <span 
                key={reaction}
                className="reaction"
                onClick={() => setReaction(currentUserId, reaction)}
            >
                {reaction}
            </span>
        ))
    }

    return (
        <div className='room-main'>
            <section className='room-section'>
                <h1>Room: {room?.name}</h1>

                <ul ref={messageUlRef}>
                    {messages.map(message => (
                        <li
                            key={message.id}
                            ref={activeMessageId === message.id ? activeMessageRef : null}
                            tabIndex={-1}
                        >
                            <Message {...message} />
                            {message.authorId === currentUserId && (
                                <button 
                                    className='btn-delete'
                                    onClick={() => handleDelete(message.id)}
                                >
                                    x
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit} className='message-send-form'>
                    <textarea
                        rows={body.split('\n').length}
                        placeholder={`Message #${room.name}`}
                        onChange={e => setBody(e.target.value)}
                        onKeyDown={e => {
                            if(e.code === 'Enter' && !e.shiftKey) {
                                handleSubmit(e)
                            }
                        }}
                        value={body}
                    />
                    <div className='message-controls'>
                        <div>
                            {generateReactions('👍', '❤️', '🔥', '😡')}
                        </div>
                        <button className='btn-primary' disabled={!body}>
                            Send Message
                        </button>
                    </div>
                </form>
            </section>
            <section className='online-users-section'>
                <h2>In Room</h2>
                <ul>
                    {usersInRoomArray.map(({ id, username, reaction }) => (
                        <li key={id} className={currentUserId === id ? 'current' : ''}>
                            <span className='reaction'>{reaction}</span>
                            <span>{username}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default Room;