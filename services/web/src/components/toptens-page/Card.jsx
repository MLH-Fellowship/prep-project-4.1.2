import React from 'react';

// Libraries
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-width: 220px;
  height: 300px;
  background: rgba(63, 68, 71, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;

  padding: 1.5rem 1rem;
  overflow: hidden;
  transition: 0.4s ease-in;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    background: #00838d;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(0);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }

  &:hover {
    border: 2px solid white;
    transition: 0.4s ease-out;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    transform: translateY(10px);
    color: white;
    cursor: pointer;

    &:before {
      transform: scale(21);
    }
  }
`;

const GoCorner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32px;
  height: 32px;
  overflow: hidden;
  top: 0;
  right: 0;
  background-color: #00838d;
  border-radius: 0 4px 0 32px;
`;

const GoArrow = styled.div`
  margin-top: -4px;
  margin-right: -4px;
  color: white;
`;

const City = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;
  line-height: 2.5rem;
  color: #ffffff;
  text-align: left;
`;

const DayText = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.6rem;
  color: #cbcbcb;
  text-align: left;
`;

const Temp = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 2.25rem;
  line-height: 3.3rem;
  color: #ffffff;
`;

const Card = ({ city = 'New York', temp = '24', country = 'USA', likes = 223 }) => (
  <Container>
    <City>{city}</City>
    <DayText>{country}</DayText>
    <Temp>{temp} °C</Temp>
    <DayText style={{ textAlign: 'center', marginTop: 20 }}>upvoted by</DayText>
    <DayText style={{ textAlign: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
      {likes}
    </DayText>
    <DayText style={{ textAlign: 'center' }}>wanderers</DayText>

    <GoCorner>
      <GoArrow>→</GoArrow>
    </GoCorner>
  </Container>
);

export default Card;
