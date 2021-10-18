import React from 'react';
// import getIcon from './utils';

const TodaysWeather = ({ data, city }) => {
  function toTime(dt) {
    const date = new Date(dt * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours} : ${minutes}`;
    return time;
  }
  console.log(data);

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
        <h1>{city}</h1>
        <div className='temp'>
          <h1>{Math.round(data.temp)}°C</h1>
          {data.weather[0].description}
        </div>
      </div>
      <div className='date'>
        <h2>{toDate(data.dt)}</h2>
        <h2>{toDayName(data.dt)}</h2>
      </div>
      <div className='weather-infos'>
        <div className='weather-info'>
          Sunrise <br />
          {toTime(data.sunrise)}
        </div>
        <div className='weather-info'>
          Sunset
          <br />
          {toTime(data.sunset)}
        </div>
        <div className='weather-info'>
          Chance of Rain
          <br />
          10%
        </div>
        <div className='weather-info'>
          Feels like
          <br />
          {data.feels_like}
        </div>

        <div className='weather-info'>
          Humidity
          <br /> {data.humidity}
        </div>
        <div className='weather-info'>
          Wind
          <br /> {data.wind_speed}
        </div>

        <div className='weather-info'>
          Visibility
          <br />
          {data.visibility}
        </div>
        <div className='weather-info'>
          Pressure
          <br /> {data.pressure}
        </div>
      </div>
    </div>
  );
};

export default TodaysWeather;
