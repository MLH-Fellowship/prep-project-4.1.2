import React, { useEffect,useState } from 'react';

// Libraries
import styled from 'styled-components';

// Assets
import logo from '../mlh-prep.png';

import WeatherDetails from '../components/WeatherDetails/WeatherDetails';

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

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 10px;
  width: 200px;
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
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${state.city}&units=metric` +
        `&appid=${process.env.REACT_APP_APIKEY}`,
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.cod !== 200) {
            dispatch({
              type: WeatherActionTypes.UpdateWeatherDetails,
              payload: {
                results: null,
                isLoaded: false,
              },
            });
          } else {
            dispatch({
              type: WeatherActionTypes.UpdateWeatherDetails,
              payload: {
                results: result,
                isLoaded: true,
              },
            });
            setLat(result.coord.lat);
            setLong(result.coord.lon);
          }
        },
        (err) => {
          dispatch({
            type: WeatherActionTypes.UpdateWeatherDetails,
            payload: {
              error: err,
              isLoaded: false,
            },
          });
        },
      );
  }, [state.city, dispatch]);

  if (state.error) {
    return <div>Error: {state.error.message}</div>;
  }

  return (
    <>
      <Logo src={logo} alt='MLH Prep Logo' />
      <div>
        <h2>Enter a city below 👇</h2>
        <Input
          type='text'
          value={state.city}
          onChange={(event) =>
            dispatch({
              type: WeatherActionTypes.UpdateLocation,
              payload: event.target.value,
            })
          }
        />
        <Results>
          {!state.isLoaded && <h2>Loading...</h2>}
          {state.isLoaded && state.results && (
            <>
              <h3>{state.results.weather[0].main}</h3>
              <p>Feels like {state.results.main.feels_like}°C</p>
              <i>
                <p>
                  {state.results.name}, {state.results.sys.country}
                </p>
              </i>
            </>
          )}
        </Results>
      </div>
      {state.isLoaded && lat && long && <WeatherDetails city={state.city} lat={lat} long={long} />}
    </>
  );
}

export default App;
