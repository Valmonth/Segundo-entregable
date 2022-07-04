import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Background from "./Images/calido.jpg";

function App() {
  const [climate, setClimate] = useState({});
  const [convertC, setConvertC] = useState();
  const [convertF, setConvertF] = useState();
  const [state, setState] = useState(true);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f1a46f08b5a6302fbdd5f3c0b27bb56a`)
        .then((res) => {
          setClimate(res.data);
          setConvertC(res.data.main.temp);
          setConvertF(res.data.main.temp);
        })
        .catch((error) => console.log(error));
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const tempC = Math.floor(convertC - 273, 15);
  const tempF = Math.floor(((convertF - 273.15) * 9) / 5 + 32);

  const convertTemp = () => {
    setState(!state)
  };

  return (
    <div className="App">
      <div className="app-background">
        <img src={Background} alt="" className="back" />
      </div>
      <div className="app-components">
        <div className="climate">
          <div className="climate-title">
            <h1 className="text-align-center">Wheather App</h1>
          </div>
          <h2 className="margin-top2 bold text-align-center">
            {climate.name} {climate.sys?.country}
          </h2>
          <div className="climate-flex margin-top2">
            <div className="climate-img">
              <img
                src={`https://openweathermap.org/img/wn/${climate.weather?.[0].icon}@2x.png`}
                alt=""
                className="img-cloud"
              />
            </div>
            <div className="climate-description">
              <p>
                <i className="fa-solid fa-wind"></i>
                <span className="margin-left">
                  Wind speed: {`${climate.wind?.speed}m/s`}
                </span>
              </p>
              <p className="margin-top1">
                <i className="fa-solid fa-cloud"></i>
                <span className="margin-left">
                  Clouds: {`${climate.clouds?.all}%`}
                </span>
              </p>
              <p className="margin-top1">
                <i className="fa-solid fa-temperature-quarter"></i>
                <span className="margin-left">
                  Pressure: {`${climate.main?.pressure} mb`}
                </span>
              </p>
            </div>
          </div>
          <div className="climate-temp">
            <h2 className="text-align-center">{state ? tempC : tempF}°</h2>
          </div>
          <div className="btn-convert">
            <button className="bold margin-top1" onClick={convertTemp}>
              {state ? "Temp °C" : "Temp °F"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
