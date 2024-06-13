import axios from "axios";

axios.defaults.baseURL = axios.defaults.baseURL =
  "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmNmNWY1MzA1NTFlOTlhMDgwNTBhNTBiYmZhOGU1YiIsInN1YiI6IjY2Njk2MDI3ZGFjYTQzZjFiNmJlYmY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rs75K3uexYKys-a_YhAqru99B8A0KCvGuC4bMEFjyJ4",
  },
};

export const trendingMovie = async () => {
  const response = await axios.get("trending/movie/day", options);
  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data;
};

export const getMovieRew = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data;
};

export const getSomeMovies = async (searchMovies) => {
  const response = await axios.get(
    `search/movie?query=${searchMovies}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data;
};
