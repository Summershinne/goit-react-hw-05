import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { fetchMovieCreditsById } from "../../fetchMovies";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMovieCreditsById(movieId);
        setCast(data);
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
      {cast &&
        cast.map((actor) => (
          <li key={nanoid()}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
              />
            )}
            <div>
              <p>{actor.name}</p>
              <p>
                Character: <span>{actor.character}</span>
              </p>
            </div>
          </li>
        ))}
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
}