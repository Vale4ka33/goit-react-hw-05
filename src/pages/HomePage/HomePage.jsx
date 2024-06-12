import { useEffect, useState } from "react";
import { trendingMovie } from "../../fetch-api";
import MovieList from "../../components/MovieList/MovieList";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

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
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      <MovieList movies={trendMovie} />
    </div>
  );
};

export default HomePage;
