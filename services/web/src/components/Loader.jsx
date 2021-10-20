import React from 'react';

// Libraries
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <Container>
    <Loader type='Bars' color='#ffffff' height={100} width={100} timeout={3000} />
  </Container>
);
