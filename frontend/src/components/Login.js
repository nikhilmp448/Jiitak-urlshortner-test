import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/token/', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      // You can also store user-related data in local storage or context if needed

      // Redirect or perform any other action after successful login
      history.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;