import React from 'react';

const WeeklyWeather = ({ data }) => {
  function toDateTime(dt) {
    const date = new Date(dt * 1000);
    return date.toLocaleString('default', { weekday: 'long' });
  }
  console.log(data);
  return (
    <div className='weeklyWeather'>
      {data.map((day) => (
        <h3 key={day.dt}>
          {toDateTime(day.dt)}--{day.temp.min}--{day.temp.max}
        </h3>
      ))}
    </div>
  );
};

export default WeeklyWeather;
