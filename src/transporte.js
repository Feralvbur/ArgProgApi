import React, { useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import transp from './transport.json';

const customIcon = L.icon({
  iconUrl: 'https://cdn.icon-icons.com/icons2/3181/PNG/96/bus_transportation_travel_transport_icon_194010.png',
  iconSize: [25, 25],
});

function Transporte() {
  const transporte = transp.slice(0, 100);
  const [selectedLine, setSelectedLine] = useState('253A');

  return (
    <div className="transp">
      <div className="linea">
        <form>
          <label>
            Seleccione la linea de Colectivo:
            <select value={selectedLine} onChange={(e) => setSelectedLine(e.target.value)}>
              <option value="253A">253A</option>
              <option value="153A">153A</option>
              <option value="321A">321A</option>
              <option value="148B">148B</option>
            </select>
          </label>
          <input type="submit" value="Enviar" />
        </form>
      </div>
      <div id="map">
        <MapContainer center={[-34.60677315854788, -58.43547391938906]} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {transporte.map((item) => {
            if (item.route_short_name === selectedLine) {
              return (
                <Marker key={item.id} position={[item.latitude, item.longitude]} icon={customIcon}>
                  <Popup>
                    Colectivo: {item.route_short_name} <br />
                    Agencia: {item.agency_name} hacia: {item.trip_headsign} <br />
                    velocidad: {item.speed}
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default Transporte();
