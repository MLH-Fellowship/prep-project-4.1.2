import React from 'react';

// Libraries
import styled from 'styled-components';

// Components
import PlaceCover from '../components/toptens-page/PlaceCover';

const Container = styled.div`
  width: 70%;
  margin: 0rem auto;
  height: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;

  @media (max-width: 1280px) {
    width: 80%;
  }

  @media (max-width: 1280px) {
    width: 90%;
  }

  @media (max-width: 750px) {
    width: 96%;
  }
`;

const TopTenPlace = () => {
  // eslint-disable-next-line no-unused-vars
  const data = 10;

  return (
    <Container>
      <PlaceCover />
    </Container>
  );
};

export default TopTenPlace;
