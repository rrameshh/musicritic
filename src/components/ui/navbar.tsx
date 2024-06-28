import React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useNavigate, useLocation } from 'react-router-dom';

export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToHome = () => {
        const spotifyCode = localStorage.getItem('spotifyCode');
        const userProfile = localStorage.getItem('userProfile');
        const isGuest = userProfile && JSON.parse(userProfile).id === "guest";
        

        if (isGuest) {
            navigate(`/guest-home`);
        }
        else if (spotifyCode) {
            navigate(`/?code=${spotifyCode}`);
        } 
        else 
                navigate(`/`);
    
        
    }
    

    const navigateToSearch = () => {
        const spotifyCode = localStorage.getItem('spotifyCode');
        if (spotifyCode) {
            navigate(`/results?code=${spotifyCode}`);
        } else {
            navigate(`/results`);
        }
    }

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink onClick={navigateToHome} className={navigationMenuTriggerStyle()}>
                        Home
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink onClick={navigateToSearch} className={navigationMenuTriggerStyle()}>
                        Search for Albums
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar;
