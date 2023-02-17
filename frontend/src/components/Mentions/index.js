import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { fetchMentions, readMention, receiveMention, getMentions } from '../../store/mentions';
import { receiveMessage } from '../../store/messages'
import { receiveUser } from '../../store/users';
import Message from '../Message/index.js'
import Dropdown from '../Dropdown/index.js'
import consumer from '../../consumer';

function Mentions() {
    
    const [hasUnseen, setHasUnseen] = useState(false);
    
    const { mentions, numUnread } = useSelector(getMentions());

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMentions())
        
        const subscription = consumer.subscriptions.create(
            { channel: 'MentionsChannel' },
            {
                received: (({ type, mention, message, user }) => {
                    switch(type) {
                        case 'RECEIVE_MENTION':
                            dispatch(receiveMention(mention))
                            dispatch(receiveMessage(message))
                            dispatch(receiveUser(user))
                        default:
                            console.log('Unhandled broadcast: ', type)
                    }
                })
            }
        )

        return () => subscription?.unsubscribe();
    }, [dispatch]);

    return (
        <Dropdown
            className={'mentions' + (hasUnseen ? ' unseen' : '')}
            render={({toggleOpen, isOpen }) => (
                <>
                    {numUnread > 0 && (
                        <span className='unread-counter'>
                            {numUnread}
                        </span>
                    )}

                    <FontAwesomeIcon 
                        icon={faBell}
                        className={'mentions__button' + (hasUnseen ? ' unseen' : '')}
                        onClick={() => {
                            setHasUnseen(false)
                            toggleOpen();
                        }}
                    />

                    <ul className='dropdown' hidden={!isOpen}>
                        {mentions.length === 0 && <span>No unread mentions</span>}
                        {mentions.map(({id, read, message, room}) => (
                            <Link 
                                key={id}
                                to={{
                                    pathname: `/rooms/${room.id}`,
                                    hash: `#${message.id}`
                                }}
                                onClick={() => !read && dispatch(readMention(id))}
                            >
                                <li className={read ? 'read' : ''}>
                                    <Message {...message} />
                                    <div className='mention-right'>
                                        <span>{room.name}</span>
                                        {!read && (
                                            <button 
                                                className='btn-primary'
                                                onClick={e => e.preventDefault()}
                                            >
                                                Mark Read
                                            </button>
                                        )}
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </>
            )}
        />
    )

}

export default Mentions;