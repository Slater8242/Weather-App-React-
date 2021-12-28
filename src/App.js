import {Component} from "react";
import Connection from "./services/Connection";
import ipLocation from "./services/ipLocation";
import "./styles.scss";

// city.then((item) => item.map((item) => log(item)));

export default class App extends Component {
  state = {
    city: null,
    country: null,
    temp: null,
    sunset: null,
    sunrise: null,
    snow: null,
    weather: {
      icon: null,
      code: null,
      desc: null
    },
    value: ""
  };
  log = console.log;

  conn = new Connection();
  ip = new ipLocation();

  icons = "https://www.weatherbit.io/static/img/icons/";

  componentDidMount() {
    // this.conn.dataInfo(this.state.value).then((item) => this.dataLoaded(item));
    // this.updateInfo();
    // this.test = this.onDataLoaded("baku");
    // this.dataLoaded();
    this.ip.ipLocation().then((city) => {
      this.conn.dataInfo(city).then((item) => this.dataLoaded(item));
    });
  }

  updateInfo = () => {
    const {value} = this.props;
    this.log(this.props);
    if (!value) {
      return;
    }
  };

  dataLoaded = (info) => {
    this.setState({
      city: info.city,
      country: info.country,
      temp: info.temp,
      feelsLikeTemp: info.feelsLikeTemp,
      sunset: info.sunset,
      sunrise: info.sunrise,
      snow: info.snow,
      weather: {
        icon: info.weather.icon,
        code: info.weather.code,
        desc: info.weather.description
      }
    });
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  handleSubmit = (event) => {
    this.conn.dataInfo(this.state.value).then((item) => this.dataLoaded(item));
    event.preventDefault();
  };

  render() {
    const {
      city,
      country,
      temp,
      feelsLikeTemp,
      sunset,
      sunrise,
      snow,
      weather,
      value
    } = this.state;
    return (
      <>
        <div>
          <div id="desc">
            <img src={`${this.icons}${weather.icon}.png`} alt={weather.desc} />
            <h1>{temp}°</h1>
            <h1>{weather.desc}</h1>
          </div>
          <h1>
            {city} {country}
          </h1>
          <h1>Feels Like: {feelsLikeTemp}°</h1>
          <h1>Sunrise: {sunrise} GMT</h1>
          <h1>Sunset: {sunset} GMT</h1>
          <h1>Snow: {snow}</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={value}
              onChange={this.handleChange}
              placeholder="Input city name"
              required
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </>
    );
  }
}
