import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
function Map({ x, y }) {
  return (
    <div className="map">
      {x && y ? (
        <MapContainer center={[y, x]} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[y, x]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      ) : null}
    </div>
  );
}

export default Map;
