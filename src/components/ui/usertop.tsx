import React, { useState, useEffect } from "react";

interface TopTrack {
  id: string;
  name: string;
  album: {
    id: string;
    name: string;
    images: { url: string }[];
  };
}

const UserTop: React.FC = () => {
  const [userTracks, setUserTracks] = useState<TopTrack[]>([]);
  const [recTracks, setRecTracks] = useState<TopTrack[]>([]);
  const [trackIds, setTrackIds] = useState<string[]>([]);

  useEffect(() => {
    const getTopTracks = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        if (response.ok) {
          const trackData = await response.json();
          setUserTracks(trackData.items);
          const ids = trackData.items.map((track) => track.id);
          setTrackIds(ids);
          getRecommendations(ids); // Call getRecommendations after user tracks are fetched
        } else {
          console.error(
            `Error fetching playlist info. Status code: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    const getRecommendations = async (trackIds: string[]) => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=${trackIds.join(',')}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        if (response.ok) {
          const recData = await response.json();
          setRecTracks(recData.tracks); // Assuming recommendations are in "tracks" property
        } else {
          console.error(
            `Error fetching recommendations. Status code: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    getTopTracks();

  }, []);

  return (
    <div className="mt-8">
      <div className="mt-8 text-left">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Your Top Songs
        </h3>
        <div className="image-container mt-8">
          {userTracks.map((track) => (
            <div key={track.id} className="inline">
              <img src={track.album.images[1].url} alt={track.name} />
              <p className="leading-7 [&:not(:first-child)]:mt-3 text-center">
                {track.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-left">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Your Next Listen
        </h3>
        <div className="image-container mt-8">
          {recTracks.map((track) => (
            <div key={track.id} className="inline">
              <img src={track.album.images[1].url} alt={track.name} />
              <p className="leading-7 [&:not(:first-child)]:mt-3 text-center">
                {track.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTop;
