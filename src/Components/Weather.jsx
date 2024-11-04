
import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null)
  

  const API_KEY = "c7320cd2c258903378f41502ecfdc6bd";

  const getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error(`Invalid city name. Please try again.`);
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null)
    } catch (error) {
      setError(error.message)
      setWeatherData(null)
      // console.error("Error fetching weather data:", error);

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
      <h2>Check Weather</h2>
      <div className="input-group">
        <input type="text" placeholder="Enter city name" value={city} onChange={handleCityChange} />
        <button onClick={getWeather}>Get Weather</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {weatherData && (
        <div className="weather-card">
          <h3>{weatherData.name}</h3>
          <p><i className="fas fa-thermometer-half"></i> <strong>Temperature:</strong> {weatherData.main.temp} °C</p>
          <p><i className="fas fa-cloud-sun"></i> <strong>Weather:</strong> {weatherData.weather[0].description}</p>
          <p><i className="fas fa-tint"></i> <strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><i className="fas fa-wind"></i> <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
          <p><i className="fas fa-tachometer-alt"></i> <strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
          <p><i className="fas fa-sun"></i> <strong>Sunrise:</strong> {convertTime(weatherData.sys.sunrise)}</p>
          <p><i className="fas fa-moon"></i> <strong>Sunset:</strong> {convertTime(weatherData.sys.sunset)}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

