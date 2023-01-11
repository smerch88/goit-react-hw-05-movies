import { useParams } from 'react-router-dom';

export const Movie = () => {
  const { movieID } = useParams();
  console.log(movieID);

  return <>Movie {movieID}</>;
};
