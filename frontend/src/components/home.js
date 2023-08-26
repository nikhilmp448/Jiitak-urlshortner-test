import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [url, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/stickylink/shortened-urls/', { url });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>URL SHORTNER</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="url" onChange={(e) => setUsername(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Home;
