function air(api){
     if (api && api.hourly && api.hourly.european_aqi) {
     const aire = api.hourly.european_aqi;

     return(aire[21])
     }
}

export default air;