import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import '../scss/styles/signup.scss'
import axios from '../utils/axios.js';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }
        try {
            const response = await axios.post('/auth/signup', {
                name: username,
                email,
                password,
                confirmpassword: confirmPassword
            });
            console.log(response.data);
            toast.success("Registration successful!");
            navigate("/login")
        } catch (error) {
            console.error(error);
            toast.error("Registration failed!");
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };
      
    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
                <div className="login-link">
                    <p>Already have an account? <span onClick={handleLoginRedirect} className="login-link__text">Sign In</span></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp
