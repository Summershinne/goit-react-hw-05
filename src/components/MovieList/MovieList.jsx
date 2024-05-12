import { Link } from "react-router-dom";

export default function MovieList({movies}) {
    return (
        <ul>
            {movies.map((item) => (
                
                <li><Link to={item.id}>{item.title}</Link></li>
                
            ))}
        </ul>
    
)}