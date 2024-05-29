import {Link} from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className = "flex flex-col gap-2">
            <p>404 Not Found </p>
            <Link to="/">Home from Link</Link>
        </div>
    )
} 