const Connection = () => {
  const api_base = "https://api.weatherbit.io/v2.0/";
  const api_key = "key=6ca7dcac211346a1ae03e110c4c973c1";
  const api_key2 = "key=bb240c94921f437ab1bf88e3fde4184c";

  const data = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`could not fetch ${url} status: ${res.status}`);
    }
    return await res.json();
  };

  const dataInfo = async (cityName) => {
    const city = await data(
      `${api_base}current?city=${cityName}&${api_key}&lang=ru`
    ).then((data) => data.data);
    const mapped = city[0];
    return transformData(mapped);
  };

  const transformData = (data) => {
    return {
      city: data.city_name,
      country: data.country_code,
      temp: data.temp,
      feelsLikeTemp: data.app_temp,
      sunset: data.sunset,
      sunrise: data.sunrise,
      snow: data.snow,
      weather: {
        icon: data.weather.icon,
        code: data.weather.code,
        description: data.weather.description
      }
    };
  };
  return dataInfo;
};
export default Connection;
