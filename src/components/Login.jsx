import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedUserId = userId.trim();
        const trimmedPassword = password.trim();
        console.log(trimmedUserId, trimmedPassword);


        if (trimmedUserId === 'user' && trimmedPassword === 'password') {
            navigate('/home');
        } else {
            alert('Invalid credentials. Please use "user" as UserID and "password" as Password.');
        }
    };

    return (
        <div className="login-container">
            <h1>Fruit.ai</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;