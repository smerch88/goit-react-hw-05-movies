import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  > li {
    margin-bottom: 20px;
  }
`;

export const StyledLink = styled(Link)`
  outline: none;
  text-decoration: none;
  padding: 2px 1px 0;
  color: white;
  font-size: 20px;
  background-color: tomato;
  padding: 8px;
  border-radius: 16px;
  &:hover {
    opacity: 0.5;
  }
`;
