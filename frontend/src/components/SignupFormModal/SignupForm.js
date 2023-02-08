import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'
import './SignupForm.css'

function SignupForm () {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);

        return dispatch(sessionActions.signup({ email, password, username }))
            .then(async (res) => {
                if (!res.ok) {
                    let data;
                    try {
                        // .clone() essentially allows you to read the response body twice
                        data = await res.clone().json();
                    } catch {
                        data = await res.text(); // Will hit this case if, e.g., server is down
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                }
            });
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>

                <label>Email:
                    <input 
                        type="text" 
                        placeholder="Email"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label>Username:
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label>Password:
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default SignupForm;