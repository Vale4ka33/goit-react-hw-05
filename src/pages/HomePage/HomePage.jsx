import { useEffect, useState } from "react";
import { trendingMovie } from "../../fetch-api";
import MovieList from "../../components/MovieList/MovieList";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import style from "./HomePage.module.css";

const HomePage = () => {
  const [trendMovie, setTrendMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        const movieList = await trendingMovie();
        setTrendMovie(movieList.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, []);

  return (
    <div className={style.homeContainer}>
      <h1 className={style.title}>Trending today</h1>
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      <MovieList movies={trendMovie} />
    </div>
  );
};

export default HomePage;
