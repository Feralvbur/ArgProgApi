import Clima from './functions/clima'
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import Transporte from './functions/transporte';
import 'leaflet/dist/leaflet.css';
import './App.css'
import { fetchClimaData, fetchAirQualityData, fetchTransporte } from './functions/api';

function App() {
   const [api, setApi] = useState(null);
   const [aqi, setAqi] = useState(null);
   const [transporte, setTransporte] = useState(null);
   const [loading, setLoading] = useState(true);
   const [mapLoading, setMapLoading] = useState(true);
   const [error, setError] = useState(null);
   const [lineas, setLineas] = useState(null);
   const customIcon = L.icon({
      iconUrl: 'https://cdn.icon-icons.com/icons2/3181/PNG/96/bus_transportation_travel_transport_icon_194010.png', 
      iconSize: [25, 25],

   });
   const seleccion = (linea) => {
      setLineas(transporte.filter(item => item.route_short_name === linea));
      
   }
  

   useEffect(() => {
      fetchClimaData()
         .then((data) => {
            setApi(data);
            setLoading(false);
         })
         .catch((err) => {
            setError(err.message);
            setApi(null);
         });
   }, []);

   useEffect(() => {
      fetchAirQualityData()
         .then((data) => {
            setAqi(data);
            setLoading(false);
         })
         .catch((err) => {
            setError(err.message);
            setAqi(null);
         });
   }, []);

   useEffect(() => {
      const interval = setInterval(() => {
         fetchTransporte()
            .then((data) => {
               setTransporte(data);
               setMapLoading(false);
               if(lineas !== null){
                  setLineas(data.filter(item => item.route_short_name === lineas))
                
               }
               
            })
            .catch((err) => {
               setError(err.message);
               setTransporte(null);
            });
      }, 31000);
      return () => clearInterval(interval);
   }, [])


   


   return (
      
      <>
    
         {loading && <div className="Load">
            <img className="loadImg" src="https://media3.giphy.com/media/XunOdEWPoTCxraOxzN/200.webp?cid=ecf05e47wzsxsoiylp8sw6g6s2pl1oyvwuvpcqye3o3nqf7g&ep=v1_gifs_search&rid=200.webp&ct=g" alt=" "/><br />Cargando..</div>}
         {!loading && api && (
            <div className="pag">
            <Clima api={api} aqi={aqi} />
               <div className="transp">

                  {mapLoading && <div className="Load">
                     <img className="loadImg" src="https://media4.giphy.com/media/3y0oCOkdKKRi0/200.webp?cid=ecf05e47vphw2gqmji7hbz4z7hkooxpxzrsrthu8ig7xlxrr&ep=v1_gifs_search&rid=200.webp&ct=g" alt=""/><br />Cargando..</div>}
                  {transporte ? (
                    <Transporte transporte={transporte} lineas={lineas} customIcon={customIcon} seleccion={seleccion} />
                  ) : null}
               </div>
            </div>

         )}
      </>)

}



<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js" />
export default App;


