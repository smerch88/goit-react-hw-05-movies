import { BackLink } from 'components/BackLink';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services/api';
import { StyledLink, Ul } from './Home.styled';

export const Movie = () => {
  const { movieID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/goit-react-hw-05-movies';
  console.log(location);

  useEffect(() => {
    setIsLoading(true);
    async function fetchDetails() {
      try {
        const result = await fetchMovieDetails(movieID);
        setMovieDetails(result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchDetails();
  }, [movieID]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!movieDetails) return null;
  return (
    <>
      <BackLink to={backLinkHref}>Back</BackLink>
      <br />
      <img
        src={`https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`}
        alt="movie poster"
      />
      <h1>{movieDetails.title}</h1>
      <h2>User Score: </h2>
      <p>{movieDetails.vote_average}</p>
      <h2>Overview</h2>
      <p>{movieDetails.overview}</p>
      <h2>Genres</h2>
      <Ul>
        {movieDetails.genres.map(item => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </Ul>
      <Ul>
        <li>
          <StyledLink to="cast" state={{ from: location.state?.from }}>
            Cast
          </StyledLink>
        </li>
        <li>
          <StyledLink to="reviews" state={{ from: location.state?.from }}>
            Reviews
          </StyledLink>
        </li>
      </Ul>
      <Outlet />
    </>
  );
};
