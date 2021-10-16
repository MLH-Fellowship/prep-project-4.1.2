import React, { useEffect, useState } from 'react';

import TodaysWeather from './TodaysWeather';

const WeatherDetails = ({ city, lat, long }) => {
  const [currentData, setCurrentData] = useState();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}` +
        `&exclude=minutely,alerts&&units=metric&APPID=${process.env.REACT_APP_APIKEY}`,
    )
      .then((res) => res.json())
      .then((result) => {
        setCurrentData(result.current);
      });
  }, [lat, long]);
  return (
    <div className='weatherDetails'>
      {currentData && <TodaysWeather data={currentData} city={city} />}
    </div>
  );
};

export default WeatherDetails;
