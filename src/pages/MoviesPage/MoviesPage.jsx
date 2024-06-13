import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSomeMovies } from "../../fetch-api";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import style from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [params, setParams] = useSearchParams();
  const query = params.get("query") ?? "";

  useEffect(() => {
    if (query === "") {
      return;
    }
    const findListMovie = async () => {
      try {
        setIsLoading(true);
        const dataList = await getSomeMovies(query);
        setSearchResults(dataList.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    findListMovie();
  }, [query]);

  const handleSearch = (newQuery) => {
    setParams({ query: newQuery });
  };

  return (
    <div className={style.container}>
      <SearchForm onSearch={handleSearch} />
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
