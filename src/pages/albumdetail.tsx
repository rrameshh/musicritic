import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Navbar } from '@/components/ui/navbar.tsx';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Stars from "@/components/ui/stars.tsx";
import { Log } from '@/Log.tsx';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';



interface Artist {
    name: string;
}

interface Album {
    id: string;
    name: string;
    images: { url: string }[];
    artists: Artist[];
    release_date: string;
    genres: string[];
    popularity: number;
}

interface Review {
    profile: string;
    albumID: string;
    albumName: string;
    review: string
    rating: number;
    date: Date | null;
    profileID: string
    profileIMG: string;
}
const handleClick = (index: number) => {
    // Logic to set the selected star
    console.log(index);
};

export const AlbumDetailPage = () => {
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET= import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const { id } = useParams<{ id?: string }>();
    const defaultId = id || 'default_value';
    const [album, setAlbum] = useState<Album | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        
        async function getAlbumInfo(id: string) {
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
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const albumData: Album = response.data;
                    setAlbum(albumData);
                } else {
                    console.error(`Error fetching album info. Status code: ${response.status}`);
                }
            } catch (error) {
                console.log("An error occurred");
            }
        }
        getAlbumInfo(defaultId);
    }, [defaultId]);

    useEffect(() => {
        async function fetchAlbumReviews(albumId: string) {
            try {
                const response = await axios.get(`https://marked-boats-production.up.railway.app/song_reviews/${albumId}`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching album reviews:", error);
            }
        }
        if (album) {
            console.log("Fetching reviews...");
            fetchAlbumReviews(album.id);
            // Optionally, you can setup a polling mechanism using setInterval
            const intervalId = setInterval(() => {
                console.log("Fetching reviews...");
                fetchAlbumReviews(album.id);
            }, 1000); // Fetch reviews every 5 seconds
            return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
            
        }
    }, [album]);
 
    return (
        <div>
             <Navbar />
            <Container>
               
                {album && (
                    <div className="flex-container mt-6">
                        <div className="one">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-left mb-4">
                                {album.name}
                            </h1>
                            <div className="flex items-center rounded-lg border-white">
                                <img src={album.images[1].url} alt={album.name} />
                                <div className="ml-4 mt-3">
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
                                                <Log albumID={album.id} albumName={album.name} />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="two text-left">
                            <Separator />
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left mt-4">
                                Logs for {album.name}
                            </h3>
                            <ul>
                                <div className='mt-2 mb-4'>
                                    {reviews.map((review, index) => (
                                        <li key={index}>
                                            <div className='mt-2 mb-2'>
                                                <div className='inline'>
                                                <Badge>{review.profile}</Badge>
                                                <p className="inline-block ml-2 mr-2 text-sm text-muted-foreground">
                                                    <Stars selectedStar={review.rating} setSelectedStar={handleClick} />
                                                </p>
                                                <p className="inline-block mr-2 text-sm text-muted-foreground"> {review.date_listened ? review.date_listened.toISOString() : 'N/A'}</p>
                                                </div>
                                                <p className="mt-2">{review.review}</p>
                                            </div>
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </div>
                        <div className="three">
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AlbumDetailPage;
