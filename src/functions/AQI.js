import data from "../api.json"
const aire = data.hourly.european_aqi;

function air(){
     return(aire[21])
}

export default air();