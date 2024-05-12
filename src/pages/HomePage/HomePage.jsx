import { useEffect, useState } from "react"
import { fetchTrendingMovies } from "../../fetchMovies";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import LoadMoreButton from "../../components/LoadMoreBtn/LoadMoreBtn";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage]= useState(1);
    
    useEffect(() => {
        async function getMovies() {
            try {
                setError(false);
                setLoading(true);
                const data = await fetchTrendingMovies(page);
                setMovies((prevMovies) => {
                return[...prevMovies,...data]
            });
            } catch (error) {
                setError(true);
            }
            finally {
                setLoading(false);
            }
            
        }
        getMovies()
    }, [page]);
    
    const handleLoadMore = () => {
    setPage(page + 1);
  };

    return (
        <main>
            <h1>Trending today</h1>
            {error && <ErrorMessage />}
            {loading && <Loader />}
             <MovieList movies={movies} />
            {movies.length > 0 && !loading && <LoadMoreButton onClick={handleLoadMore} />}
    </main>
    )
};