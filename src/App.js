import "./App.css";
import { useState, useEffect } from "react";
import useGeoLocation from "./hooks/useGeolocation";
import axios from "axios";

function App() {
  const location = useGeoLocation();
  const lat = JSON.stringify(location.coordinates.lat);
  const lon = JSON.stringify(location.coordinates.lon);
  const [weather, setWeather] = useState();
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=0f86c0f97f4a62686b4859344ba72ac1`).then((res) => {
    console.log(res.data)
      setWeather(res.data.weather[0].main);
    });
  });
  return (
    
    <div className="App">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{location.loaded ? weather : "Location data not available yet."}</p>
          </div>
          <div className="temp">
            <h1>65 F</h1>
          </div>
          <div className="description">
            <p>Clouds</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
