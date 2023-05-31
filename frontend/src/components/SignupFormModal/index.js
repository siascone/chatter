import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal(props) {
    const [showModal, setShowModal] = useState(false);

    let klass = 'session-button signup'

    if (props.splash) {
        klass = 'splash-signup-button'
    }

    const openModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowModal(true)
    }

    return (
        <div>
            <button onClick={openModal} className={klass}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </div>
    )
};

export default SignupFormModal;