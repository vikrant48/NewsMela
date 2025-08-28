import { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isWeatherCardVisible, setIsWeatherCardVisible] = useState(false);



  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


  const getWeather = async () => {
    if (!city.trim()) return;
    
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error(`Invalid city name. Please try again.`);
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
      

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    if (error) setError(null);
  };

  const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <button 
        onClick={() => setIsWeatherCardVisible(true)} 
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Check Weather Update
      </button>

      {isWeatherCardVisible && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Check Weather</h2>
            <div className="space-y-4 mb-6">
              <div className="flex gap-2">

                <input
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleCityChange}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                />
                <button 
                  onClick={getWeather}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Get Weather
                </button>
              </div>
              {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {weatherData && (
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{weatherData.name}</h3>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {Math.round(weatherData.main.temp)}°C
                    </div>
                  </div>
                  <div className="w-16 h-16">
                    <img 
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt={weatherData.weather[0].description}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Weather</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {weatherData.weather[0].description}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Humidity</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {weatherData.main.humidity}%
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {weatherData.wind.speed} m/s
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pressure</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {weatherData.main.pressure} hPa
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Sunrise</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {convertTime(weatherData.sys.sunrise)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Sunset</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {convertTime(weatherData.sys.sunset)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button 
              onClick={() => setIsWeatherCardVisible(false)} 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            >
              ✖
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

