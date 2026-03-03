import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapEvents = ({ onCoordsChange }) => {
  useMapEvents({
    dragend: (e) => {
      const newCenter = e.target.getCenter();
      onCoordsChange({ lat: newCenter.lat, lng: newCenter.lng });
    },
  });
  return null;
};

const MapComponent = ({ coords, onCoordsChange }) => {
  // Use a unique key to force a clean remount every time
  // This is a foolproof way to prevent "Map container is already initialized"
  const mapKey = React.useMemo(() => `map-${Date.now()}-${Math.random()}`, []);

  return (
    <MapContainer 
      key={mapKey}
      center={[coords.lat, coords.lng]} 
      zoom={15} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[coords.lat, coords.lng]} />
      <MapEvents onCoordsChange={onCoordsChange} />
    </MapContainer>
  );
};

export default MapComponent;
