import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css'

function LoginForm () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({
            username: 'Demo-lition',
            password: 'password'
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ username, password }))
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
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                // }
            });
    };

    return (
        <div className='session-form-container'>
            <h1>Welcome Back</h1>
            <form onSubmit={handleSubmit} className='login-form'>
                <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
                
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

                <button type="submit">Log In</button>
                <button onClick={demoLogin} className='demo-login'>Demo Login</button>
            </form>
        </div>
    );
};

export default LoginForm;