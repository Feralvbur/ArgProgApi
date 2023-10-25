export function obtenerDiaSemana(api) {
    // Array de días de la semana
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
    // Convierte la fecha en un objeto Date
    const fechaDate = new Date(api.current_weather.time);
  
    // Obtén el número del día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
    const numeroDiaSemana = fechaDate.getDay();
  
    // Usa el número para obtener el nombre del día
    const nombreDiaSemana = diasSemana[numeroDiaSemana];
  
    return nombreDiaSemana;
  }
  
  // Ejemplo de uso
//   const fecha = "2023-10-19T20:15";
//   const diaSemana = obtenerDiaSemana(fecha);
  

export function humedad(api){
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

export function hora(api){
    if (api && api.current_weather && api.current_weather.time) {
  const hora = api.current_weather.time;
const hora1 = (hora.split("T"))
return(hora1[1]);
    }
}


export function dia(api){
    if (api && api.current_weather && api.current_weather.time) {
    const hora = api.current_weather.time;
const hora1 = (hora.split("T"))
    return(hora1[0]);
}
}

export function max(api){
    if(api && api.daily && api.temperature_2m){
        const num = api.daily.temperature_2m.slice(0,23);
        const max = Math.max(num);
       
        return("datos"+ max)}
}
export function air(aqi,api){
    if (aqi && aqi.hourly && aqi.hourly.european_aqi) {

    const aire = aqi.hourly.european_aqi;
    const hora = api.current_weather.time;
const hora1 = (hora.split("T"))
    return(aire[hora[1]])
    }
}

export function amanAnoch(api){
    if (api && api.daily) {
const amanecer = api.daily.sunrise;
const anochecer = api.daily.sunset;
const string1 = (amanecer[0].split("T"))
const string2 = (anochecer[0].split("T"))
const horas = (string1[1]+"/"+string2[1])
 return(horas);
    }
}


