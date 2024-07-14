import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../scss/styles/login.scss'
import axios from '../utils/axios.js'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/auth/login', {
            email,
            password
        });
        console.log(response.data);
        toast.success("Login successful!");
        navigate('/'); 
    } catch (error) {
        console.error(error);
        toast.error("Login failed!"); 
    }
};
const handleRegisterRedirect = () => {
    navigate('/signup'); // Adjust the path as needed
  };
  return (
    <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button type="submit" className="login-button">Login</button>
                <div className="register-link">
          <p>Don't have an account? <span onClick={handleRegisterRedirect} className="register-link__text">Register</span></p>
        </div>
            </form>
        </div>
    );
};



export default Login
