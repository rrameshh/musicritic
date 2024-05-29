import * as React from "react"
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom';
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
  
  
export function Navbar() {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Execute your search function or any action here
            navigate(`/search?q=${searchInput}`);
            console.log('Enter key pressed');
        }
    };

    const navigateToHome = () => {
        navigate('/');
    }
   
    return (
        <>
        <NavigationMenu>
            <NavigationMenuList>
            <NavigationMenuItem>
                {/* <Link href="/docs" legacyBehavior passHref> */}
                <NavigationMenuLink onClick = {navigateToHome} className={navigationMenuTriggerStyle()}>
                 Home
                </NavigationMenuLink>
                {/* </Link> */}
            </NavigationMenuItem>
            <NavigationMenuItem>
                    <NavigationMenuTrigger> Log Review</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    <Log />
                    </NavigationMenuContent>
             </NavigationMenuItem>
             <NavigationMenuItem>
                    {/* <NavigationMenuTrigger> Search: </NavigationMenuTrigger>
                    <NavigationMenuContent> */}
                    <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input 
                    type="search" 
                    placeholder="Search" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    />
                    </div>
                    {/* </NavigationMenuContent> */}
             </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        </>
    )
}
export default Navbar;