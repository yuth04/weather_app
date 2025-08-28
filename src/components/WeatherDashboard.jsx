import React, { useEffect, useState } from "react";
import { Sun, Cloud, CloudRain, CloudLightning, Wind } from "lucide-react";

const WeatherDashboard = () => {
  const [city, setCity] = useState("Phnom Penh");       // Current city used for fetch
  const [searchInput, setSearchInput] = useState(city); // Input field state
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // Fetch current weather
  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }
      setWeather(data);
      fetchForecast(data.coord.lat, data.coord.lon);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  // Fetch hourly + daily forecast
  const fetchForecast = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${apiKey}`
      );
      const data = await res.json();
      setHourly(data.hourly.slice(0, 12)); // next 12 hours
      setDaily(data.daily.slice(0, 7));    // 7-day forecast
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  if (!weather) return <p className="text-white p-6">Loading...</p>;

  // Weather icons
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <Sun size={80} className="text-yellow-400" />;
      case "Clouds":
        return <Cloud size={80} />;
      case "Rain":
        return <CloudRain size={80} />;
      case "Thunderstorm":
        return <CloudLightning size={80} className="text-yellow-400" />;
      default:
        return <Sun size={80} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-6">
      {/* Sidebar */}
      <aside className="flex md:flex-col justify-center md:justify-start md:w-20 items-center space-x-6 md:space-x-0 md:space-y-6 py-4 md:py-8 border-b md:border-b-0 md:border-r border-gray-700">
        <div className="bg-gray-700 text-white p-3 rounded-xl">
          <Wind size={28} />
        </div>
        <nav className="flex md:flex-col space-x-6 md:space-x-0 md:space-y-6 text-gray-400">
          <button className="hover:text-white">🌤️</button>
          <button className="hover:text-white">🏙️</button>
          <button className="hover:text-white">🗺️</button>
          <button className="hover:text-white">⚙️</button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-2 md:px-8 mt-4 md:mt-0">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search for cities"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchInput.trim() !== "") {
                setCity(searchInput.trim());
              }
            }}
            className="flex-1 text-white rounded-lg bg-gray-700 p-3 text-sm placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={() => {
              if (searchInput.trim() !== "") setCity(searchInput.trim());
            }}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            Search
          </button>
        </div>

        {/* Current weather */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl text-white font-bold">{weather.name}</h1>
            <p className="text-gray-400">
              Chance of rain: {weather?.rain?.["1h"] ? weather.rain["1h"] : 0}%
            </p>
            <h2 className="text-6xl text-white font-extrabold mt-4">
              {Math.round(weather.main.temp)}°
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            {getWeatherIcon(weather.weather[0].main)}
          </div>
        </div>

        {/* Hourly forecast */}
        <section className="mt-8">
          <h3 className="mb-4 text-gray-400 font-semibold">TODAY’S FORECAST</h3>
          <div className="flex overflow-x-auto gap-4 bg-gray-800 p-4 rounded-2xl">
            {hourly.map((h, i) => (
              <div key={i} className="flex flex-col items-center min-w-[60px]">
                <p className="text-sm text-gray-400">
                  {new Date(h.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="my-2">{getWeatherIcon(h.weather[0].main)}</div>
                <p className="text-lg font-semibold">{Math.round(h.temp)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Air conditions */}
        <section className="mt-8">
          <h3 className="mb-4 text-gray-400 font-semibold">AIR CONDITIONS</h3>
          <div className="bg-gray-800 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-400">Real Feel</p>
              <h4 className="text-xl font-bold">{Math.round(weather.main.feels_like)}°</h4>
            </div>
            <div>
              <p className="text-gray-400">Wind</p>
              <h4 className="text-xl font-bold">{weather.wind.speed} m/s</h4>
            </div>
            <div>
              <p className="text-gray-400">Humidity</p>
              <h4 className="text-xl font-bold">{weather.main.humidity}%</h4>
            </div>
            <div>
              <p className="text-gray-400">UV Index</p>
              <h4 className="text-xl font-bold">{hourly[0]?.uvi || "-"}</h4>
            </div>
          </div>
        </section>
      </main>

      {/* 7-day forecast */}
      <aside className="w-full md:w-64 mt-6 md:mt-0 md:ml-8">
        <h3 className="mb-4 text-gray-400 font-semibold">7-DAY FORECAST</h3>
        <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
          {daily.map((d, i) => (
            <div key={i} className="flex justify-between items-center">
              <span>{new Date(d.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</span>
              <span>{getWeatherIcon(d.weather[0].main)}</span>
              <span>{Math.round(d.temp.max)}/{Math.round(d.temp.min)}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default WeatherDashboard;
