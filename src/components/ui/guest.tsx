import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

export const Guest = () => {
    const [asGuest, setAsGuest] = useState<boolean>(false);
    const navigate = useNavigate(); // Get the history object from React Router

    const redirectAsGuest = () => {
        setAsGuest(true);
        const profile = {
            displayName: "Guest",
            id: "guest",
            pfp: "guest"
        }
        const profileString = JSON.stringify(profile);
        localStorage.setItem('userProfile', profileString);
        navigate('/guest-home'); // Navigate to GuestHome component
    }

    return (
        <Button onClick={redirectAsGuest}> Continue as Guest </Button>
    )
}

export default Guest;
