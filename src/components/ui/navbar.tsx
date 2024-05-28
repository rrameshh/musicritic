import React, { useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  import {Log} from '@/Log.tsx'
  
  
export function Navbar() {
    const [isLogOpen, setIsLogOpen] = useState(false);
    const handleLogClick = () => {
        setIsLogOpen(!isLogOpen); 
    };
    return (
        <>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger onClick={handleLogClick}> Log Review</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <Log />
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        </>
    )
}
export default Navbar;