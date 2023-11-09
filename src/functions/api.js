import localidades from '../components/localidades.json';
export async function fetchClimaData(valorSeleccionado) {

  try {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${localidades[valorSeleccionado].latitude}&longitude=${localidades[valorSeleccionado].longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&timezone=America%2FSao_Paulo`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error en la solicitud de datos del clima');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}


export async function fetchAirQualityData(valorSeleccionado) {
  try {
    const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${localidades[valorSeleccionado].latitude}&longitude=${localidades[valorSeleccionado].longitude}&hourly=pm10,pm2_5,european_aqi`);
    if (!response.ok) {
      throw new Error('Error en la solicitud de datos de calidad del aire');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchTransporte() {
  try {
    const response = await fetch('https://datosabiertos-transporte-apis.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6');
    if (!response.ok) {
      throw new Error('Error en la solicitud de datos de transporte');
    }
    const data = await response.json();
    return data.slice(0, 50);
  } catch (error) {
    throw error;
  }
}