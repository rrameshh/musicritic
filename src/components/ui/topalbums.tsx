import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Playlist {
  id: string;
  tracks: {
    items: {
      track: {
        album: {
          id: string;
          name: string;
          images: { url: string }[];
        };
        id: string;
      };
    }[];
  };
}

export const TopAlbums: React.FC = () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET= import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const playlistIds: string[] = ["37i9dQZEVXbKCOlAmDpukL", "12sDF4RTu8jG3ltTnqsDGZ"];
  const Titles: string[] = ["My personal favs", "Today's Top Hits"];
  const [playlists, setPlaylists] = useState<{ [key: string]: Playlist }>({});

  useEffect(() => {
    async function getTopPlaylist(id: string) {
      const baseUrl: string = "https://api.spotify.com/v1/playlists/";
      const url: string = `${baseUrl}${id}`;

      try {
        const authResponse: AxiosResponse<any> = await axios.post(
          'https://accounts.spotify.com/api/token',
          `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const accessToken: string = authResponse.data.access_token;
        const response: AxiosResponse<Playlist> = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const playlistData: Playlist = response.data;
          setPlaylists(prevState => ({
            ...prevState,
            [id]: playlistData,
          }));
        } else {
          console.error(`Error fetching playlist info. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error("An error occurred:", (error as Error).message);
      }
    }

    playlistIds.forEach(id => getTopPlaylist(id));
  }, []);

  return (
  
    
    <div className='mt-6 text-left'>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
      Welcome to Spotiboxd!
      </h1>
      {Object.keys(playlists).map((id, index) => (
        <div key={id} className="mt-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {Titles[index]}
          </h3>
          <Carousel
            key={id}
            opts={{
              align: "start",
            }}
            className="w-full max-w-l mt-3 mb-3"
          >
            <CarouselContent >
              {playlists[id].tracks.items.map((item, idx) => {
                const album = item.track.album;
                const albumType: string = album ? album.name : 'Unknown';
                const albumImg: string = album ? album.images[0].url : 'Unknown';

                return (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 carousel-item border hover:border-primary">
                    <Link to={`/album/${album.id}`}>
                      {albumImg !== 'Unknown' ? (
                        <img src={albumImg} alt={albumType} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl font-semibold tracking-tight">No Image Available</span>
                      )}
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default TopAlbums;
