import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import ProfileButton from './ProfileButton';

import './Navigation.css'
import Mentions from '../Mentions/index.js';

function Navigation() {
    const currentUser = useSelector(state => state.session.user)

    let sessionLinks;
    let mentions = null;

    if (currentUser) {
        mentions = <>
            {/* <Mentions /> */}
        </>
    }

    if (currentUser) {
        sessionLinks = (
            <div className='nav-right-logged-in'>
                {mentions}
                <ProfileButton user={currentUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className='nav-right-logged-out'>
                <LoginFormModal />
                <SignupFormModal />
            </div>
        );
    };



    return (
        <div className='nav-bar'>
            <div className='nav-left'>
                
                <NavLink exact to='/rooms' className='home-link'><div className='logo'></div> <span>CHATTER</span></NavLink>
            </div>
            {sessionLinks}
        </div>
    )
}

export default Navigation;