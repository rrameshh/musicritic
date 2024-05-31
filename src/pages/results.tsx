import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

import { Container } from '@/components/ui/container.tsx';

interface ImageObject{
    url: string;
}

interface Album {
  id: string;
  name: string;
  images: ImageObject[]; // Assuming you have an array of URLs for album covers
}

interface AlbumCoversProps {
  albums: Album[];
  searchInput: string;
}

const AlbumCovers: React.FC<AlbumCoversProps> = ({ albums }) => {
  return (
    <div className='results border-white'>
      <Container>
        <Row className='mx-2'>
          {albums.map((album) => (
            <Col key={album.id} xs={12} sm={6} md={4} lg={3}> {/* Adjust the column sizes as needed */}
              <Link to={`/album/${album.id}`}>
                <Card >
                  <Card.Img src={album.images[1].url} className='mx-auto' width={100} height={100} /> {/* Assuming the first image URL is used */}
                  <Card.Body>
                    <Card.Title> <p className="leading-7 [&:not(:first-child)]:mt-6 font font-semibold">{album.name} </p></Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AlbumCovers;
