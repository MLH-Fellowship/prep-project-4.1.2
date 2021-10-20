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
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;

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
  background: ${({ img, showBg }) => (img && showBg ? `url(${img})` : '#2F3437')};
  background-size: cover;

  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0;
    padding-top: 25rem;
    padding-bottom: 120px;
    /* padding-bottom: 5rem; */
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

  // console.log(location.pathname.split('/').length ===2);
  // console.log(backgroundImg);

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
