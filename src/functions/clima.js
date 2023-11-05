import React from 'react';
import { dia, hora, amanAnoch, humedad, visibilidad, air } from './datos';
import Grafica from '../components/grafica';

function Clima({ api, aqi }) {
  return (
    <div className="clima">
      <div className="diaHora">
        <h2 className="dia">{dia(api)}</h2>
        <h1>Buenos Aires</h1>
        <p className="hora">{hora(api)}</p>
      </div>

      <div className="temperaturas">
        <div className="temp">
          <div className="cielo">
            <img
              src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thermometer-celsius.svg"
              alt="Partly Cloudy Day"
              height="100"
            />
          </div>
          {api.current_weather.temperature}°C
        </div>
        <div className="extend" style={{ width: '70vw', height: '40vh' }}>
          <Grafica />
        </div>
      </div>

      <div className="limit">
        <div className="maxMin">
          <div className="max">
            <img
              src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-day.svg"
              alt="Partly Cloudy Day"
              height="48"
            />
            <br />
            {api.daily.temperature_2m_max[0]}°C
          </div>
          <div className="min">
            <img
              src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-night.svg"
              alt="Clear Night"
              height="48"
            />
            <br />
            {api.daily.temperature_2m_min[0]}°C
          </div>
        </div>

        <div className="datos">
          <div className="uv">
            <img
              src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/uv-index.svg"
              alt="Partly Cloudy Day"
              height="48"
            ></img>
            <br />
            {api.daily.uv_index_max[0]}
          </div>
          <div className="viento">
            <img
              src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg"
              height="50"
              alt=""
            ></img>
            <br />
            {api.current_weather.windspeed} km/h
          </div>
          <div className="cambios">
            <img
              src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-day.svg"
              height="35"
              alt=""
            ></img>
            <img
              src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze-night.svg"
              height="35"
              alt=""
            />
            <br />
            {amanAnoch(api)}
          </div>
          <div className="humedad">
            <img
              src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg"
              height="60"
              alt=""
            ></img>
            <br />
            {humedad(api)}%
          </div>
          <div className="visib">
            visibilidad<br />
            <img
              src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/mist.svg"
              height="40"
              alt=""
            />
            {visibilidad(api)} m
          </div>
          <div className="calidad">
            calidad del aire<br />
            <img
              src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/smoke-particles.svg"
              height="40"
              alt=""
            /><br/>
            {air(aqi, api)} km
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clima;
