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
                const response = await axios.post('http://localhost:8000/stickylink/shortened-urls/', { url });
                console.log(response.data);
                setShortUrl(response.data.shorten_url)
                
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

        {/* <h2 onClick={redirect(shortUrl)}>SHORTEND URL : {shortUrl}</h2> */}
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">SHORTENED URL: {shortUrl}</a>
      </div>
  )
}

export default Home
