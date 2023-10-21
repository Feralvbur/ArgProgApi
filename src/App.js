import { hora } from "./functions/datos"
import { dia } from "./functions/datos"
import { amanAnoch } from "./functions/datos"
import { air } from "./functions/datos"
import { humedad } from "./functions/datos"
import { visibilidad } from "./functions/datos"
import Grafica from "./components/grafica"
import React, { useEffect, useState } from 'react';
import { max } from "./functions/datos"

function App() {
  const [api, setApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aqi, setAqi] = useState(null);  
  
    useEffect(()=> {
      const interval = setInterval(()=>{
      fetch('https://api.open-meteo.com/v1/forecast?latitude=-31.4135&longitude=-64.181&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&timezone=America%2FSao_Paulo')
         .then( resp => resp.json()
         ).then((data) => {
         
            setApi(data);
            setLoading(false);
         }).catch(err => {
        setError(err.message);
        setApi(null);
         })
        }, 10000);    
        })
  
      
        useEffect(()=> {
         const interval = setInterval(()=>{
    fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&hourly=pm10,pm2_5,european_aqi')
       .then( resp => resp.json()
       ).then((data) => {
       
          setAqi(data);
          setLoading(false);
       }).catch(err => {
      setError(err.message);
      setAqi(null);
       })
}, 10000);    
})

  return(
 <>

 {loading && <div>Cargando..</div>}
 {!loading && api &&(
 <div className="pag">
 <div className="clima">
  <div className="diaHora"><h2 className="dia">{dia(api)}</h2>
  <h1>Buenos Aires</h1>
  <p className="hora">{hora(api)}</p></div>


   <div className="temperaturas">
    <div className="temp"><div className="cielo"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thermometer-celsius.svg" alt="Partly Cloudy Day" height="100"/></div>{api.current_weather.temperature}°C</div>
    <div className="extend" style={{ width: '70vw', height: '40vh' }}>
    <Grafica   />
    
    </div>
    </div>

    
    <div className="limit">
    <div className="maxMin"><div className="max"><img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-day.svg" alt="Partly Cloudy Day" height="48"/><br/> {console.log(api.daily.temperature_2m_max)}°C</div><div className="min"><img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-night.svg" alt="Clear Night" height="48"/> <br/>{api.daily.temperature_2m_min}°C</div></div>
    
   
    <div className="datos">
      <div className="uv"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/uv-index.svg" alt="Partly Cloudy Day" height="48"></img><br/>{api.daily.uv_index_max}</div>
      <div className="viento"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg" height="50"></img><br/>{api.current_weather.windspeed} km/h</div>
      <div className="cambios"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-day.svg" height="35"></img><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-night.svg" height="35"/><br/>{amanAnoch(api)}</div>
      <div className="humedad"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg" height="60"></img><br/>{humedad(api)}%</div>
      <div className="visib">visibilidad<br/><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/mist.svg" height="40"/>{visibilidad(api)} m</div>
      <div className="calidad">calidad del aire<br/><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/smoke-particles.svg" height="40"/><br/> {air(aqi,api)}</div>
      </div>
      </div>
  </div>
  <div className="transp"></div>
  </div>
  )}
 </>)
 
}
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js"/>
export default App;
