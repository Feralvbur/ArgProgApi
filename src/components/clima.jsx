import React from "react";

function clima(props){
  return(
<div id="clima">
    <h1>Lunes</h1>
    <div id="temp">20°C</div>
    <div id="cielo">nublado</div>
    <div id="dia">lunes, 18:00</div>
    <div id="limit">20°c/16°c</div>
    <div id="extend">Temperaturas random</div>
    <h2>Mas info</h2>
    <div id="datos">
      <div id="uv">Rayos uv<br/>7</div> 
      <div id="viento">Viento<br/>50000 km/h</div>
      <div id="cambios">Amanecer y anochecer<br/>16/59</div>
      <div id="humedad">Humedad<br/>0,1%</div>
      <div id="visib">visibilidad<br/>5 km</div>
      <div id="calidad">calidad del aire<br/>150 <br/> normal</div>
    </div>
    </div>
  )
}
export default clima;