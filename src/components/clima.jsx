import React from "react";

function clima() {
  return(
  <div className="clima">
  <div className="diaHora"><h1 className="dia">Lunes</h1><p className="hora">14:00 hs</p></div>
  
   <div className="temperaturas">
    <div className="temp"><div className="cielo">nublado</div>20°C</div>
    <div className="extend">Temperaturas random</div>
    </div>

    
    <div className="limit">
    <div className="maxMin"><div className="max">img<br/> 20°c</div><div className="min">img <br/>16°c</div></div>
    <div> <h2>Mas info</h2></div>
    </div>
    <div className="datos">
      <div className="uv">Rayos uv<br/>7</div>
      <div className="viento">Viento<br/>50000 km/h</div>
      <div className="cambios">Amanecer y anochecer<br/>16/59</div>
      <div className="humedad">Humedad<br/>0,1%</div>
      <div className="visib">visibilidad<br/>5 km</div>
      <div className="calidad">calidad del aire<br/>150 <br/> normal</div>
      </div>
  </div>)
}
export default clima;