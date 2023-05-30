import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';

function ProfileButton({user}) {
    const [showMenu, setShowMenu] = useState(false)
    const [userImage, setUserImage] = useState('https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png')

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.username === 'Demo-lition') {
            setUserImage("https://www.slashfilm.com/img/gallery/writer-daniel-waters-favorite-demolition-man-joke-never-made-it-into-the-movie/intro-1676959970.jpg")
        }
    },[])

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
                <img className="profile-button-user-image" src={userImage} alt="" />
                {/* <i className='fa-solid fa-user-circle fa-2x' /> */}
            </button>

            {showMenu && (
                <ul className='profile-menu-details'>
                    <div className='profile-menu-detials-user-details'>
                        <img className="profile-button-user-image" src={userImage} alt="" />
                        <li className='greeting'>{user.username}</li>
                    </div>
                    <div>
                        <button onClick={logout} className='logout-button'>Sign out of Chatter</button>
                    </div>
                </ul>
            )}
        </div>
    );
};

export default ProfileButton;