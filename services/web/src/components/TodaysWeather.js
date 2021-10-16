import React from 'react';

const TodaysWeather = ({ data, city }) => {
  function toTime(dt) {
    const date = new Date(dt * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours} : ${minutes}`;
    return time;
  }

  function toDate(dt) {
    const date = new Date(dt * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return ` ${day}th ${month} ${year} ${dayName}`;
  }

  console.log(data);
  return (
    <div className='todaysWeather'>
      <h1>{city}</h1>
      <h2>{toDate(data.dt)}</h2>
      <h2>{data.weather[0].description}</h2>
      Sunrise:{toTime(data.sunrise)}
      <br />
      Sunset:{toTime(data.sunset)}
      <br />
      Humidity:{data.humidity}
      <br />
      WInd:{data.wind_speed}
      <br />
      Feels like:{data.feels_like}
      <br />
      Visibility: {data.visibility}
      <br />
      Pressure:{data.pressure}
    </div>
  );
};

export default TodaysWeather;
