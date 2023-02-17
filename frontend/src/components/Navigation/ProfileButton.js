import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';

function ProfileButton({user}) {
    const [showMenu, setShowMenu] = useState(false)

    const dispatch = useDispatch();

    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // }

    useEffect(() => {
        if (!showMenu) return;
        
        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);

    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
    }

    return (
        <div className='profile-menu-main'>
            <button onClick={() => setShowMenu(!showMenu)} className='profile-button'>
                <i className='fa-solid fa-user-circle fa-2x' />
            </button>

            {showMenu && (
                <ul className='profile-menu-details'>
                    <li className='greeting'>Hey <span className='italic-span'>{user.username}</span></li>
                    {/* <li>{user.email}</li> */}
                    <li>
                        <button onClick={logout} className='logout-button'>Log Out</button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProfileButton;