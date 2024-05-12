import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { fetchMovieRevievsById } from "../../fetchMovies";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const [reviews, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMovieRevievsById(movieId);
        setReview(data);
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
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ul>
        {reviews.map((review) => (
          <li key={nanoid()}>
            <p>
              Author: <span>{review.author}</span>
            </p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}