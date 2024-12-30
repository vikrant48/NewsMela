import React, { useState } from 'react';
import '../assets/Weather.css'

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isWeatherCardVisible, setIsWeatherCardVisible] = useState(false);


  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error(`Invalid city name. Please try again.`);
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null)
      setIsWeatherCardVisible(true); // Show the weather card
    } catch (error) {
      setError(error.message)
      setWeatherData(null)
      // console.error("Error fetching weather data:", error);
      // setIsWeatherCardVisible(false);

      setTimeout(() => {
        setError(null)
        setCity('')
      }, 3000);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="weather-container">
      <button onClick={() => setIsWeatherCardVisible(true)} className="check-weather-btn">
        Check Weather Update
      </button>

      {isWeatherCardVisible && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setIsWeatherCardVisible(false)} className="close-btn">✖</button>
            <h2 className="modal-heading" >Check Weather</h2>
            <div className="modal-page">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleCityChange}
                />
                <button onClick={getWeather}>Get Weather</button>
              </div>

              {weatherData ? (
                <div className="weather-card">
                  <h3>{weatherData.name}</h3>
                  <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
                  <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
                  <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                  <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                  <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
                  <p><strong>Sunrise:</strong> {convertTime(weatherData.sys.sunrise)}</p>
                  <p><strong>Sunset:</strong> {convertTime(weatherData.sys.sunset)}</p>
                </div>
              ):(
                <p style={{ color: 'red' }}>{error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

