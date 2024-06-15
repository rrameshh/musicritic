

import { access } from "fs";
import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function SpotPlayer({accessToken, trackUri}) {
    if (!accessToken) return null;
    return (
    <SpotifyPlayer 
        styles={{
            activeColor: '#060504',
            bgColor: '#060504',
            color: '#fff',
            loaderColor: '#369b8d',
            sliderColor: '#1cb954',
            sliderHandleColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
        }}
        token = {localStorage.getItem('access_token')?.toString()}
        uris = {trackUri ? [trackUri] : []}
    
    />)
}

