import { useState, useEffect } from "react";
import Showtime from "./Showtime";
import useGeoLocation from "../hooks/useGeolocation";
import axios from "axios";
import Moment from "react-moment";

export default function Item() {
  const location = useGeoLocation();
  const lat = JSON.stringify(location.coordinates.lat);
  const lon = JSON.stringify(location.coordinates.lon);
  const [name, setName] = useState([]);
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);
  const [icon, setIcon] = useState([]);
  const today = new Date();
  let bg = "";
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=0f86c0f97f4a62686b4859344ba72ac1`).then((res) => {
      setName(res.data.name);
      setWeather(res.data.weather[0].main);
      setTemp(res.data.main.temp);
      const weatherID = res.data.weather[0].id;
      function backGround() {
        if (weatherID < 250) {
          return (bg = "url('../images/thunder.jpg')"), setIcon("thunder.png");
        } else if (weatherID < 350) {
          return (bg = "url('../images/drizzle.jpg')"), (icon = "drizzle.png"), setIcon("thunder.png");
        } else if (weatherID < 550) {
          return (bg = "url('../images/rain.jpg')"), setIcon("rain.png");
        } else if (weatherID < 650) {
          return (bg = "url('../images/snow.jpg')"), setIcon("snow.png");
        } else if (weatherID < 790) {
          return (bg = "url('../images/atmosphere.jpg')"), setIcon("atmosphere.png");
        } else if (weatherID === 800) {
          return (bg = "url('../images/clear.jpg')"), setIcon("clear.png");
        } else {
          return (bg = "url('../images/clouds.jpg')"), setIcon("clouds.png");
        }
      }
      backGround();
      document.getElementById("1").style.backgroundImage = bg;
    });
  });
  return (
    <div className="container" id="1">
      <div className="top">
        <div className="location">
          <p>
            <span className="material-icons">place</span>
            {name}
          </p>
        </div>
        <div className="date">
          <Moment format="MMM DD, ddd">{today}</Moment>
          <Showtime />
        </div>
        <div className="icon">
          <img src={`../images/icons/${icon}`} alt="" />
        </div>
        <div className="weather">
          <p>{weather}</p>
        </div>
        <div className="temp">
          <h1>{Math.round(temp - 273.15)}</h1>
        </div>
      </div>
    </div>
  );
}
