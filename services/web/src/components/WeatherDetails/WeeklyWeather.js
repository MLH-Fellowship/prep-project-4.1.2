import React from 'react';

import getIcon from './utils';

const WeeklyWeather = ({ data }) => {
  function toDateTime(dt) {
    const date = new Date(dt * 1000);
    return date.toLocaleString('default', { weekday: 'long' });
  }

  return (
    <div className='weeklyWeather'>
      {data.map((day) => (
        <h3 key={day.dt}>
          {toDateTime(day.dt)}--{getIcon(day.weather[0].icon)}--{Math.round(day.temp.min)}--
          {Math.round(day.temp.max)}
        </h3>
      ))}
    </div>
  );
};

export default WeeklyWeather;
