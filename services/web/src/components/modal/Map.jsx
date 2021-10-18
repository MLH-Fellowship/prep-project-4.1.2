import React from 'react';

// Libraries
import { MapContainer, TileLayer } from 'react-leaflet';

// Components
import Marker from './Marker';

// State Handlers
import { useWeather } from '../../store/contexts/weather.context';

const Map = () => {
  const [state] = useWeather();

  return (
    <MapContainer
      center={[state.location.coords.lat, state.location.coords.lng]}
      zoom={5}
      scrollWheelZoom
      style={{ height: '100%', width: '100%', minHeight: '230px', borderRadius: '6px' }}
    >
      <TileLayer
        // eslint-disable-next-line max-len
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        // eslint-disable-next-line max-len
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_KEY}`}
        maxZoom={18}
        tileSize={512}
        zoomOffset={-1}
      />
      <Marker />
    </MapContainer>
  );
};

export default Map;
