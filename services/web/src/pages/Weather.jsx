/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';

// Libraries
import styled from 'styled-components';
import axios from 'axios';

// Components
import Modal from '../components/modal/Modal';
import WeatherGrid from '../components/weather-page/WeatherGrid';

// State handlers
import { useWeather } from '../store/contexts/weather.context';
import { WeatherActionTypes } from '../store/reducers/weather.reducer';

/**
 * ! CHECKOUT the blog below for implementation details of
 * ! context api state management
 * ! https://kentcdodds.com/blog/how-to-use-react-context-effectively
 */

const Results = styled.div`
  margin: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

function App() {
  const [state, dispatch] = useWeather();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      const API_URL =
        // eslint-disable-next-line max-len
        `https://api.openweathermap.org/data/2.5/onecall?lat=${state.location.coords.lat}&lon=${state.location.coords.lng}&units=metric&exclude={part}` +
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
      <WeatherGrid />
      {/* // eslint-disable-next-line react/button-has-type */}
      <button onClick={() => setShowModal((current) => !current)}>Open Modal</button>
      <Modal showModal={showModal} onClick={() => setShowModal(false)} />
    </>
  );
}

export default App;
