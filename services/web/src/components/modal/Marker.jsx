import React, { useRef, useMemo } from 'react';

// Libraries
import { Marker, Popup } from 'react-leaflet';

// State Handlers
import { WeatherActionTypes } from '../../store/reducers/weather.reducer';
import { useWeather } from '../../store/contexts/weather.context';

const MapMarker = () => {
  const [state, dispatch] = useWeather();
  const markerRef = useRef(null);

  const eventHandler = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          dispatch({
            type: WeatherActionTypes.UpdateCoords,
            payload: marker.getLatLng(),
          });
        }
      },
    }),
    [dispatch],
  );

  return (
    <Marker draggable eventHandlers={eventHandler} position={state.location.coords} ref={markerRef}>
      <Popup minWidth={90}>
        <span>Drag to your location</span>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
