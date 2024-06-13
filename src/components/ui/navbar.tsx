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
                const spotifyCode = localStorage.getItem('spotifyCode');
                if (spotifyCode) {
                    navigate(`/?code=${spotifyCode}`);
                } else {
                    navigate('/');
                }
            }
        
            const navigateToSearch = () => {
                const spotifyCode = localStorage.getItem('spotifyCode');
                if (spotifyCode) {
                    navigate(`/results?code=${spotifyCode}`);
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