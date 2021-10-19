import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';

// STate Handlers
import { useWeather } from '../../store/contexts/weather.context';
import { WeatherActionTypes } from '../../store/reducers/weather.reducer';

export default () => {
  const [, dispatch] = useWeather();
  return (
    <div style={{ width: '100%', zIndex: 1000000 }}>
      <AlgoliaPlaces
        placeholder='Write an address here'
        options={{
          appId: process.env.REACT_APP_ALGOLIA_APP_ID,
          apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
          language: 'eng',
          type: 'city',
        }}
        onChange={({ suggestion }) => {
          dispatch({
            type: WeatherActionTypes.UpdateCoords,
            payload: {
              lat: suggestion.latlng.lat,
              lng: suggestion.latlng.lng,
              city: suggestion.name,
              country: suggestion.country,
            },
          });
        }}
        onError={({ message }) =>
          dispatch({
            type: WeatherActionTypes.UpdateErrorStatus,
            payload: {
              loading: false,
              error: message,
            },
          })
        }
      />
    </div>
  );
};
