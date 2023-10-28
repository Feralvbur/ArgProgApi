export async function fetchClimaData() {
    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-31.4135&longitude=-64.181&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&timezone=America%2FSao_Paulo');
      if (!response.ok) {
        throw new Error('Error en la solicitud de datos del clima');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function fetchAirQualityData() {
    try {
      const response = await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&hourly=pm10,pm2_5,european_aqi');
      if (!response.ok) {
        throw new Error('Error en la solicitud de datos de calidad del aire');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function fetchTransporte(){
    try {
        const response = await fetch('https://datosabiertos-transporte-apis.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6');
        if (!response.ok) {
          throw new Error('Error en la solicitud de datos de calidad de transporte');
        }
        const data = await response.json();
        return data.slice(0, 50);
      } catch (error) {
        throw error;
      }
  }