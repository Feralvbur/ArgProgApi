import data from ".//api.json"
import hour from "./functions/hora"
import dia from "./functions/dia"
import puestas from "./functions/amanAnoch"
import airQuality from "./functions/AQI"
import humedad from "./functions/humidity"
import { visibilidad } from "./functions/humidity"
import Grafica from "./components/grafica"


function App() {
  const temp = data.current_weather.temperature;
  const max = data.daily.temperature_2m_max;
  const min = data.daily.temperature_2m_min;
  const uv = data.daily.uv_index_max;
  const wind = data.current_weather.windspeed;
  const Dia = parseInt(data.current_weather.time.slice(11,13));

  return(
 <>
 <div className="pag">
  
 <div className="clima">
  <div className="diaHora"><h2 className="dia">{dia}</h2>
  <h1>Buenos Aires</h1>
  <p className="hora">{hour}</p></div>
  
   <div className="temperaturas">
    <div className="temp"><div className="cielo"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thermometer-celsius.svg" alt="Partly Cloudy Day" height="100"/></div>{temp}°C</div>
    <div className="extend">
    <Grafica   />
    </div>
    </div>

    
    <div className="limit">
    <div className="maxMin"><div className="max"><img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-day.svg" alt="Partly Cloudy Day" height="48"/><br/> {max}°C</div><div className="min"><img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-night.svg" alt="Clear Night" height="48"/> <br/>{min}°C</div></div>
    <div className="masInfo"> <h2>Mas info</h2></div>
    </div>
    <div className="datos">
      <div className="uv"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/uv-index.svg" alt="Partly Cloudy Day" height="48"/><br/>{uv}</div>
      <div className="viento"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg" height="50"></img><br/>{wind} km/h</div>
      <div className="cambios"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-day.svg" height="35"/><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-night.svg" height="35"/><br/>{puestas}</div>
      <div className="humedad"><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg" height="60"/><br/>{humedad}%</div>
      <div className="visib">visibilidad<br/><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/mist.svg" height="40"/>{visibilidad(Dia)} m</div>
      <div className="calidad">calidad del aire<br/><img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/smoke-particles.svg" height="40"/><br/> {airQuality}</div>
      </div>
  </div>
  <div className="transp"></div>
  </div>
 </>)
}
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js"/>
export default App;
