import { Ul } from 'pages/Home.styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services/api';

export const Reviews = () => {
  const { movieID } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchReviews() {
      try {
        const result = await fetchMovieDetails(movieID, '/reviews');
        setReviews(result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, [movieID]);
  console.log(reviews);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!reviews) return null;
  return (
    <>
      <Ul>
        {reviews.results.map(item => {
          return (
            <li key={item.id}>
              <h2>Author: {item.author}</h2>
              <h3>Review:</h3>
              <p> {item.content}</p>
            </li>
          );
        })}
      </Ul>
    </>
  );
};
