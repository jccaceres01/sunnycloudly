import { config }  from '../config';

export const getWeather = async (coords) => {
  try {
    const res = await fetch(`${config.baseUrl}/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${config.apiKey}`);
    const dt = await res.json();
    return dt;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getForecast = async (coords) => {
  try {
    const res = await fetch(`${config.baseUrl}/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${config.apiKey}`);
    const dt = await res.json();
    return dt;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getGeoPosition = async (criteria) => {
  try {
    const res = await fetch(`${config.baseUrl}/geo/1.0/direct?q=${criteria}&limit=5&appid=${config.apiKey}`);
    const dt = await res.json();

    if (res.status === 200) return dt;
    return [];
  } catch (error) {
    console.log(error);
  }
}
