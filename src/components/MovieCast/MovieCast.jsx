import { useEffect, useState } from "react";
import { getMovieCast } from "../../fetch-api";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import style from "./MovieCast.module.css";

const MovieCast = () => {
  const [castInfo, setCastInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function showCastInfo() {
      try {
        setIsLoading(true);
        const dataCast = await getMovieCast(movieId);

        if (dataCast && Array.isArray(dataCast.cast)) {
          setCastInfo(dataCast.cast);
        } else {
          setCastInfo([]);
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    showCastInfo();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && castInfo.length > 0 ? (
        <ul className={style.container}>
          {castInfo.map((item) => (
            <li className={style.element} key={item.id}>
              <div>
                <img
                  className={style.img}
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w300${item.profile_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={item.name}
                />
              </div>
              <p className={style.description}>{item.name}</p>
              <p className={style.description}>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && !isError && <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
