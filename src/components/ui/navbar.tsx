
import {Container} from "@/components/ui/container.tsx"
import { useNavigate, useLocation } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"

export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

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
        // <Container>
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
        // </Container>
    )
}

export default Navbar; // No need for {Navbar} here
