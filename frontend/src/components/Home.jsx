import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Home = () => {
        const [url, setUsername] = useState('');
        const [shortUrl, setShortUrl] = useState('');
        const navigate = useNavigate();

        const redirect = (url)=>{
            if(url){
                navigate(url)
            }
            else{
                console.log("failure")
            }
        }
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:8000/stickylink/shortened-urls/', { url },
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
                );
                console.log(response.data);
                setShortUrl(response.data.shorten_url)
                
            } catch (error) {
                console.error(error);
            }
        };

        const handleLogout = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8000/logout/',
                    { refresh_token: localStorage.getItem('refresh') }
                );
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    navigate("/login")
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error(error);
            }
        }
        
        
  return (
    <div>
        <h2>JIITAK URL SHORTNER</h2>
        <button onClick={handleLogout}>Logout</button>
             <form onSubmit={handleSubmit}>
                <input type="text" placeholder="url" onChange={(e) => setUsername(e.target.value)} />
                 <button type="submit">get url</button>
             </form>

        <h1>SHORTEN URL: &#10549;</h1>
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
      </div>
  )
}

export default Home
