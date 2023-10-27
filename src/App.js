import { hora } from "./functions/datos"
import { dia } from "./functions/datos"
import { amanAnoch } from "./functions/datos"
import { air } from "./functions/datos"
import { humedad } from "./functions/datos"
import { visibilidad } from "./functions/datos"
import Grafica from "./components/grafica"
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Agrega esta línea para cargar los estilos de Leaflet
import './App.css'
import transp from "./transport.json"

function App() {
   const [api, setApi] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [aqi, setAqi] = useState(null);
   const transporte = transp.slice(0, 100);
   const customIcon = L.icon({
      iconUrl: 'https://cdn.icon-icons.com/icons2/3181/PNG/96/bus_transportation_travel_transport_icon_194010.png', // Reemplaza con la URL de tu imagen de icono
      iconSize: [25, 25],

   });
  

useEffect(() => {

   fetch('https://api.open-meteo.com/v1/forecast?latitude=-31.4135&longitude=-64.181&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&timezone=America%2FSao_Paulo')
      .then(resp => resp.json()
      ).then((data) => {

         setApi(data);
         setLoading(false);
      }).catch(err => {
         setError(err.message);
         setApi(null);
      })

}, [])



useEffect(() => {

   fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&hourly=pm10,pm2_5,european_aqi')
      .then(resp => resp.json()
      ).then((data) => {

         setAqi(data);
         setLoading(false);
      }).catch(err => {
         setError(err.message);
         setAqi(null);
      })
}, [])

return (
   <>

    
      {loading && <div>Cargando..</div>}
      {!loading && api && (
         <div className="pag">
            <div className="clima">
               <div className="diaHora"><h2 className="dia">{dia(api)}</h2>
                  <h1>Buenos Aires</h1>
                  <p className="hora">{hora(api)}</p></div>


               <div className="temperaturas">
                  <div className="temp"><div className="cielo"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thermometer-celsius.svg" alt="Partly Cloudy Day" height="100" /></div>{api.current_weather.temperature}°C</div>
                  <div className="extend" style={{ width: '70vw', height: '40vh' }}>
                     <Grafica />

                  </div>
               </div>


               <div className="limit">
                  <div className="maxMin"><div className="max"><img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-day.svg" alt="Partly Cloudy Day" height="48" /><br /> {console.log(api.daily.temperature_2m_max)}°C</div><div className="min"><img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-night.svg" alt="Clear Night" height="48" /> <br />{ }°C</div></div>


                  <div className="datos">
                     <div className="uv"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/uv-index.svg" alt="Partly Cloudy Day" height="48"></img><br />{api.daily.uv_index_max}</div>
                     <div className="viento"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg" height="50" alt=""></img><br />{api.current_weather.windspeed} km/h</div>
                     <div className="cambios"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-day.svg" height="35" alt=""></img><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-night.svg" height="35" alt="" /><br />{amanAnoch(api)}</div>
                     <div className="humedad"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg" height="60" alt=""></img><br />{humedad(api)}%</div>
                     <div className="visib">visibilidad<br /><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/mist.svg" height="40" alt="" />{visibilidad(api)} m</div>
                     <div className="calidad">calidad del aire<br /><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/smoke-particles.svg" height="40" alt="" /><br /> {air(aqi, api)}</div>
                  </div>
               </div>
            </div>
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
                     {transporte.map((item) => (
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
         </div>
      )}
   </>)

}



<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js" />
export default App;
