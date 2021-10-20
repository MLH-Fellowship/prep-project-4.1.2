/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';

// Libraries
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Components
import Modal from '../components/modal/Modal';

// Assets
import logo from '../mlh-prep.png';

// State handlers
import { useWeather } from '../store/contexts/weather.context';
import { WeatherActionTypes } from '../store/reducers/weather.reducer';
import { AccessTokenContext } from '../store/contexts/accessToken.context';
import LandingWeatherData from '../components/LandingPageWheatherData/LandingWeatherData';

/**
 * ! CHECKOUT the blog below for implementation details of
 * ! context api state management
 * ! https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */

const Logo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  margin-top: 20px;
`;

const Results = styled.div`
  margin: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

function App() {
  const [state, dispatch] = useWeather();
  const [showModal, setShowModal] = useState(false);
  const { user, setAccessToken } = useContext(AccessTokenContext);
  const history = useHistory();

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      const API_URL =
        // eslint-disable-next-line max-len
        `https://api.openweathermap.org/data/2.5/onecall?lat=${state.location.coords.lat}&lon=${state.location.coords.lng}&exclude={part}` +
        `&appid=${process.env.REACT_APP_APIKEY}`;

      try {
        dispatch({
          type: WeatherActionTypes.UpdateErrorStatus,
          payload: {
            error: null,
            loading: true,
          },
        });
        const { data } = await axios.get(API_URL);

        dispatch({
          type: WeatherActionTypes.UpdateWeatherDetails,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: WeatherActionTypes.UpdateErrorStatus,
          payload: {
            error,
            loading: false,
          },
        });
      }
    };

    fetchWeatherDetails();
  }, [dispatch, state.location.city, state.location.coords, state.location.isCityLatestUpdate]);

  if (state.error) {
    return <div>Error: {state.error.message}</div>;
  }

  return (
    <>
      {/* <Logo src={logo} alt='MLH Prep Logo' />
      <button type="button" onClick={() => {
        if (!user) {
          history.push("/login")
        } else {
          setAccessToken(null);
          history.push('/');
        }
      }}>
        {!user ? 'Login via Google' : 'Logout'}
      </button>
      <div>
        <h2>Click Search 👇 to update location</h2>
        <div
          role='button'
          tabIndex={0}
          onKeyDown={() => setShowModal(true)}
          onClick={() => setShowModal(true)}
        >
          <h1 style={{ marginTop: '1.3rem', fontSize: '2.4rem' }}>Search
            <img src="https://img.icons8.com/color/64/000000/search--v2.png" alt=""/></h1>
        </div>

        <Results>
          {state.loading ? (
            'Loading....'
          ) : (
            <div>
              .
            </div>
          )}
        </Results>
      </div> */}

      <Modal showModal={showModal} onClick={() => setShowModal(false)} />

      {/* <LandingWeatherData
        city={state.location.city}
        lat={state.location.coords.lat}
        long={state.location.coords.lng}
        aqi={state.weather.air_qi}
      /> */}
    </>
  );
}

export default App;
