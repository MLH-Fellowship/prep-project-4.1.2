import React from 'react';

// Libraries
import styled from 'styled-components';

import Tick from '../../assets/tick.png';

const Container = styled.div`
  width: 100%;
  padding-top: 5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const H1 = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;
  line-height: 2.5rem;
  color: #ffffff;
  text-align: left;
`;

const P1 = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.6rem;
  color: #cbcbcb;
  text-align: left;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const PlaceCover = () => (
  <Container>
    {/*  eslint-disable-next-line max-len */}
    <Image src='https://images.unsplash.com/photo-1546440730-4716c1a47815?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1434&q=80' />

    <ContentContainer>
      <div>
        <H1>New York</H1>
        <P1>USA</P1>
      </div>

      <div>
        <span>
          <H1>1303</H1>
        </span>
        <Img src={Tick} alt='Tick' />
      </div>
    </ContentContainer>
  </Container>
);

export default PlaceCover;
