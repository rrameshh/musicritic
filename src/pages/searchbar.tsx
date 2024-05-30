import { useState, useEffect } from 'react'
import {Log} from '@/Log.tsx'
import{Container} from '@/components/ui/container.tsx'
import {Navbar} from '@/components/ui/navbar.tsx'
// import { useNavigate } from 'react-router-dom'
import {Input} from '@/components/ui/input'
import AlbumCovers from '@/pages/results.tsx'
import axios from 'axios'
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// const CLIENT_ID = process.env.REACT_APP_API_KEY;
// const CLIENT_SECRET = process.env.REACT_APP_API_SECRET;


const CLIENT_ID = "15eb54ac806d4ec8b0448b6f3c61dfd7";
const CLIENT_SECRET = "dec97a90628a478fa9106f18163cff87";

export function Searchbar() {
    const [searchInput, setSearchInput] = useState('');
    const [albums, setAlbums] = useState([]);

    // const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Execute your search function or any action here
            
            search();
            console.log(albums);
            console.log('Enter key pressed');
            // navigate(`/results`, { state: { albums } });
            
            

        }
    };

    // const navigateToHome = () => {
    //     navigate('/');
    // }

//     useEffect (() => {
//         var authParameters = {
//             body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET,
//             headers: {
//                 'Content-type': 'application/x-www-form-urlencoded'
//             },
//               method: 'POST',
            
//         }
//         fetch('https://accounts.spotify.com/api/token', authParameters)
//         .then(result => result.json())
//         .then(data => setAccessToken(data.access_token))
//     }, [])

//     async function search()  {
//         console.log("Search for "+ searchInput);
//         var searchParameters = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + accessToken
//             }
//         }
//         console.log(accessToken);
//         var artistID = await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=artist', searchParameters)
//             .then(response => response.json())
//             .then(data => {return data.artists.items[0].id})

//             console.log("Artist ID is " + artistID);
//         var albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=albums&market=US&limit=50')
//             .then(response => response.json())
//             .then(data => {
//             console.log(data);
//             setAlbums(data.items);
//         });
//     }

//   console.log(albums);



// const search = async () => {
//     console.log(searchInput);
//     try {
//         const authResponse = await axios.post(
//             'https://accounts.spotify.com/api/token',
//             `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
                
//             }
//         );

//         const accessToken = authResponse.data.access_token;
//         console.log(accessToken);

//         const artistResponse = await axios.get(
//             `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );

//         const artistId = artistResponse.data.artists.items[0].id;
//         console.log(artistId);

//         const albumsResponse = await axios.get(
//             `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=10`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );

//         setAlbums(albumsResponse.data.items);
//         console.log(albums);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };
useEffect(() => {
    console.log(albums);
}, [albums]);

const search = async () => {
    try {
        const authResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const accessToken = authResponse.data.access_token;
        localStorage.setItem('accessToken', accessToken);

        const artistResponse = await axios.get(
            `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const artistId = artistResponse.data.artists.items[0]?.id;
        

        if (artistId) {
            const albumsResponse = await axios.get(
                `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=10`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setAlbums(albumsResponse.data.items);
        } else {
            console.error('No artist found.');
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



  return (
    // <Router>    
        <> 
        
        <Container>
        <Navbar />
        <div className="items-center justify-end" style={{ paddingTop: '20px' }}>
        <Input 
        type="search" 
        placeholder="Search for an Artist..." 
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyPress}
        />
        </div>
        <body >
            <AlbumCovers albums={albums} searchInput={searchInput}/>    
        </body>
        </Container>
        </>
       
        
      )
}

export default Searchbar;
