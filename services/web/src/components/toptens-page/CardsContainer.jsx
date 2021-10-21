import React from 'react';

// Libraries
import styled from 'styled-components';

// Components
import Card from './Card';

const Container = styled.div`
  width: 100%;
  height: auto;

  /* display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap; */

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;

  margin-top: 1rem;
`;

const CardContainer = () => {
  const DATA = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Container>
      {DATA.map((key) => (
        <Card key={key} />
      ))}
    </Container>
  );
};

export default CardContainer;
