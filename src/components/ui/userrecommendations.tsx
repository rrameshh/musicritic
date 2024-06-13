import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container.tsx";

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

const UserRecommendations: React.FC<{ trackIds: TopTrack[] }> = ({ trackIds }) => { // Corrected function parameter declaration
  const [userReccs, setUserReccs] = useState<TopTrack[]>([]);
   console.log(trackIds);
  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?limit=20&seed_tracks=${trackIds.map(track => track.id).join(',')}`, // Fixed missing map operation
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        if (response.ok) {
          const reccData = await response.json();
          setUserReccs(reccData.items);
          console.log(userReccs);
        } else {
          console.error(
            `Error fetching track info. Status code: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    getRecommendations();
  }, []); // Added trackIds as dependency
  // }, [trackIds, localStorage.getItem("access_token")]); // Added trackIds as dependency

  return (
    <Container>
      <div className="mt-8">
        <div className="mt-8 text-left">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Recommended Tracks
          </h3>
          <Carousel className="mt-8">
            <CarouselContent>
              {userReccs.map((track) => (
                track.album.album_type === "ALBUM" ? (
                  <CarouselItem
                    key={track.id}
                    className="md:basis-1/3 lg:basis-1/4 carousel-item"
                  >
                    <Link to={`/album/${track.album.id}`}>
                      <img src={track.album.images[1].url} 
                      alt={track.name} 
                      className="hover:border-primary border-transparent border-2"/>
                    </Link>
                    {/* <p className="leading-7 mt-3 text-center">{track.name}</p> */}
                  </CarouselItem>
                ) : (
                  <CarouselItem
                    key={track.id}
                    className="md:basis-1/3 lg:basis-1/4 carousel-item"
                  >
                    <img src={track.album.images[1].url} alt={track.name} />
                    {/* <p className="leading-7 mt-3 text-center">{track.name}</p> */}
                  </CarouselItem>
                )
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </Container>
  );
};

export default UserRecommendations;
