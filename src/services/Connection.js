// import fetch from "node-fetch";

export default class Connection {
  api_base = "https://api.weatherbit.io/v2.0/";
  api_key = "key=6ca7dcac211346a1ae03e110c4c973c1";
  log = console.log;

  data = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`could not fetch ${url} status: ${res.status}`);
    }
    return await res.json();
  };

  dataInfo = async (cityName = "baku") => {
    // this.ipLocation().then((item) => item);
    const city = await this.data(
      `${this.api_base}current?city=${cityName}&${this.api_key}&lang=ru`
    ).then((data) => data.data);
    const mapped = city[0];
    return this.transformData(mapped);
  };

  transformData = (data) => {
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
}
