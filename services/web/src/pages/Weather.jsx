import React, { useEffect, useState } from 'react';

// Libraries
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';

// Components
import Modal from '../components/modal/Modal';

// Assets
import logo from '../mlh-prep.png';

// State handlers
import { useWeather } from '../store/contexts/weather.context';
import { WeatherActionTypes } from '../store/reducers/weather.reducer';

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
  background-color: white;
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 20px;
  border-radius: 8px;
  color: black;
  padding: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

function App() {
  const [state, dispatch] = useWeather();
  const [showModal, setShowModal] = useState(true);

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
      <Logo src={logo} alt='MLH Prep Logo' />
      <div>
        <h2>Click on the city 👇 to update location</h2>
        <div
          role='button'
          tabIndex={0}
          onKeyDown={() => setShowModal(true)}
          onClick={() => setShowModal(true)}
        >
          <h1 style={{ marginTop: '1.3rem', fontSize: '2.4rem' }}>{state.location.city}</h1>
        </div>

        <Results>
          {state.loading ? (
            'Loading....'
          ) : (
            <div>
              <h2>
                {state.location.city}, {state.location.country}
              </h2>
              <h2 style={{ marginTop: 20 }}>{state.weather.description}</h2>
              <h2 style={{ marginTop: 8 }}>Feels Like: {state.weather.temp}</h2>
              <h2 style={{ marginTop: 8 }}>
                Sun Rise: {moment(state.weather.sun.rise * 1000).format('LT')}
              </h2>
              <h2 style={{ marginTop: 8 }}>
                Sun Set: {moment(state.weather.sun.set * 1000).format('LT')}
              </h2>
            </div>
          )}
        </Results>
      </div>

      <Modal showModal={showModal} onClick={() => setShowModal(false)} />
    </>
  );
}

export default App;
