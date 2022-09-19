import axios from "axios";

const URL = 'https://api.openweathermap.org/data/2.5/weather';

const API_key = '66917f6fb41878f2ae32d4a6a223e4e8';

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_key,
      lang: 'ru'
    }
  });

  return data
}