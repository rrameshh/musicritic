import React, { useState, useEffect } from 'react';
import { Log } from '@/Log.tsx';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container.tsx';
import { Navbar } from '@/components/ui/navbar.tsx';
import { Searchbar } from '@/pages/searchbar';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { loginUrl } from '@/components/ui/spotify.js';
import './App.css';

export default function Root() {

  return (
    // <Router>
    <Container>
      {/* {isLoggedIn ? ( */}
        <Navbar />
      {/* // ) : (
      //   <Button id="login-button" data-bind-onclick={loginWithSpotifyClick}>
      //     Log in with Spotify
      //   </Button>
      // )} */}
    </Container>
    // </Router>
  );
}
