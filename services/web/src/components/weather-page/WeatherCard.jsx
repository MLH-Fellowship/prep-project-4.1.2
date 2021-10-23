import React from 'react';
import '../styles.css';
import moment from 'moment';
import { useWeather } from '../../store/contexts/weather.context';
import Loader from '../Loader';

const WeatherCard = () => {
  const [state] = useWeather();

  return (
    <div className='main'>
      {state.loading ? (
        <Loader />
      ) : (
        <>
          <p className='header'>{state.name}</p>
          <div className='flex'>
            <p className='day'>
              {moment().format('dddd')}, <span>{moment().format('LL')}</span>
            </p>
          </div>

          <div className='flex'>
            <p className='temp'>Temprature: {state.main.temp} &deg;C</p>
            <p className='temp'>Humidity: {state.main.humidity} %</p>
          </div>

          <div className='flex'>
            <p className='sunrise-sunset'>
              Sunrise: {new Date(state.sys.sunrise * 1000).toLocaleTimeString('en-IN')}
            </p>
            <p className='sunrise-sunset'>
              Sunset: {new Date(state.sys.sunset * 1000).toLocaleTimeString('en-IN')}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
