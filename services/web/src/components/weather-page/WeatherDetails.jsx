import React from 'react';

// Libraries
import styled from 'styled-components';
import moment from 'moment';

// State Handlers
import { useWeather } from '../../store/contexts/weather.context';

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 300px;

  background: rgba(63, 68, 71, 0.6);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  padding: 2rem;

  grid-column: 1 / span 3;

  @media (max-width: 1000px) {
    grid-column: 1 / span 5;
  }
`;

const OverviewContaineer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LocationName = styled.h1`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;
  line-height: 2.5rem;
  color: #ffffff;
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

const H2 = styled.h2`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.4rem;
  text-transform: capitalize;
  text-align: left;
  color: #ffffff;
`;

const P2 = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1.4rem;
  line-height: 1.8rem;
  display: flex;
  color: #ffffff;
`;

const H3 = styled.h2`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 1.2rem;
  text-transform: capitalize;
  text-align: left;
  color: #ffffff;
`;

const P3 = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2rem;
  line-height: 1.6rem;
  display: flex;
  color: #ffffff;
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SubContainer = styled.div`
  width: 25%;
  min-width: 110px;
  margin-top: 1.5rem;
`;

const WeatherDetails = () => {
  const [state] = useWeather();

  const Details = [
    [
      {
        title: 'SUNRISE',
        value: moment.utc(state.weather.sun.rise).format('hh:mm a'),
      },
      {
        title: 'SUNSET',
        value: moment.utc(state.weather.sun.set).format('hh:mm a'),
      },
      {
        title: 'HUMIDITY',
        value: `${state.weather.rain.humidity} %`,
      },
      {
        title: 'CHANCE OF RAIN',
        value: `${state.weather.rain.chance} %`,
      },
    ],
    [
      {
        title: 'WIND',
        value: `${state.weather.wind.speed} kPH`,
      },
      {
        title: 'FEELS LIKE',
        value: `${state.weather.temp} °C`,
      },
      {
        title: 'PRESSURE',
        value: `${state.weather.wind.pressure} hPa`,
      },
      {
        title: 'PRECIPITATION',
        value: `${state.weather.rain.precipitation || 0} cm`,
      },
    ],
  ];

  return (
    <Container>
      <OverviewContaineer>
        <div>
          <LocationName>{`${state.location.city},${state.location.country}`}</LocationName>
          <DayText>{moment(state.weather.date).format('Do MMMM YYYY')}</DayText>
          <DayText>{moment(state.weather.day).format('dddd')}</DayText>
        </div>
        <Temp>24° C</Temp>
      </OverviewContaineer>

      <div style={{ marginTop: '20px' }}>
        <H2>Air Quality Index</H2>
        <P2>79 - Satisfactory</P2>
      </div>

      {Details.map((row, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <DetailsContainer key={index}>
          {row.map(({ title, value }) => (
            <SubContainer key={`${title}-${value}`}>
              <H3>{title}</H3>
              <P3>{value}</P3>
            </SubContainer>
          ))}
        </DetailsContainer>
      ))}
    </Container>
  );
};

export default WeatherDetails;
