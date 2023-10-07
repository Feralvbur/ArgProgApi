import data from "../api.json"
const hora = data.current_weather.time;
const hora1 = (hora.split("T"))
function hour(){
 return(hora1[1]);

}

export function dia(){
    return(hora1[0]);
}

export default hour();