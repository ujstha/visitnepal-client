import React, { Component } from "react";
import { GetWeather } from "../services";
import { Paper } from "@material-ui/core";
import moment from "moment";
import Slide from "react-reveal/Slide";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      forecast: null,
      degF: false
    };
  }
  componentDidMount() {
    GetWeather(this.props.lat, this.props.lon, "weather").then(res => {
      this.setState({
        weather: res.data
      });
    });
    GetWeather(this.props.lat, this.props.lon, "forecast").then(res => {
      this.setState({
        forecast: res.data
      });
    });
  }
  render() {
    const { weather, forecast, degF } = this.state;
    return (
      weather && (
        <Paper elevation={1} className="p-2 px-4">
          <h3 className="mt-2">Weather Forecast</h3>
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-5 mt-2 d-flex justify-content-center card">
              <div className="clearfix">
                <Slide bottom cascade>
                  <div className="float-left">
                    <span className="d-block" style={{ fontSize: 20 }}>
                      {weather.name}, {weather.sys.country}
                    </span>
                    <span className="d-block" style={{ fontSize: 16 }}>
                      {moment
                        .unix(weather.dt)
                        .utcOffset(weather.timezone / 3600)
                        .format("dddd HH:mm")}
                    </span>
                    <span className="d-block" style={{ fontSize: 16 }}>
                      {weather.weather[0].main}{" "}
                      <small>({weather.weather[0].description})</small>
                    </span>
                  </div>
                </Slide>
                <Slide left cascade>
                  <div className="float-right">
                    <span className="d-block">
                      Feels Like &ensp;
                      {degF ? (
                        <b>
                          {((weather.main.feels_like * 9) / 5 - 459.67).toFixed(
                            0
                          )}{" "}
                          &deg;F
                        </b>
                      ) : (
                        <b>
                          {(weather.main.feels_like - 273.15).toFixed(0)} &deg;C
                        </b>
                      )}
                    </span>
                    <span className="d-block">
                      Wind &ensp;
                      <b>{weather.wind.speed} m/s</b>
                    </span>
                    <span className="d-block">
                      Humidity &ensp;
                      <b>{weather.main.humidity} %</b>
                    </span>
                  </div>
                </Slide>
              </div>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                />
                <span style={{ fontSize: 50 }}>
                  {degF
                    ? ((weather.main.temp * 9) / 5 - 459.67).toFixed(0)
                    : (weather.main.temp - 273.15).toFixed(0)}{" "}
                  <sup
                    style={{ fontSize: 20 }}
                    onClick={() =>
                      this.setState({
                        degF: false
                      })
                    }
                    className={`${!degF &&
                      "text-dark font-weight-bolder"} deg-cursor`}
                  >
                    &deg;C
                  </sup>
                  <sup style={{ fontSize: 20 }}> | </sup>
                  <sup
                    style={{ fontSize: 20 }}
                    onClick={() =>
                      this.setState({
                        degF: true
                      })
                    }
                    className={`${degF &&
                      "text-dark font-weight-bold"} deg-cursor`}
                  >
                    &deg;F
                  </sup>
                </span>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-7 d-flex justify-content-center align-items-center overflow-auto mt-2">
              <div className="forecast">
                {forecast &&
                  forecast.list
                    .filter((dayList, index) => (index + 1) % 8 === 0)
                    .map((filteredForecast, index) => (
                      <Slide top cascade key={index}>
                        <div className="filtered-forecast p-3">
                          <span className="d-block" style={{ fontSize: 16 }}>
                            {moment(filteredForecast.dt_txt).format("ddd DD")}
                          </span>
                          <img
                            src={`http://openweathermap.org/img/wn/${filteredForecast.weather[0].icon}@2x.png`}
                            alt="weather-icon"
                          />
                          <span className="d-block text-capitalize">
                            {filteredForecast.weather[0].main}
                          </span>

                          <span className="d-block" style={{ fontSize: 22 }}>
                            {degF ? (
                              <b>
                                {(
                                  (filteredForecast.main.temp * 9) / 5 -
                                  459.67
                                ).toFixed(0)}{" "}
                                &deg;F
                              </b>
                            ) : (
                              <b>
                                {(filteredForecast.main.temp - 273.15).toFixed(
                                  0
                                )}{" "}
                                &deg;C
                              </b>
                            )}
                          </span>
                        </div>
                      </Slide>
                    ))}
              </div>
            </div>
          </div>
        </Paper>
      )
    );
  }
}
