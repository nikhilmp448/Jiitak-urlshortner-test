import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/token/', { email, password });
            // console.log("response" , response.data.access)
            localStorage.setItem('token', response.data.access); // Store the token in state
            navigate("/");

        } catch (error) {
            console.error(error);
        }
    };
  return (
    <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
    </form>
</div>
  )
}

export default Login

