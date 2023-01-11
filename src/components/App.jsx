import { Home } from 'pages/Home';
import { Movie } from 'pages/Movie';
import { Movies } from 'pages/Movies';
import { NotFound } from 'pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import { Container, Header, Logo, Link } from './App.styled';

export const App = () => {
  return (
    <Container>
      <Header>
        <Logo>
          <span role="img" aria-label="computer icon">
            💻
          </span>{' '}
          MoviesSearch
        </Logo>
        <nav>
          <Link to="/goit-react-hw-05-movies/">Home</Link>

          <Link to="/goit-react-hw-05-movies/movies">Movies</Link>
        </nav>
      </Header>
      <Routes>
        <Route path="goit-react-hw-05-movies" element={<Home />}></Route>
        <Route
          path="goit-react-hw-05-movies/movies"
          element={<Movies />}
        ></Route>
        <Route
          path="goit-react-hw-05-movies/movies/:movieID"
          element={<Movie />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Container>
  );
};
