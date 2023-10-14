function amanAnoch(api){
    if (api && api.daily) {
const amanecer = api.daily.sunrise;
const anochecer = api.daily.sunset;
const string1 = (amanecer[0].split("T"))
const string2 = (anochecer[0].split("T"))
const horas = (string1[1]+"/"+string2[1])
 return(horas);
    }
}



export default amanAnoch;