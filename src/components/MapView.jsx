import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle map bounds when itinerary changes
function MapUpdater({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);
  return null;
}

export default function MapView({ itinerary }) {
  if (!itinerary || itinerary.length === 0) return <div className="p-6">No map data available</div>;

  // Flatten all activities to get markers
  const markers = itinerary.flatMap(day => day.activities);

  return (
    <MapContainer 
      center={[48.8566, 2.3522]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapUpdater markers={markers} />
      
      {markers.map((activity) => (
        <Marker key={activity.id} position={[activity.lat, activity.lng]}>
          <Popup>
            <div style={{ padding: '0.2rem' }}>
              <h4 style={{ margin: '0 0 0.2rem 0', color: '#1e293b' }}>{activity.title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{activity.time} - {activity.duration}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
