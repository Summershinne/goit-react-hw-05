import { useEffect, useMemo, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import LoadMoreButton from "../../components/LoadMoreBtn/LoadMoreBtn";
import { fetchSearchMovie } from "../../fetchMovies";

export default function MoviesPage() {
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [page, setPage] = useState(1);
 
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";

    const handleSearch = (newQuery) => {
       setSearchParams({ query: newQuery });
    setPage(1);
    setMovies([]);
  };
    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const visibleMovies = useMemo(() => { return movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase())) }, [query,movies]);
    
     useEffect(() => {
        if (query === "") { return }
         async function getMovies() {
             try {
                 setError(false);
                 setLoading(true);
                 const data = await fetchSearchMovie(page,query);
                 setMovies((prevMovies) => {
                     return [...prevMovies, ...data]
                 });
        } catch (error) {
                 setError(true);
             } finally {
                 setLoading(false);
             }
         }
         getMovies();
    }, [page, query]);
    return (
        <main>
            <SearchBar onSubmit={ handleSearch} />
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {movies.length > 0 && <MovieList movies={visibleMovies} />}
      {movies.length > 0 && !loading && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}    
</main>
        )
}