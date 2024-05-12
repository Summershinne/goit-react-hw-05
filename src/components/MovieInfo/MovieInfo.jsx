import { Link, useLocation } from "react-router-dom";

export default function MovieInfo({ movie: { id, title, poster_path, vote_average, overview, genres } }) {
    const base_url = "https://image.tmdb.org/t/p/w500/";
    const file_path = poster_path;
    const posterURL = base_url + file_path;
    const location = useLocation();
    return (
        <div>
            <img src={posterURL} alt="" />
            <p>{title}</p>
            <p><b>User Score:</b>{vote_average }</p>
            <p><b>Overview:</b>{overview }</p>
            <div>
                <b>Genres:</b>{""}
                {genres && genres.length > 0 ? (
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        ) : null}
            </div>
            <Link to={`/movies/${id}`} state={location}>Additional information</Link>
    </div>
    )
};