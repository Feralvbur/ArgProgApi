import data from "../api.json"
const dia = parseInt(data.current_weather.time.slice(11,13));
const humedadArr = data.hourly.relativehumidity_2m;
const visibArr = data.hourly.visibility; 
function humedad(){
    
    return(humedadArr[dia])
}

export function visibilidad(Dia){
    return(visibArr[Dia])
}


export default humedad();