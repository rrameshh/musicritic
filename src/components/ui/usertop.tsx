import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Container } from "@/components/ui/container.tsx"
import UserRecommendations from '@/components/ui/userrecommendations.tsx'; 

interface TopTrack {
  id: string;
  name: string;
  album: {
    album_type: string;
    id: string;
    name: string;
    images: { url: string }[];
  };
}

interface UserTopProps {
  accessToken: string; // Add accessToken as a prop
}

const UserTop: React.FC<UserTopProps> = ({ accessToken }) => {
  const [userTracks, setUserTracks] = useState<TopTrack[]>([]);
  const [recTracks, setRecTracks] = useState<TopTrack[]>([]);
  const [trackIds, setTrackIds] = useState<string[]>([]);
  
  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted
    const getTopTracks = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + accessToken, // Use accessToken from props
            },
          }
        );

        if (response.ok) {
          const trackData = await response.json();
          setUserTracks(trackData.items);

          // Save userTracks to local storage
          localStorage.setItem('userTracks', JSON.stringify(trackData.items));
        } else {
          console.error(
            `Error fetching playlist info. Status code: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    getTopTracks();
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, [accessToken]); // Add accessToken to dependency array 

  // Retrieve userTracks from local storage on component mount
  useEffect(() => {
    const storedUserTracks = localStorage.getItem('userTracks');
    if (storedUserTracks) {
      setUserTracks(JSON.parse(storedUserTracks));
    }
  }, []);

  return (
    <div className="mt-8">
      <Container>
        <div className="mt-8 text-left">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Your Top Songs
          </h3>
          <Carousel className="w-full max-w-l mt-3 mb-3">
            <CarouselContent>
              {userTracks.map((track) => (
                <CarouselItem key={track.id} className={`md:basis-1/3 lg:basis-1/4 hover:border-primary carousel-item ${track.album.album_type === "ALBUM" ? "album-type-album" : ""}`}>
                  <a href={`/album/${track.album.id}`}>
                    <img 
                      src={track.album.images[1].url} 
                      alt={track.name} 
                      className="border-2 border-transparent hover:border-green-500"
                    />
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {/* Add your code for recommended tracks here */}
        {/* <UserRecommendations trackIds={userTracks}/> */}
      </Container>
    </div>
  );
};

export default UserTop;
