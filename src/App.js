import {useEffect, useState} from "react";
import Connection from "./services/Connection";
import ipLocation from "./services/ipLocation";
import "./styles.scss";

const App = () => {
  let [value, setValue] = useState("");
  let [weather, setWeather] = useState({});
  let [data, setData] = useState({});

  const conn = Connection();
  const ip = ipLocation();
  const icons = "https://www.weatherbit.io/static/img/icons/";

  const dataLoaded = (info) => {
    setData((data = info));
    setWeather(info.weather);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    conn(value).then((item) => dataLoaded(item));
  };

  useEffect(() => {
    ip.then((city) => {
      conn(city).then((item) => dataLoaded(item));
    });
  }, []);

  return (
    <>
      <div>
        <div id="desc">
          <img src={`${icons}${weather.icon}.png`} alt={weather.desc} />
          <h1>{data.temp}°</h1>
          <h1>{weather.description}</h1>
        </div>
        <h1>
          {data.city} {data.country}
        </h1>
        <h1>Feels Like: {data.feelsLikeTemp}°</h1>
        <h1>Sunrise: {data.sunrise} GMT</h1>
        <h1>Sunset: {data.sunset} GMT</h1>
        <h1>Snow: {data.snow}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue((value = e.target.value))}
            placeholder="Input city name"
            required
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default App;
