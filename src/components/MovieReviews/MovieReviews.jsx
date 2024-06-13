import { useEffect, useState } from "react";
import { getMovieRew } from "../../fetch-api";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

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
    <div>
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
