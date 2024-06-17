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
    <div className='result'>

      <Container>
        <Row className='mx-2'>

          {albums.map((album) => (
            // <Col key={album.id} xs={12} sm={6} md={4} lg={3}> {/* Adjust the column sizes as needed */}
            //   <Link to={`/album/${album.id}`}>
            //     <Card >
            //       <Card.Img src={album.images[1].url} className='mx-auto' width={100} height={100} /> {/* Assuming the first image URL is used */}
            //       <Card.Body>

            //       </Card.Body>
            //       <Card.Title> <p className="leading-7 [&:not(:first-child)]:mt-6 font font-semibold">{album.name} </p></Card.Title>
            //     </Card>
            //   </Link>
            // </Col>
            <div className="w-full border-t border-b border-border bg-background flex hover:bg-muted">
              <Link to={`/album/${album.id}`} className="flex w-full">
                <div className="ml-5 mt-5 mb-5 flex">
                  <img src={album.images[1].url} width={100} height={100} alt={album.name} className="mr-3" />

                  <div className="flex flex-col">
                    <p className="leading-7 font-semibold text-left">{album.name}</p>

                    <div className="text-left">
                      <Badge className="border border-white">{album.artists.map(artist => artist.name).join(", ")} </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground ml-auto mt-1">{album.release_date}</p>
              </Link>
            </div>

          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AlbumCovers;
