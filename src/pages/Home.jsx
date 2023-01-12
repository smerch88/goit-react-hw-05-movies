import { useEffect, useState } from 'react';
import { fetchPopular } from 'services/api';
import { StyledLink, Ul } from './Home.styled';

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
      <Ul>
        {trendingFilms.results.map(item => {
          console.log(item);
          return (
            <li key={item.id}>
              <StyledLink to={`/goit-react-hw-05-movies/movies/${item.id}`}>
                {item?.name}
                {item?.title}
              </StyledLink>
            </li>
          );
        })}
      </Ul>
    </>
  );
};
