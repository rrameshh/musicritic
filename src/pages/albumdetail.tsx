import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@/components/ui/container'
import { Navbar } from '@/components/ui/navbar.tsx'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import { Log } from '@/Log.tsx'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import axios from 'axios';

const CLIENT_ID = "15eb54ac806d4ec8b0448b6f3c61dfd7";
const CLIENT_SECRET = "dec97a90628a478fa9106f18163cff87";

const AlbumDetailPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  

  useEffect(() => {
    async function getAlbumInfo(id) {
      const baseUrl = "https://api.spotify.com/v1/albums/";
      const url = `${baseUrl}${id}`;

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
        // let accessToken = localStorage.getItem('access_token');
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const albumData = response.data;
          setAlbum(albumData);
        } else {
          console.error(`Error fetching album info. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    }

    getAlbumInfo(id);
  }, [id]);

  return (
    <div>
      <Container>
        <Navbar />
        {/* Render album data */}
        {album && (
          <div className="flex-container mt-6">
            <div className="one">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-left mb-4">
                {album.name}
              </h1>
              <div className="flex items-center rounded-lg border-white"> {/* Container to place items on the same line */}
                <img src={album.images[1].url} alt={album.name} />
                <div className="ml-4 mt-3"> {/* Adding left margin for spacing */}
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left">
                    <Badge>Artist: {album.artists.map(artist => artist.name).join(", ")}</Badge>
                  </h3>
                  <h4 className="text-sm text-muted-foreground text-left mt-2">
                    Release date: {album.release_date}
                  </h4>
                  <p className="text-sm text-muted-foreground text-left">
                    Genres: {album.genres.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground text-left">
                    Popularity: {album.popularity}
                  </p>
                  <div className='mt-4'>
                  <Dialog>
                    <DialogTrigger asChild>
                            <Button>Toggle Log</Button> 
                        </DialogTrigger>
                        <DialogContent>
                        <Log albumId={album.id} albumName={album.name} />
                        </DialogContent>
                    </Dialog>

                  </div>
                 
                </div>
              </div>
            </div>
            <div className="two"></div>
            <div className="three">
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AlbumDetailPage;
