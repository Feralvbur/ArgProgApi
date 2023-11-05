import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Transporte({ transporte, lineas, customIcon, seleccion }) {
  return (
    <>
      <div className="menuDiv">
        <select className="menu" onChange={(e) => { seleccion(e.target.value) }}>
          {transporte && transporte.map((item, index) => (
            <option key={index} value={item.route_short_name}>{item.route_short_name}</option>
          ))}
        </select>
      </div>
      <div id="map">
        <MapContainer center={[-34.60677315854788, -58.43547391938906]} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {lineas == null && transporte && transporte.map((item) => (
            <Marker key={item.id} position={[item.latitude, item.longitude]} icon={customIcon} >
              <Popup>
                Colectivo: {item.route_short_name} <br />
                Agencia: {item.agency_name}
                hacia: {item.trip_headsign}<br />
                velocidad: {item.speed} km/h
              </Popup>
            </Marker>
          ))}
          {lineas && lineas.map((item, index) => (
            <Marker key={index} position={[item.latitude, item.longitude]} icon={customIcon} >
              <Popup>
                Colectivo: {item.route_short_name} <br />
                Agencia: {item.agency_name}
                hacia: {item.trip_headsign}<br />
                velocidad: {item.speed} km/h
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default Transporte;
