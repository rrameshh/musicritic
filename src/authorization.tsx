import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { isAsyncFunction } from 'util/types';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Your clientId
const redirectUrl = 'http://localhost:5173/'; // Your redirect URL - must be localhost URL and/or HTTPS

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email';

const currentToken = {
    get access_token() { return localStorage.getItem('access_token') || null; },
    get refresh_token() { return localStorage.getItem('refresh_token') || null; },
    get expires_in() { return localStorage.getItem('refresh_in') || null },
    get expires() { return localStorage.getItem('expires') || null },
  
    save: function (response) {
      const { access_token, refresh_token, expires_in } = response;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_in', expires_in);
  
      const now = new Date();
      const expiry = new Date(now.getTime() + (expires_in * 1000));
      localStorage.setItem('expires', expiry);
    }
};

const Authorization = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            getToken(code);
        }
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            setIsLoggedIn(true);
            console
        }
    }, []);

    async function getUserData() {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
        });

        const userData = await response.json();
        console.log(userData); // Log user data
    // You can set the user data to state or perform any other actions here
    }

async function getToken(code) {
    // stored in the previous step

    let codeVerifier = localStorage.getItem('code_verifier');
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUrl,
            code_verifier: codeVerifier,
        }).toString(), // Convert the body to a URL encoded string
    };

    const response = await fetch(tokenEndpoint, payload);
    const data = await response.json();
    console.log(data);
    if (data.access_token) {
        currentToken.save(data);
        setIsLoggedIn(true);
    
        getUserData(); // Call getUserData after obtaining the access token
    }
}


    const redirectToSpotifyAuthorize = async () =>  {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues = crypto.getRandomValues(new Uint8Array(64));
        const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

        const code_verifier = randomString;
        const data = new TextEncoder().encode(code_verifier);
        const hashed = await crypto.subtle.digest('SHA-256', data);

        const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        window.localStorage.setItem('code_verifier', code_verifier);

        const authUrl = new URL(authorizationEndpoint)
        const params = {
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            code_challenge_method: 'S256',
            code_challenge: code_challenge_base64,
            redirect_uri: redirectUrl,
        };

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
    }

    const logoutClick = () => {
        localStorage.clear();
        window.location.href = redirectUrl;
    }

    const refreshTokenClick = async () => {
        const token = await refreshToken();
        currentToken.save(token);    
    }

    if (isLoggedIn) {
        return (
            <>
                <h1></h1>
                <Button onClick={logoutClick}> Logout </Button>
            </>
            
        )
    } else {
        return (
            <Button onClick={redirectToSpotifyAuthorize}> Log in Button </Button>
        )
    }
}

export default Authorization;
