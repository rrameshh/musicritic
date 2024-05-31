import React, { useState, useEffect } from 'react';
import { Log } from '@/Log.tsx';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container.tsx';
import { Navbar } from '@/components/ui/navbar.tsx';
import { Searchbar } from '@/pages/searchbar';
import axios from 'axios';
import './App.css';

export default function Root() {
  const [song_reviews, setSongReviews] = useState([]); 
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await axios.get("http://localhost:8808/song_reviews");
        setSongReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReviews();
  }, []);
  
  let keyCounter = 1; // Initialize key counter
  
  return (
    <Container>
      <Navbar/>
      {/* <div className="song_reviews">
        {song_reviews.map((song_review) => (
          <div key={keyCounter++} className="book"> {/* Increment keyCounter */}
            {/* <h2>{song_review.albumID}</h2>
            <h2>{song_review.albumName}</h2>
            <p>{song_review.review}</p>
          </div>
        ))}
      </div> */} 
    </Container>
  );
}
