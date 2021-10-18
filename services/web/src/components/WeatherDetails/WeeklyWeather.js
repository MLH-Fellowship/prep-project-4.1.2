import React from 'react';

import getIcon from './utils';

const WeeklyWeather = ({ data }) => {
  function toDateTime(dt) {
    const date = new Date(dt * 1000);
    return date.toLocaleString('default', { weekday: 'long' });
  }

  return (
    <div className='weeklyWeather'>
      <table>
        <thead>
          <tr>
            <th className='weekDays'>DAY</th>
            <th> </th>
            <th>HIGH</th>
            <th>LOW</th>
          </tr>
        </thead>
        <tbody>
          {data.map((day) => (
            <tr key={day.dt}>
              <td className='weekDays'>{toDateTime(day.dt)}</td>
              <td>{getIcon(day.weather[0].icon)}</td>
              <td>{Math.round(day.temp.max)}</td>
              <td>{Math.round(day.temp.min)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyWeather;
