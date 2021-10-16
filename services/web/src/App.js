import React, { useEffect, useState } from 'react';

// Libraries
import styled from 'styled-components';

// Assets
import logo from './mlh-prep.png';

import WeatherDetails from './components/WeatherDetails/WeatherDetails';

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
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState('New York City');
  const [results, setResults] = useState(null);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric` +
        `&appid=${process.env.REACT_APP_APIKEY}`,
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.cod !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);
            setLat(result.coord.lat);
            setLong(result.coord.lon);
          }
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Logo src={logo} alt='MLH Prep Logo' />
      <div>
        <h2>Enter a city below 👇</h2>
        <Input type='text' value={city} onChange={(event) => setCity(event.target.value)} />
        <Results>
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && (
            <>
              <h3>{results.weather[0].main}</h3>
              <p>Feels like {results.main.feels_like}°C</p>
              <i>
                <p>
                  {results.name}, {results.sys.country}
                </p>
              </i>
            </>
          )}
        </Results>
      </div>
      {isLoaded && lat && long && <WeatherDetails city={city} lat={lat} long={long} />}
    </>
  );
}

export default App;
