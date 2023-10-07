import data from "../api.json"
const hora = data.current_weather.time;
const dia1 = (hora.split("T"))

function dia(){
    return(dia1[0]);
}

export default dia();