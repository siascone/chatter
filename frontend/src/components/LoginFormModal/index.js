import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowModal(true)
    }

    return (
        <div>
            <button onClick={openModal} className='session-button login'>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </div>
    )
};

export default LoginFormModal;