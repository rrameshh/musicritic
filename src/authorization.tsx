import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Container } from '@/components/ui/container.tsx';
import { Navbar } from '@/components/ui/navbar.tsx';
import UserTop from '@/components/ui/usertop.tsx';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar.tsx";
import TopAlbums from './components/ui/topalbums.tsx';
import Guest from './components/ui/guest.tsx';
import { access } from 'fs';


const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Your clientId
// const redirectUrl = `https://musicriticer.netlify.app/`; 
const redirectUrl = `http://localhost:5173/`

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email';

interface UserProfile {
    displayName: string;
    id: string;
    pfp: string;
    access_token:string;
}

interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}


const Authorization = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [expiresIn, setExpiresIn] = useState<number | null>(null);
    const [expires, setExpires] = useState<Date | null>(null);
    const [redirectedFromSpotify, setRedirectedFromSpotify] = useState<boolean>(false);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            getToken(code);
            setRedirectedFromSpotify(true);
            localStorage.setItem('spotifyCode', code);
        } else {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        if (redirectedFromSpotify) {
            const storedAccessToken = localStorage.getItem('access_token');
            
            // Check if user data has already been fetched
            const userProfileData = localStorage.getItem('userProfile');
            
            if (!userProfileData) {
                // If user data not found, fetch it
                getUserData(storedAccessToken);
                
            } else {
                // If user data already exists, set currentUser state
                setCurrentUser(JSON.parse(userProfileData));
                
                setIsLoggedIn(true);
                setIsLoading(false);
            }
        }
    }, [redirectedFromSpotify]);


    async function getToken(code: string) {
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
        console.log('Access token:', data.access_token);
        if (data.access_token) {
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);
            setExpiresIn(data.expires_in);
            setExpires(new Date(new Date().getTime() + (data.expires_in * 1000)));
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            getUserData(data.access_token);
            
        }
    }

    async function getUserData(storedAccessToken) {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + storedAccessToken },
        });

        if (response.status === 401) {
            // Token expired, refresh token
            // await refreshTokenClick();
            console.log("401 response means refresh token i think")
            // Retry fetching user data with the new access token
            checkTokenExpiry();
            await refreshTokens(storedAccessToken);
            // await refreshTokens(refreshToken);
            console.log("correct token???? line 116")
            console.log(localStorage.getItem('access_token'));
            // await getUserData();
            return;
        }

        const userData = await response.json();
        console.log("user??")
        console.log(userData);
        const profile = {
            displayName: userData.display_name,
            id: userData.id,
            pfp: userData.images && userData.images.length > 1 ? userData.images[1].url : ''
        }
        const profileString = JSON.stringify(profile);
        localStorage.removeItem('userProfile');

        localStorage.setItem('userProfile', profileString);
        console.log(profileString)
        setCurrentUser(profile);
        sessionStorage.setItem('loggedIn', 'true');
        //const isuserIn = sessionStorage.getItem('userIn') === 'true';
    
        //setIsLoggedIn(true);
    }

    async function refreshTokens(refreshToken: string) {
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId
            }),
        };
        const response = await fetch(tokenEndpoint, payload);
        const responseData = await response.json();
        console.log(responseData);
    
        if (responseData && responseData.access_token && responseData.refresh_token) {
            setAccessToken(responseData.access_token);
            setRefreshToken(responseData.refresh_token);
            setExpiresIn(responseData.expires_in);
            setExpires(new Date(new Date().getTime() + (responseData.expires_in * 1000)));
            localStorage.setItem('refresh_token', responseData.refresh_token);
            localStorage.setItem('access_token', responseData.access_token);
            console.log("other token 3???? line 173")
            console.log(localStorage.getItem('access_token'));
            //getUserData(responseData.access_token);
        } else {
            console.error("Error refreshing tokens:", responseData);
            // Handle error scenario
        }
    
        return responseData;
    }
    

    async function handleTokenExpiration() {

        const tokenResponse = await refreshTokens(localStorage.getItem('refresh_token')?.toString());
        
        if (tokenResponse.access_token && tokenResponse.refresh_token) {
            console.log("something workeds?");
            console.log(tokenResponse.access_token);
            console.log(tokenResponse.refresh_token);
            //localStorage.setItem('access_token', tokenResponse.access_token);
            //localStorage.setItem('refresh_token', tokenResponse.refresh_token);
            // getUserData(tokenResponse.access_token);
            //setIsLoggedIn(true);
            console.log("other token 4???? line 197")
            console.log(localStorage.getItem('access_token'));
        }
        else
            console.log("refreshTokens did not do anything");
    }

    const checkTokenExpiry = () => {
        const expiry = expires;
        if (expiry && new Date(expiry) > new Date()) {
            //setIsLoggedIn(true);
            //getUserData(localStorage.getItem('access_token')?.toString());
        } else {
            // Token expired, refresh token
            // refreshTokenClick();
            console.log("time to refresh");
            handleTokenExpiration();
        }
    }

    const redirectToSpotifyAuthorize = async () => {
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
        sessionStorage.setItem('loggedIn', 'false');
        window.location.href = redirectUrl;

    }

    useEffect(() => {
        const expiry = expires;
        if (expiry && new Date(expiry) > new Date()) {
            setIsLoading(false);
            if (redirectedFromSpotify) {
                setIsLoggedIn(true);
                sessionStorage.setItem('userIn', "true");
                // getUserData(accessToken);
            }
        } else {
            checkTokenExpiry();
        }
    }, [expires, redirectedFromSpotify]);
    

    if (isLoading && !currentUser) {
        return <div>Loading...</div>;
    }
    const session = (sessionStorage.getItem('userIn') === 'true');

    if (session && isLoggedIn) {
        const curr = currentUser;
        if (curr != null) {
            return (
              <>
                    <Navbar />
                <div className="inline flex flex-col items-center justify-center mt-4">
                    <img className="rounded-full w-22 h-22" src={curr.pfp} alt={curr.displayName} />
                    <h1 className="scroll-m-20 text-4xl mt-3 mb-3 font-extrabold tracking-tight lg:text-5xl">
                        Hello {curr.displayName}!
                    </h1>
                    <Button onClick={logoutClick} className="rounded-lg"> Logout </Button>
                    {currentUser && <UserTop accessToken={accessToken} />}

                    {/* <TopAlbums/> */}
                    
                </div>
                </>
    
            );

        }
        else {
            return (
                <div>Loading ... </div>
            );
        }
    }
    else {
        return (
            <>
                <h1 className="scroll-m-20 text-4xl mt-3 mb-3 font-extrabold tracking-tight lg:text-5xl">
                        Welcome to Musicritic!
                    </h1>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Note: due to rate limiting restrictions, you will only be able to access this app if you are an approved user
                     </h3>                    
                <Button onClick={redirectToSpotifyAuthorize}> Login </Button>
                <Guest />
                </>
            
            
        )
    }
}

export default Authorization;
