import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal(props) {
    const [showModal, setShowModal] = useState(false);

    let text = 'Log In'
    let klass = 'session-button login'

    if (props.buttonText) {
        text = props.buttonText
    }

    if (props.splash) {
        klass = 'splash-login-button'
    }
    
    const openModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowModal(true)
    }

    return (
        <div>
            <button onClick={openModal} className={klass}>{text}</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </div>
    )
};

export default LoginFormModal;