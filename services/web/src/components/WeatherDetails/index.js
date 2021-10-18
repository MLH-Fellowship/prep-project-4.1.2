import React, { useEffect, useState } from 'react';

import './weatherdetails.css';

import TodaysWeather from './TodaysWeather';
import WeeklyWeather from './WeeklyWeather';

const WeatherDetails = ({ lat, long }) => {
  const [currentData, setCurrentData] = useState();
  const [weekData, setWeekData] = useState();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}` +
        `&exclude=minutely,alerts&&units=metric&APPID=${process.env.REACT_APP_APIKEY}`,
    )
      .then((res) => res.json())
      .then((result) => {
        setCurrentData(result.current);
        setWeekData(result.daily);
      });
  }, [lat, long]);
  return (
    <div className='weatherDetails'>
      {currentData && weekData && <TodaysWeather data={currentData} pop={weekData[0].pop} />}
      {weekData && <WeeklyWeather data={weekData} />}
    </div>
  );
};

export default WeatherDetails;
