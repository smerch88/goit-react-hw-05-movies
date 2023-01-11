import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPopular } from 'services/api';

export const Home = () => {
  const [trendingFilms, setTrendingFilms] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchTrendingFilms() {
      try {
        const result = await fetchPopular();
        setTrendingFilms(result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchTrendingFilms();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!trendingFilms) return null;
  return (
    <>
      <ul>
        {trendingFilms.results.map(item => {
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
    </>
  );
};
