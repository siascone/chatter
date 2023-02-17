import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { createRoom, destroyRoom, fetchRooms } from '../../store/rooms';

function RoomsIndex() {

    const [name, setName] = useState('');

    const history = useHistory();

    const currentUserId = useSelector(state => {
        let id = null;
        if (state.session.user) {
            id = state.session.user.id
        }
        return id;
    })
    const rooms = useSelector(state => Object.values(state.rooms));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRooms())
    }, [dispatch])

    const createNewRoom = e => {
        e.preventDefault();
        dispatch(createRoom({ ownerId: currentUserId, name }))
        setName('');
    }

    if (!currentUserId) {
        history.push('/')
    }

    return (
        <section className='rooms-index'>
            <h1>Rooms</h1>
            {!!currentUserId &&
                <form onSubmit={createNewRoom} className='new-room-form'>
                    <input
                        type="text"
                        placeholder='add a room'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button className='btn-primary' disabled={!name}>
                        +
                    </button>
                </form>
            }
            <ul className='rooms-index-list'>
                {rooms.map(({ id, name, ownerId }) => (
                    <li key={id}>
                        <NavLink to={currentUserId ? `/rooms/${id}` : '/rooms'}>
                            #{name}
                        </NavLink>
                        {ownerId === currentUserId && (
                            <button 
                                className="btn-delete"
                                onClick={() => dispatch(destroyRoom(id))}
                            >
                                x
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            
        </section>
    )

}

export default RoomsIndex