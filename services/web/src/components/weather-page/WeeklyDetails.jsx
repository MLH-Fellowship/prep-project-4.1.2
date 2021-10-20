import React from 'react';

// Libraries
import styled from 'styled-components';
import moment from 'moment';
import { useWeather } from '../../store/contexts/weather.context';

const Container = styled.div`
  grid-column: 4 / span 2;
  background: rgba(63, 68, 71, 0.6);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  min-height: 100px;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  @media (max-width: 1000px) {
    grid-column: 1 / span 5;
  }
`;

const Title = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.4rem;
  color: #ffffff;
  text-transform: capitalize;
`;

const Values = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: #ffffff;
  text-transform: capitalize;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WeeklyDetails = () => {
  const [state] = useWeather();

  return (
    <Container>
      <Row style={{ marginBottom: '1rem', width: '100%' }}>
        <Title style={{ width: '50%', textAlign: 'left' }}>Day</Title>
        <Title style={{ width: '25%', textAlign: 'center' }}>High</Title>
        <Title style={{ width: '25%', textAlign: 'center' }}>Low</Title>
      </Row>

      {state.weekly.slice(0, 6).map(({ date, max, min }) => (
        <Row key={date} style={{ marginBottom: '0.4rem', width: '100%' }}>
          <Values style={{ width: '50%', textAlign: 'left' }}>
            {moment.utc(date).format('dddd')}
          </Values>
          <Values style={{ width: '25%', textAlign: 'center' }}>{Math.round(max)} °C</Values>
          <Values style={{ width: '25%', textAlign: 'center' }}>{Math.round(min)} °C</Values>
        </Row>
      ))}
    </Container>
  );
};

export default WeeklyDetails;
