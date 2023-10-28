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
import 'leaflet/dist/leaflet.css';
import './App.css'
import { fetchClimaData, fetchAirQualityData, fetchTransporte } from './functions/api';

function App() {
   const [api, setApi] = useState(null);
   const [loading, setLoading] = useState(true);
   const [mapLoading, setMapLoading] = useState(true);
   const [error, setError] = useState(null);
   const [aqi, setAqi] = useState(null);
   const [transporte, setTransporte] = useState(null);
   const [estSeleccion, setEstSeleccion] = useState([]);
   const [lineas, setLineas] = useState(null);
   const customIcon = L.icon({
      iconUrl: 'https://cdn.icon-icons.com/icons2/3181/PNG/96/bus_transportation_travel_transport_icon_194010.png', // Reemplaza con la URL de tu imagen de icono
      iconSize: [25, 25],

   });
   const seleccion = (linea) => {
      setEstSeleccion(linea)
      setLineas(transporte.filter(item => item.route_short_name === linea));

   }

   useEffect(() => {
      fetchClimaData()
         .then((data) => {
            setApi(data);
            setLoading(false);
         })
         .catch((err) => {
            setError(err.message);
            setApi(null);
         });
   }, []);

   useEffect(() => {
      fetchAirQualityData()
         .then((data) => {
            setAqi(data);
            setLoading(false);
         })
         .catch((err) => {
            setError(err.message);
            setAqi(null);
         });
   }, []);

   useEffect(() => {
      const interval = setInterval(() => {
         fetchTransporte()
            .then((data) => {
               setTransporte(data);
               setMapLoading(false);
            })
            .catch((err) => {
               setError(err.message);
               setTransporte(null);
            });
      }, 31000);
      return () => clearInterval(interval);
   }, [])





   return (
      <>

         {loading && <div className="Load">
            <img className="loadImg" src="https://media3.giphy.com/media/XunOdEWPoTCxraOxzN/200.webp?cid=ecf05e47wzsxsoiylp8sw6g6s2pl1oyvwuvpcqye3o3nqf7g&ep=v1_gifs_search&rid=200.webp&ct=g" /><br />Cargando..</div>}
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
                     <div className="maxMin"><div className="max"><img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-day.svg" alt="Partly Cloudy Day" height="48" /><br /> {api.daily.temperature_2m_max[0]}°C</div><div className="min"><img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-night.svg" alt="Clear Night" height="48" /> <br />{api.daily.temperature_2m_min[0]}°C</div></div>


                     <div className="datos">
                        <div className="uv"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/uv-index.svg" alt="Partly Cloudy Day" height="48"></img><br />{api.daily.uv_index_max[0]}</div>
                        <div className="viento"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg" height="50" alt=""></img><br />{api.current_weather.windspeed} km/h</div>
                        <div className="cambios"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-day.svg" height="35" alt=""></img><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-night.svg" height="35" alt="" /><br />{amanAnoch(api)}</div>
                        <div className="humedad"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg" height="60" alt=""></img><br />{humedad(api)}%</div>
                        <div className="visib">visibilidad<br /><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/mist.svg" height="40" alt="" />{visibilidad(api)} m</div>
                        <div className="calidad">calidad del aire<br /><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/smoke-particles.svg" height="40" alt="" /><br /> {air(aqi, api)}</div>
                     </div>
                  </div>
               </div>

               <div className="transp">

                  {mapLoading && <div className="Load">
                     <img className="loadImg" src="https://media4.giphy.com/media/3y0oCOkdKKRi0/200.webp?cid=ecf05e47vphw2gqmji7hbz4z7hkooxpxzrsrthu8ig7xlxrr&ep=v1_gifs_search&rid=200.webp&ct=g" /><br />Cargando..</div>}
                  {transporte ? (
                     <>
                        <div className="menuDiv">
                           <select className="menu" onChange={(e) => { seleccion(e.target.value) }}>{transporte && transporte.map((item, index) =>
                              <option key={index}>{item.route_short_name}</option>
                           )}

                           </select>
                        </div>
                        <div id="map">
                           <MapContainer center={[-34.60677315854788, -58.43547391938906]} zoom={10} scrollWheelZoom={false}>
                              <TileLayer
                                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              />

                              {lineas == null && transporte && transporte.map((item) => (
                                 <Marker key={item.id} position={[item.latitude, item.longitude]} icon={customIcon} html='<span class="my-div-span">RAF Banff Airfield</span>'>
                                    <Popup>
                                       Colectivo: {item.route_short_name} <br />
                                       Agencia: {item.agency_name}
                                       hacia: {item.trip_headsign}<br />
                                       velocidad: {item.speed}
                                    </Popup>
                                 </Marker>
                              ))}
                              {lineas && lineas.map((item) => (
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
                     </>
                  ) : null}
               </div>
            </div>

         )}
      </>)

}



<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js" />
export default App;


//se que está demasiado cargado app, pero le di prioridad a terminar transporte antes que separar los componentes
//porque me estaba dando problemas