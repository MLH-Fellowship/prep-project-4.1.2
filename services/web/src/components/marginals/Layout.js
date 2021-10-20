import React from 'react';

// Libraries
import styled from 'styled-components';

// Components
import NavigationMenu from './NavigationMenu';

const PrimeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageContainer = styled.div`
  width: calc(100vw - 15%);
  height: auto;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-left: 15%;

  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0px auto;

  @media (max-width: 650px) {
    width: 95%;
  }
`;

const Layout = ({ children }) => (
  <PrimeContainer>
    <NavigationMenu />

    <PageContainer>
      <Container>{children}</Container>
    </PageContainer>
  </PrimeContainer>
);

export default Layout;
