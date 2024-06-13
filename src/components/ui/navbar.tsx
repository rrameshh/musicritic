import { useNavigate } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu.tsx"

export function Navbar() {
    const navigate = useNavigate();

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
                    <NavigationMenuLink onClick={navigateToHome}>
                        Home
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink onClick={navigateToSearch}>
                        Search for Albums
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        // </Container>
    )
}

export default Navbar;
