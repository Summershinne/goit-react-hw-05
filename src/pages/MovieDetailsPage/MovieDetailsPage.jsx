import { Suspense, useEffect, useState } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import { fetchMovieById } from "../../fetchMovies";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieInfo from "../../components/MovieInfo/MovieInfo";

export default function MovieDetailsPage() {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(false);

    const { movieId } = useParams();
    
    useEffect(() => {
        async function fetchMovie() {
            try {
                setError(false);
                setLoading(true);
                const data = await fetchMovieById(movieId);
                setMovies(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchMovie();
    }, [movieId]);
    
    
    return (
        <div>
            <div>

            </div>
            {movies && <MovieInfo movie={movies} />}
            {error && <ErrorMessage />}
            {loading && <Loader />}
            <ul>
                <li>
                    <Link to={`/movies/${movieId}/cast`}>Cast</Link>
                </li>
                <li>
                    <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
                </li>
            </ul>
            <Suspense fallback={<Loader />}>
                <Outlet />
                </Suspense>
        </div>
    )
};
