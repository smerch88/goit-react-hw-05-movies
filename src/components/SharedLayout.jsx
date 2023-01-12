import { Outlet } from 'react-router-dom';
import { Container, Header, Link, Logo } from './SharedLayout.styled';

export const SharedLayout = () => {
  return (
    <Container>
      <Header>
        <Logo>
          <span role="img" aria-label="computer icon">
            💻
          </span>
          Movies Search
        </Logo>
        <nav>
          <Link to="/goit-react-hw-05-movies" end>
            Home
          </Link>
          <Link to="/goit-react-hw-05-movies/movies">Movies</Link>
        </nav>
      </Header>
      <Outlet />
    </Container>
  );
};
