import * as React from 'react';
import { Navbar } from '@/components/ui/navbar.tsx';
import { Link } from 'react-router-dom'; // Import Link
import { Row, Card } from 'react-bootstrap';

import {Container} from '@/components/ui/container.tsx';

interface Album {
    id: string;
    name: string;
    images: string[]; // Assuming you have an array of URLs for album covers
}

interface AlbumCoversProps {
    albums: Album[];
    searchInput: string;
}

const AlbumCovers: React.FC<AlbumCoversProps> = ({ albums, searchInput, accessToken }) => {
    return (
        <div className='results border-white'>
            {/* <div className="text-lg font-semibold" >
                Showing Results for {searchInput}
                </div> */}
            <Container>
            
            <Row className='mx-2 row row-cols-4'>
            {albums.map((album, i) => (
                    <Link key={album.id} to={`/album/${album.id}`}> {/* Link to the album page */}
                    <Card>
                        <Card.Img src={album.images[2].url} /> {/* Assuming the first image URL is used */}
                        <Card.Body>
                            <Card.Title>{album.name}</Card.Title>
                        </Card.Body>
                    </Card>
                    </Link>
            ))}
            </Row>
            </Container>
        </div>
    );
};

export default AlbumCovers;
