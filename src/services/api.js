import axios from 'axios';
const API_KEY = 'b3a73d09e24f5088b27e3a8257523873';
const timePeriod = 'day';

export const fetchPopular = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/${timePeriod}?api_key=${API_KEY}`
  );
  if (data.code === 404) {
    throw new Error('Not Found');
  }
  return data;
};

export const fetchMovieDetails = async (movieID, specificParameter = '') => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}${specificParameter}?api_key=${API_KEY}&language=en-US`
  );
  if (data.code === 404) {
    throw new Error('Not Found');
  }
  return data;
};

export const fetchSearch = async query => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false
`
  );
  if (data.code === 404) {
    throw new Error('Not Found');
  }
  return data;
};
