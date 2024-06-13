import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container.tsx';
import { Navbar } from '@/components/ui/navbar.tsx';
import { Input } from '@/components/ui/input';
import AlbumCovers from '@/pages/results.tsx';
import axios, { AxiosResponse } from 'axios';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// const CLIENT_ID = process.env.REACT_APP_API_KEY;
// const CLIENT_SECRET = process.env.REACT_APP_API_SECRET;



interface ImageObject {
    url: string;
}

interface Album {
    id: string;
    name: string;
    images: ImageObject[]; // Assuming you have an array of URLs for album covers
  }

export function Searchbar() {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  
  const [searchInput, setSearchInput] = useState<string>('');
  const [albums, setAlbums] = useState<Album[]>([]); // Specify the type of albums

  // const navigate = useNavigate();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Execute your search function or any action here
      search();
      console.log(albums);
      console.log('Enter key pressed');
      // navigate(`/results`, { state: { albums } });
    }
  };

  useEffect(() => {
    console.log(albums);
  }, [albums]);

  const search = async () => {
    try {
      const authResponse: AxiosResponse<any> = await axios.post( // Specify the AxiosResponse type
        'https://accounts.spotify.com/api/token',
        `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const accessToken: string = authResponse.data.access_token;
      localStorage.setItem('accessToken', accessToken);

      const artistResponse: AxiosResponse<any> = await axios.get( // Specify the AxiosResponse type
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const artistId: string | undefined = artistResponse.data.artists.items[0]?.id;

      if (artistId) {
        const albumsResponse: AxiosResponse<any> = await axios.get( // Specify the AxiosResponse type
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
        <body>
          <AlbumCovers albums={albums} searchInput={searchInput} />
        </body>

    </>
    // </Router>
  );
}

export default Searchbar;
