import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';


function Transport({  }) {
  const [transporte, setTransporte] = useState(null);
  const customIcon = L.icon({
    iconUrl: 'https://cdn.icon-icons.com/icons2/3181/PNG/96/bus_transportation_travel_transport_icon_194010.png', // Reemplaza con la URL de tu imagen de icono
    iconSize: [25, 25],

  });
  return (
    <div className="transp">
      <div className="linea">
        <form>
          <label>
            Seleccione la linea de Colectivo:
            <select value="nombre">
              <option value="253A">253A</option>
              <option value="153A">153A</option>
              <option value="321A">321A</option>
              <option value="148B">148B</option>
            </select>
          </label>
          <input type="submit" value="Enviar" />
        </form></div>

      <div id="map">
        <MapContainer center={[-34.60677315854788, -58.43547391938906]} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {transporte && transporte.map((item) => (

            <Marker key={item.id} position={[item.latitude, item.longitude]} icon={customIcon} html='<span class="my-div-span">RAF Banff Airfield</span>'>
              <Popup>
                Colectivo: {item.route_short_name} <br />
                Agencia: {item.agency_name}
                hacia: {item.trip_headsign}<br />
                velocidad: {item.speed}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Transport();
