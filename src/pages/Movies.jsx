import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSearch } from 'services/api';

export const Movies = () => {
  const [query, setQuery] = useState(undefined);
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
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!movies) return null;
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
      {query && (
        <ul>
          {movies.results.map(item => {
            console.log(item);
            return (
              <li key={item.id}>
                <Link to={`/goit-react-hw-05-movies/movies/${item.id}`}>
                  {item?.name}
                  {item?.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
