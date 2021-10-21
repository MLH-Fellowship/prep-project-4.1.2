import React, { useEffect, useState } from 'react';

// Libraries
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

// Components
import NavigationMenu from './NavigationMenu';

// Utils
import { useWeather } from '../../store/contexts/weather.context';
import { getWeatherImg } from '../../utils/getWeatherImg';

const PrimeContainer = styled.div`
  width: 100vw;
  height: auto;
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageContainer = styled.div`
  width: calc(100vw - 15%);
  height: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-left: 15%;
  background: ${({ img, showBg }) => (img && showBg ? `url(${img})` : '#2F3437')};
  background-size: cover;

  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0;
    padding-bottom: 120px;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0px auto;

  @media (max-width: 650px) {
    width: 95%;
  }
`;

const Layout = ({ children }) => {
  const location = useLocation();
  const [state] = useWeather();
  const [backgroundImg, setBackgroundImg] = useState(getWeatherImg(state.weather.id));

  useEffect(() => {
    const img = getWeatherImg(state.weather.id);
    setBackgroundImg(img);
  }, [state.weather.id]);

  return (
    <PrimeContainer>
      <NavigationMenu />

      <PageContainer img={backgroundImg} showBg={location.pathname.split('/').length === 2}>
        <Container>{children}</Container>
      </PageContainer>
    </PrimeContainer>
  );
};

export default Layout;
