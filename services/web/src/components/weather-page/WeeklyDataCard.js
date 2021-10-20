import React from 'react';

function calculateColorBasedOnAQI(aqiValue) {
  if (aqiValue < 50) return 'Green';
  if (aqiValue > 50 && aqiValue < 101) return 'Yellow';
  if (aqiValue > 100 && aqiValue < 151) return 'Orange';
  if (aqiValue > 150 && aqiValue < 201) return 'Red';
  if (aqiValue > 200 && aqiValue < 301) return 'Purple';
  if (aqiValue > 300) return 'Violet';

  return 'White';
}
function dateAndTime(unixStamp) {
  const unixTimestamp = unixStamp.dt;
  const milliseconds = unixTimestamp * 1000;
  const dateObject = new Date(milliseconds);
  const weekday = dateObject.toLocaleString('en-US', { weekday: 'long' });
  const month = dateObject.toLocaleString('en-US', { month: 'long' }).slice(0, 3);
  const date = dateObject.toLocaleString('en-US', { day: 'numeric' });

  return [weekday, month, date];
}

const WeeklyDataCard = ({ day, index }) => {
  const [weekday, month, date] = dateAndTime(day);
  return (
    <tr>
      <div className='weekday' key={index}>
        <td>
          {' '}
          <div className='date'>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line max-len */}
            {weekday}, {date} {month}
          </div>
        </td>
        <td>
          <div className='high'>{day.temp.max}</div>
        </td>
        <td>
          <div className='low'>{day.temp.min}</div>
        </td>
        <td className='desc'>{day.weather[0].description.toUpperCase()}</td>
      </div>
      <hr
        style={{
          backgroundColor: calculateColorBasedOnAQI(198),
        }}
      />
    </tr>
  );
};

export default WeeklyDataCard;
