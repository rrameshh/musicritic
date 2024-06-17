import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { Badge } from "@/components/ui/badge";
import { Container } from '@/components/ui/container.tsx';

interface ImageObject {
  url: string;
}

interface Artist {
  name: string;
}


interface Album {
  id: string;
  name: string;
  images: ImageObject[];
  release_date: string;
  artists: Artist[];
}

interface AlbumCoversProps {
  albums: Album[];
  searchInput: string;
}

const AlbumCovers: React.FC<AlbumCoversProps> = ({ albums }) => {
  return (
    <div className='result mt-4'>

      <Container>
        <Row className='mx-2'>

          {albums.map((album) => (
            
            <div className="w-full border-t border-b border-border bg-background flex hover:bg-muted">
              <Link to={`/album/${album.id}`} className="flex w-full">
                <div className="ml-5 mt-5 mb-5 flex">
                  <img src={album.images[1].url} width={100} height={100} alt={album.name} className="mr-3" />

                  <div className="flex flex-col">
                    <p className="leading-7 font-semibold text-left">{album.name}</p>

                    <div className="text-left">
                      <Badge >{album.artists.map(artist => artist.name).join(", ")} </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground ml-auto mt-2 mr-4">{album.release_date}</p>
              </Link>
            </div>

          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AlbumCovers;
