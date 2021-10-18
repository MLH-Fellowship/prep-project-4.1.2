import React from 'react';

import { useWeather } from '../../store/contexts/weather.context';


const TodaysWeather = ({ data }) => {
  const state = useWeather()[0];


  function toTime(dt) {
    const date = new Date(dt * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours} : ${minutes}`;
    return time;
  }

  function toDate(dt) {
    const date = new Date(dt * 1000);

    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return ` ${day}th ${month} ${year}`;
  }

  function toDayName(dt) {
    const date = new Date(dt * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    return dayName;
  }

  return (
    <div className='todaysWeather'>
      <div className='location-temp'>
        <span className="city">{state.results.name}</span>
        <div>
          <span className="temp">{Math.round(data.temp)}°C</span>
          <br />
          {data.weather[0].description}
        </div>
      </div>
      <div className='date'>
        <h2>{toDate(data.dt)}</h2>
        <h2>{toDayName(data.dt)}</h2>
      </div>
      <div className='weather-infos'>
        <div className='weather-info'>
        <span className="weather-info-title">Sunrise</span> 
          {toTime(data.sunrise)}
        </div>

        <div className='weather-info'>
        <span className="weather-info-title">Sunset</span>
          {toTime(data.sunset)}
        </div>

        <div className='weather-info'>
        <span className="weather-info-title">Chance of Rain</span>
          10%
        </div>

        <div className='weather-info'>
        <span className="weather-info-title">Feels like</span>
          {data.feels_like}
        </div>

        <div className='weather-info'>
        <span className="weather-info-title">Humidity</span>
           {data.humidity}
        </div>

        <div className='weather-info'>
        <span className="weather-info-title">Wind</span>
           {data.wind_speed}
        </div>

        <div className='weather-info'>
         <span className="weather-info-title">Visibility</span>
          {data.visibility}
        </div>

        <div className='weather-info'>
        <span className="weather-info-title">Pressure</span>
           {data.pressure}
        </div>
      </div>
    </div>
  );
};

export default TodaysWeather;
