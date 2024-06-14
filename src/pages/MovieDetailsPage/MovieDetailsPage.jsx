import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { getMovieById } from "../../fetch-api";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import style from "./MovieDetailsPage.module.css";
import { IoIosArrowBack } from "react-icons/io";

const defaultsInfo = {
  poster:
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg",
  title: "Title not found",
};

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  const location = useLocation();
  const goBack = location.state?.from ?? "/movies";

  useEffect(() => {
    async function getFilmInfo() {
      try {
        setIsLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (movieId) {
      getFilmInfo();
    }
  }, [movieId]);

  return (
    <div className={style.container}>
      <Link className={style.backLink} to={goBack}>
        <IoIosArrowBack className={style.backIcon} />
        Go Back
      </Link>
      <div className={style.topContainer}>
        <div>
          {isLoading && <Loading />}
          {isError && <ErrorMessage />}
          {!isLoading && (
            <img
              className={style.img}
              src={
                isError || !movie.poster_path
                  ? defaultsInfo.poster
                  : `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              }
              alt={movie.title || defaultsInfo.title}
            />
          )}
        </div>

        {!isLoading && !isError && (
          <div className={style.descriptions}>
            <h2 className={style.filmName}>{movie.title}</h2>
            <p>User score: {movie.vote_average}</p>
            <h3 className={style.overview}>Overview</h3>
            <p>{movie.overview}</p>
            <h4 className={style.genres}>Genres</h4>
            <ul className={style.listGenre}>
              {movie?.genres?.map(({ id, name }) => (
                <li className={style.elem} key={id}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <h4 className={style.infoTitle}>Additional information</h4>
        <ul>
          <li className={style.infoLink}>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li className={style.infoLink}>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
