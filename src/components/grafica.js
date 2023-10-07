import { Line } from "react-chartjs-2"
import data from "../api.json"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var temperatura = [data.hourly.temperature_2m[0],data.hourly.temperature_2m[8],data.hourly.temperature_2m[13],data.hourly.temperature_2m[15],
data.hourly.temperature_2m[18],data.hourly.temperature_2m[20],data.hourly.temperature_2m[23]
]
var horas = [ 
 "00:00",
 "08:00",
 "13:00",
 "15:00",
 "18:00",
 "20:00",
 "23:00"];
var midata = {
    labels: horas,
    datasets:[ //Cada una de las lineas del gráfico
        {
            label: 'Temperaturas',
            data: temperatura,
            tension: 0.5,
            fill : true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
      
        },
        
    ],
};

var misoptions ={};

export default function LinesChart() {
    return <Line data={midata} options={misoptions}/>
}