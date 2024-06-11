
import {useState, useEffect} from "react";


export const UserTop: React.FC = () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET= import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const searchTerm = "tracks";

    useEffect(() => {
        async function getTopTracks() {
            const response = await fetch(`https://api.spotify.com/v1/me/top/${searchTerm}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') },
        });
        const trackData = await response.json();
        console.log(trackData);
        }
        getTopTracks();
    }, [])
    return (
        <>
            <h2> </h2>
        </>
    )

}

export default UserTop;