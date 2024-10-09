import WatchShower from "./Watch";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import dataImgs from "../data/data.js";
import "./DataCard.modules.css";

export default function MainData(props) {
  const ApiKey = "5c1743ecdbd81bf58b166051e223741f";
  const Research = props.handleResearch;
  const [cords, setCords] = useState({});
  const [found, setFound] = useState(false);
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let currentData = {};
      try {
        // to get city cords
        const cordApiAdresss = `http://api.openweathermap.org/geo/1.0/direct?q=${props.cityName},${props.cityState},&appid=${ApiKey}`;
        const cordResult = await fetch(cordApiAdresss);
        const cordData = await cordResult.json();
        setCords(cordData);
        currentData = cordData;

        // to get city weather
        const whatherApiadress = `https://api.openweathermap.org/data/2.5/weather?lat=${currentData[0].lat}&lon=${currentData[0].lon}&lang=pt_br&units=metric&appid=${ApiKey}`;
        const weatherResult = await fetch(whatherApiadress);
        const weatherData = await weatherResult.json();
        setWeather(weatherData);
        setRemoveLoading(true);
        setFound(true);
      } catch (error) {
        console.log(`!! error detected >> ${error} !!`);
        setRemoveLoading(true);
        setError(true);
      }
    };

    getData();
  }, [props.cityName, props.cityState]);

  // to cheack degrees
  function DegreesChecker(degrees) {
    if (degrees < 0) {
      return degrees.toString().slice(0, 2) + "°";
    } else if (degrees < 10) {
      return degrees.toString().slice(0, 1) + "°";
    } else if (degrees >= 10) {
      return degrees.toString().slice(0, 2) + "°";
    } else {
      return "Indefinido";
    }
  }

  if (found === true) {
    return (
      <>
        <div className="card" id="card">
          <div className="whater_another_data">
            <h1 id="degrees">{DegreesChecker(weather.main.temp)}</h1>
            <section id="city_name_flag">
              <h1 id="city_name_resultpage">📌 {props.cityName}</h1>
              <img
                src={`https://flagsapi.com/${cords[0].country}/flat/64.png`}
                id="country_showed_flag"
              />
            </section>

            <div className="whater_another_data_complement">
              <p className="wheater_moisture" id="wheater_moisture">
                &#128167;&ensp; {weather.main.humidity + " %"}
              </p>
              <p className="weather_wind" id="weather_wind">
                &#x1F4A8; {weather.wind.speed + " km/h"}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                className="wheater_img"
                id="wheater_img"
              />
              <p className="wheater_state state2" id="wheater_state">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        </div>
        <div className="second_data">
          <section className="bg_second_data">
            <WatchShower timezone={weather.timezone} />
          </section>
          <section className="bg_second_data">
            <div className="activities">
              <img
                src={dataImgs[0][`${weather.weather[0].icon}`][0]}
                className="activitie_img"
                id="activitie_img"
              />
              <img
                src={dataImgs[0][`${weather.weather[0].icon}`][1]}
                className="activitie_img"
                id="activitie_img"
              />
              <img
                src={dataImgs[0][`${weather.weather[0].icon}`][2]}
                className="activitie_img"
                id="activitie_img"
              />
              <p className="timer_message">Atv. Recomendadas</p>
            </div>
          </section>
        </div>
        <div className="search_city_btn">
          <input
            type="button"
            id="search_city_btn"
            className="btn_to_search"
            value="Buscar Novamente"
            onClick={Research}
          />
        </div>
      </>
    );
  }

  if (found == false) {
    if (removeLoading === false) {
      return <Loading />;
    } else if (error === true) {
      return (
        <>
          <h2>Ops... Os dados não foram carregados, Tente novamente! ):</h2>
          <br></br>
          <br></br>
          <div className="search_city_btn">
            <input
              type="button"
              id="search_city_btn"
              className="btn_to_search"
              value="Buscar Novamente"
              onClick={Research}
            />
          </div>
        </>
      );
    }
  }
}
