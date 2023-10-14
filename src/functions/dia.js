
export function dia(api){
    if (api && api.current_weather && api.current_weather.time) {
    const hora = api.current_weather.time;
const hora1 = (hora.split("T"))
    return(hora1[0]);
}
}

export default dia;