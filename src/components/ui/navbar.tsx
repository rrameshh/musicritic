import * as React from "react"
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Searchbar } from "@/pages/searchbar"
import {Container} from "@/components/ui/container.tsx"
import { useNavigate, useLocation } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
  import {Log} from '@/Log.tsx'
  
const CLIENT_ID = "15eb54ac806d4ec8b0448b6f3c61dfd7";
const CLIENT_SECRET = "dec97a90628a478fa9106f18163cff87";  


export function Navbar() {
    const [searchInput, setSearchInput] = useState('');
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Execute your search function or any action here
            search();
            console.log(albums);
            console.log('Enter key pressed');
            navigate(`/results`, { state: { albums } });
        }
    };

    const navigateToHome = () => {
        navigate('/');
    }
    const navigateToSearch = () => {
    
        if (location.pathname === '/results') {
            console.log("Already on results page, no need to navigate again.");
            // Optionally, you can perform some action here if you don't want to navigate again
        } else {
            navigate('/results');
        }
    }

   
    return (
        <Container>
        <NavigationMenu>
            <NavigationMenuList>
            <NavigationMenuItem>
                {/* <Link href="/docs" legacyBehavior passHref> */}
                <NavigationMenuLink onClick = {navigateToHome} className={navigationMenuTriggerStyle()}>
                 Home
                </NavigationMenuLink>
                {/* </Link> */}
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
                    <NavigationMenuTrigger> Log Review</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    <Log />
                    </NavigationMenuContent>
             </NavigationMenuItem> */}
             <NavigationMenuItem>
                <NavigationMenuLink onClick = {navigateToSearch} className={navigationMenuTriggerStyle()}>
                 Search for Albums (addimg)
                </NavigationMenuLink>
             </NavigationMenuItem>
        
            </NavigationMenuList>
        </NavigationMenu>
        </Container>
    )
}
export default {Navbar};