import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/protected" element={<ProtectedRoute token={token} />} />
                <Route path="/" element={<div>Home</div>} />
            </Routes>
        </Router>
    );
}

export default App;
