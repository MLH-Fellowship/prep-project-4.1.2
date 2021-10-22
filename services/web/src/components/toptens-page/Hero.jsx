import React, { useState } from 'react';

// Libraries
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-width: 220px;
  height: auto;
  min-height: 150px;
  background: rgba(63, 68, 71, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;

  margin-top: 2.5rem;
  padding: 1.5rem 1rem;
  overflow: hidden;
  transition: all 0.4s ease-in;
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

const H2 = styled.h2`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1.6rem;
  line-height: 2.4rem;
  color: #ffffff;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
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

const Input = styled.input`
  width: auto;
  height: 2.4rem;
  font-size: 1.4rem;
  min-width: 200px;
  border: 1px solid white;
  border-radius: 4px;
  background: transparent;
  color: white;
  margin-top: 0.8rem;
  padding: 0.3rem 0.6rem;

  &:focus {
    border: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Hero = () => {
  const [place, setPlace] = useState('');

  return (
    <Container>
      <H1>Top Ten Places</H1>
      <P1>
        Checkout the top ranked places by wanderers from all over the world. Do you like the place?
        Upvote it so that your favourite place is ranked first{' '}
      </P1>
      <P1>Have an opinion? Feel free to comment your thoughts above the place.</P1>

      <InputContainer>
        <H2 style={{ textAlign: 'left' }}>Search top places near you!</H2>
        <Input value={place} onChange={(e) => setPlace(e.target.value)} placeholder='Place Name' />
      </InputContainer>
    </Container>
  );
};

export default Hero;
