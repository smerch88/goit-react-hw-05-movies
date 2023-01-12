import { Ul } from 'pages/Home.styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services/api';

export const Cast = () => {
  const { movieID } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchCast() {
      try {
        const result = await fetchMovieDetails(movieID, '/credits');
        setCast(result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchCast();
  }, [movieID]);
  console.log(cast);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!cast) return null;
  return (
    <>
      <Ul>
        {cast.cast.map(item => {
          return (
            <li key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
                alt=""
              />
              <p>Name: {item.name}</p>
              <p>Character: {item.character}</p>
            </li>
          );
        })}
      </Ul>
    </>
  );
};
