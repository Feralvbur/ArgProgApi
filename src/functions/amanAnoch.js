import data from "../api.json"
const amanecer = data.daily.sunrise;
const anochecer = data.daily.sunset;


function amanAnoch(){
const string1 = (amanecer[0].split("T"))
const string2 = (anochecer[0].split("T"))
const horas = (string1[1]+"/"+string2[1])
 return(horas);

}


export default amanAnoch();