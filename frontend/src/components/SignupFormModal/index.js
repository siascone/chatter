import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowModal(true)
    }

    return (
        <div>
            <button onClick={openModal} className='session-button signup'>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </div>
    )
};

export default SignupFormModal;