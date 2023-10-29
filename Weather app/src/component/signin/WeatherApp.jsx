import React, { useEffect, useState } from "react";
import LZString from "lz-string";
import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "./firebase";

import sunny from "/images/sunny.webp";
import partlySunny from "/images/partly-sunny.webp";
import cloudy from "/images/cloudy.webp";
import drizzle from "/images/drizzling.webp";
import rainy from "/images/rain.webp";
import snowy from "/images/snowy.webp";
import misty from "/images/fog.webp";
import broken_cloud from "/images/scattered-clouds.webp";
import thunder from "/images/thunderstorm.webp";

import Clock from "../clock";
import ErrorMsg from "../ErrorMsg";

const WeatherApp = () => {
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "c8494d91c3a1d7175e6add090603efd5";

  const search = async (place) => {
    if (!place) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError(null); // Clear any previous error
      } else {
        setError("City not found. Please enter a valid city name."); // Set error message
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("An error occurred while fetching data."); // Set a generic error message
    }
  };

  const handleSearch = () => {
    const place = document.getElementById("place").value;
    search(place);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    // Initialize with a default location (e.g., London)
    search("London");
  }, []);

  useEffect(() => {
    if (weatherData) {
      if (
        weatherData.weather[0].icon === "01d" ||
        weatherData.weather[0].icon === "01n"
      ) {
        setWeatherIcon(sunny);
      } else if (
        weatherData.weather[0].icon === "02d" ||
        weatherData.weather[0].icon === "02n"
      ) {
        setWeatherIcon(partlySunny);
      } else if (
        weatherData.weather[0].icon === "03d" ||
        weatherData.weather[0].icon === "03n"
      ) {
        setWeatherIcon(broken_cloud);
      } else if (
        weatherData.weather[0].icon === "04d" ||
        weatherData.weather[0].icon === "04n"
      ) {
        setWeatherIcon(cloudy);
      } else if (
        weatherData.weather[0].icon === "09d" ||
        weatherData.weather[0].icon === "09n"
      ) {
        setWeatherIcon(drizzle);
      } else if (
        weatherData.weather[0].icon === "10d" ||
        weatherData.weather[0].icon === "10n"
      ) {
        setWeatherIcon(rainy);
      } else if (
        weatherData.weather[0].icon === "11d" ||
        weatherData.weather[0].icon === "11n"
      ) {
        setWeatherIcon(thunder);
      } else if (
        weatherData.weather[0].icon === "13d" ||
        weatherData.weather[0].icon === "13n"
      ) {
        setWeatherIcon(snowy);
      } else if (
        weatherData.weather[0].icon === "50d" ||
        weatherData.weather[0].icon === "50n"
      ) {
        setWeatherIcon(misty);
      }
    }
  }, [weatherData]);

  const compressText = (text) => {
    return LZString.compress(text);
  };

  // const navigate = useNavigate(); 

  // const handleLogout = async () => {
  //   try {
  //     await signOut();
  //     navigate('/signin');
  //   } catch (error) {
  //     console.error('Sign-out error:', error);
  //   }
  // };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          name="place"
          id="place"
          placeholder="Search for a city"
          onKeyPress={handleEnterKey}
        />
        <button
          id="search"
          onClick={() => {
            const inputText = document.getElementById("place").value;
            const compressedText = compressText(inputText);
            console.log("Compressed Text:", compressedText);
            handleSearch()
          }}
        >
          <img src="/images/search-2.webp" alt="search icon" />
        </button>
        {error && <ErrorMsg message={error} />}{" "}
        {/* Display the error message */}
      </div>

      {weatherData && (
        <div className="forecast">
          <div className="forecast-top">
            <h1 className="location">
              <span>
                <img src="/images/location.webp" alt="location pin" />
              </span>
              {weatherData.name}
            </h1>
            <Clock />
          </div>

          <img
            // src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            src={weatherIcon}
            alt="weather icon"
            className="cloud"
          />
          <h2 className="temperature">
            {Math.floor(weatherData.main.temp)}&#176;
          </h2>
          <h3 className="description">{weatherData.weather[0].description}</h3>
        </div>
      )}
      <div className="details">
        {weatherData && (
          <>
            <div className="humidity">
              <img src="/images/humidity.webp" alt="humidity icon" />
              <div>
                <span>{Math.floor(weatherData.main.humidity)}%</span>
                <span>Humidity</span>
              </div>
            </div>

            <div className="wind-speed">
              <img src="/images/wind.webp" alt="wind-speed icon" />
              <div>
                <span>{weatherData.wind.speed} km/h</span>
                <span>Wind Speed</span>
              </div>
            </div>

            <div className="pressure">
              <img src="/images/pressure-meter.webp" alt="pressure-meter" />
              <div>
                <span>{Math.floor(weatherData.main.pressure)}hpa</span>
                <span>Pressure</span>
              </div>
            </div>

            <div className="latitude">
              <img src="/images/latitude.webp" alt="latitude" />
              <div>
                <span>
                  Lat. &nbsp;
                  {weatherData.coord.lat}&#176;
                </span>
                <span>
                  Long.&nbsp;
                  {weatherData.coord.lon}&#176;
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* <button className="signout" onClick={handleLogout}>
        Sign Out
      </button> */}
    </div>
  );
};

export default WeatherApp;
