import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton';

import './Navigation.css'

function Navigation() {
    const sessionUser = useSelector(state => state.session.user)

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className='session-links'>
                <LoginFormModal />
                <SignupFormModal />
            </div>
        );
    };

    return (
        <div className='nav-bar'>
            <NavLink exact to='/' className='home-link'>CHATTER</NavLink>
            {sessionLinks}
        </div>
    )
}

export default Navigation;