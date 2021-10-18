import React from 'react';

// Libraries
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => (
  <MapContainer
    center={[51.505, -0.09]}
    zoom={13}
    scrollWheelZoom={false}
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
    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
);

export default Map;
