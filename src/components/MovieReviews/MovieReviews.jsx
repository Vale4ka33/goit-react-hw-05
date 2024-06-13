import { useEffect, useState } from "react";
import { getMovieRew } from "../../fetch-api";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import style from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        const dataReviews = await getMovieRew(movieId);
        setReviews(dataReviews.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);
  return (
    <div className={style.container}>
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      <ul className={style.list}>
        {reviews.map((review) => (
          <li className={style.item} key={review.id}>
            <p className={style.name}>Author: {review.author}</p>
            <p className={style.text}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
