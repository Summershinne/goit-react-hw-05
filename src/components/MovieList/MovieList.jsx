import { Link, useLocation } from "react-router-dom";
import { nanoid } from 'nanoid';

export default function MovieList({ movies }) {
    const location = useLocation();
    return (
        
        <ul>
            {movies.map((item) => (
                <li key={nanoid()}><Link to={`/movies/${item.id}`} state={location}>{item.title}</Link></li>
                
            ))}
        </ul>
    
)}