import React, { useEffect, useState } from 'react';
import './Splash.css'
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import { fetchAllUsers } from '../../store/users';
import { useDispatch, useSelector } from 'react-redux';

function Splash() {
    const [userCount, setUserCount] = useState(0)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchAllUsers())
    }, [])

    useEffect(() => {
        setUserCount(Object.values(users).length)
    }, [users])

    return (
        <div className='splash-main'>
            <div className='splash-inner'>
                <h1>Welcome</h1>
                
                <div className='splash-login'>
                    <h2>Your workspace</h2>
                    <div className='splash-login-inner'>
                        <div className='workspace'>
                            <div className='logo-large'></div> 
                            <div className='workspace-details'>
                                <h2>Chatter 4 All</h2>
                                <p>{userCount} members</p>
                            </div>
                        </div>
                        <LoginFormModal splash={true} buttonText='LAUNCH CHATTER'/>
                    </div>
                </div>

                <div className='splash-signup'>
                    <p>New to Chatter?</p>
                    <SignupFormModal splash={true}/>
                </div>

                <div className='how-to-use'>
                    <p>Learn how to use Chatter for work</p>
                    <div className='how-to-use-container'>
                        <div>
                            Solutions
                        </div>
                        <div>
                            Blog
                        </div>
                        <div>
                            Blog
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <div className='footer-1'>
                        Developer
                    </div>
                    <div className='footer-2'>
                        Technologies
                    </div>
                    <div className='footer-3'>
                        Resources
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Splash;