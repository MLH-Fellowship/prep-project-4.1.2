import React from 'react';

// Libraries
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const H2 = styled.h2`
  font-size: 2.5rem;
  text-align: center;
`;

const A = styled(Link)`
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  margin-top: 20px;
`;

const Error = () => (
  <Container>
    <H2>Error: Page not found</H2>
    <A to='/'>Home</A>
  </Container>
);

export default Error;
