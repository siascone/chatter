import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session'
import './SignupForm.css'

function SignupForm () {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({
            username: 'Demo-lition',
            password: 'password'
        })).then(() => {
            history.push('/rooms')
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);

        return dispatch(sessionActions.signup({ email, password, username }))
            .then(() => {
                history.push('/rooms')
            })
            .catch(async (res) => {
                // if (!res.ok) {
                    let data;
                    try {
                        // .clone() essentially allows you to read the response body twice
                        data = await res.clone().json();
                    } catch {
                        data = await res.text(); // Will hit this case if, e.g., server is down
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors(data);
                    else setErrors([res.statusText]);
                // }
            });
    };

    return (
        <div className='session-form-container'>
            <h1>Join the CHATTER; make some noise!</h1>
            <form onSubmit={handleSubmit} className='signup-form'>
                <ul>
                    {
                        errors.map((error, i) => {
                            return <li key={i}>{error}</li>
                        })
                    }
                </ul>

                <input 
                    type="text" 
                    placeholder="Email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Sign Up</button>
                <button onClick={demoLogin} className='demo-login'>Demo Login</button>
            </form>
        </div>
    );
};

export default SignupForm;