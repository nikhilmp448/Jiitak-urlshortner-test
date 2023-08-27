/* eslint-disable */ 
import { useState , useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Registration from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  const [access, setAccessToken] = useState(localStorage.getItem('token') || '');
  const [refresh, setRefreshToken] = useState(localStorage.getItem('refresh') || '');
  const [accessTokenExpiry, setAccessTokenExpiry] = useState(localStorage.getItem('accessTokenExpiry') || 0);

  const isAccessTokenExpired = () => {
    return Date.now() > accessTokenExpiry;
  };
  const refreshAccessToken = async () => {
    try {
      const response = await fetch('http://localhost:8000/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({ refresh }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access);
        setAccessTokenExpiry(Date.now() + data.expiresIn * 1000); // Set new expiration time
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh', data.refresh);

        localStorage.setItem('accessTokenExpiry', accessTokenExpiry);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Error refreshing access token:', error.message);
    }
  };
  useEffect(() => {
    if (isAccessTokenExpired() && refresh) {
      refreshAccessToken();
    }
  }, [access, refresh]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><Registration /></PublicRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
