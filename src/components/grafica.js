import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import localidades from '../components/localidades.json';
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

export default function LinesChart(val) {
  const ciudad = val.val;
  const [temperatura, setTemperatura] = useState([]);
  const [horas, setHoras] = useState([
    '00:00',
    '08:00',
    '13:00',
    '15:00',
    '18:00',
    '20:00',
    '23:00',
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${localidades[ciudad].latitude}&longitude=${localidades[ciudad].longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&timezone=America%2FSao_Paulo`
        );
        if (!response.ok) {
          throw new Error('Error en la solicitud de datos del clima');
        }
        const data = await response.json();
        if (data.hourly.temperature_2m) {
          setTemperatura([
            data.hourly.temperature_2m[0],
            data.hourly.temperature_2m[8],
            data.hourly.temperature_2m[13],
            data.hourly.temperature_2m[15],
            data.hourly.temperature_2m[18],
            data.hourly.temperature_2m[20],
            data.hourly.temperature_2m[23],
          ]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [val]);

  // Comprobar si los datos se han cargado antes de renderizar el gráfico
  if (temperatura.length === 0) {
    return <div>Cargando datos...</div>;
  }

  const midata = {
    labels: horas,
    datasets: [
      {
        label: 'Temperaturas',
        data: temperatura,
        tension: 0.5,
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 5,
        pointBorderColor: 'rgba(255, 99, 132)',
        pointBackgroundColor: 'rgba(255, 99, 132)',
      },
    ],
  };

  return <Line data={midata} options={{}} />;
}
