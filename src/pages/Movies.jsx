import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchSearch } from 'services/api';
import { StyledLink, Ul } from './Home.styled';

export const Movies = () => {
  const [params, setParams] = useSearchParams();
  const savedQuery = params.get('movie') ?? '';
  const [query, setQuery] = useState(savedQuery);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchReviews() {
      try {
        const result = await fetchSearch(query);
        setMovies(result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, [query]);
  console.log(movies);

  const handleSetInputValue = event => {
    setQuery(event.target.value);
    setParams({ movie: event.target.value });
  };

  const location = useLocation();

  return (
    <>
      <input
        type="text"
        onChange={handleSetInputValue}
        autoFocus
        required
        placeholder="Search Movie..."
        value={query}
      />
      <br />
      <br />
      {query && (
        <Ul>
          {movies?.results.map(item => {
            console.log(item);
            return (
              <li key={item.id}>
                <StyledLink
                  to={`/goit-react-hw-05-movies/movies/${item.id}`}
                  state={{ from: location }}
                >
                  {item?.name}
                  {item?.title}
                </StyledLink>
              </li>
            );
          })}
        </Ul>
      )}
    </>
  );
};
