function humedad(api){
    if (api && api.current_weather && api.current_weather.time) {
const dia = parseInt(api.current_weather.time.slice(11,13));
const humedadArr = api.hourly.relativehumidity_2m;

    return(humedadArr[dia])
    }
}

export function visibilidad(api){
    if (api && api.current_weather && api.current_weather.time) {
    const dia = parseInt(api.current_weather.time.slice(11,13));
    const visibArr = api.hourly.visibility; 
    return(visibArr[dia])
    }
}


export default humedad;