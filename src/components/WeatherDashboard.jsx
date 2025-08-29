import React, { useEffect, useState, useCallback } from "react";
import { Sun, Cloud, CloudRain, LoaderCircle, CloudLightning, Wind, CloudSun, Building, Map, Settings } from "lucide-react";
// Map weather types to icons
const getWeatherIcon = (main) => {
  switch (main) {
    case "Clear":
      return <Sun size={60} className="text-yellow-400" />;
    case "Clouds":
      return <Cloud size={60} className="text-gray-300" />;
    case "Rain":
      return <CloudRain size={60} className="text-blue-400" />;
    case "Thunderstorm":
      return <CloudLightning size={60} className="text-yellow-400" />;
    default:
      return <Sun size={60} className="text-white" />;
  }
};

const WeatherDashboard = () => {
  const [city, setCity] = useState("Phnom Penh");
  const [searchInput, setSearchInput] = useState(city);
  const [weatherData, setWeatherData] = useState({ daily: [], hourly: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // Updated to fetch both daily forecast and UV index
  const fetchDailyAndUv = useCallback(async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code,uv_index_max&hourly=uv_index&timezone=auto&forecast_days=7`
      );
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.reason || "Failed to fetch 7-day forecast.");
      }
      return data;
    } catch (err) {
      console.error("Error fetching 7-day forecast:", err);
      setError("Failed to load 7-day forecast data. Please try again later.");
      return null;
    }
  }, []);

  const fetchForecast = useCallback(
    async (cityName, currentWeather) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch hourly forecast.");

        const now = Date.now();
        const hourlyToday = [
          {
            dt: Math.floor(now / 1000),
            main: { temp: currentWeather.main.temp },
            weather: currentWeather.weather,
          },
          ...data.list.filter((item) => {
            const itemTime = item.dt * 1000;
            const isToday =
              new Date(itemTime).toLocaleDateString() ===
              new Date(now).toLocaleDateString();
            return isToday && itemTime > now;
          }),
        ];

        // Fetch both daily and UV data
        const dailyAndUvData = await fetchDailyAndUv(
          currentWeather.coord.lat,
          currentWeather.coord.lon
        );

        // Get the current UV Index from the hourly data
        const currentUvIndex = dailyAndUvData?.hourly?.uv_index?.[0] || "N/A";

        setWeatherData({
          ...currentWeather,
          daily: dailyAndUvData?.daily ? dailyAndUvData.daily.time.map((t, i) => ({
            dt: new Date(t).getTime() / 1000,
            main: {
              temp_max: dailyAndUvData.daily.temperature_2m_max[i],
              temp_min: dailyAndUvData.daily.temperature_2m_min[i]
            },
            weather: [{ main: "Clouds" }], // Placeholder, you may need a weather code converter
          })) : [],
          hourly: hourlyToday,
          uvIndex: currentUvIndex
        });
      } catch (err) {
        console.error("Error fetching forecast:", err);
        setError("Failed to load forecast data. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [apiKey, fetchDailyAndUv]
  );

  const fetchWeather = useCallback(
    async (cityName) => {
      if (!cityName) return;
      setLoading(true);
      setError(null);
      try {
        // Add a 5-second delay before fetching weather data
        await new Promise(resolve => setTimeout(resolve, 1000));
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        if (data.cod !== 200) throw new Error("City not found!");

        fetchForecast(cityName, data);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError(err.message || "An error occurred while fetching weather data.");
      } finally {
        setLoading(false);
      }
    },
    [apiKey, fetchForecast]
  );

  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  const handleSearch = () => {
    if (searchInput.trim()) setCity(searchInput.trim());
  };

  const current = weatherData?.weather?.[0];

  if (loading)
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center z-50">
        <LoaderCircle size={60} className="text-white animate-spin" />
        <p className="text-white text-2xl font-bold mt-4">Loading...</p>
      </div>
    );
  if (error)
    return <p className="text-red-400 p-6 text-center">{error}</p>;
  if (!weatherData || !current) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-6">
      {/* Sidebar */}
      <aside className="flex md:flex-col justify-center md:justify-start md:w-20 items-center space-x-6 md:space-x-0 md:space-y-6 py-4 md:py-8 border-b md:border-b-0 md:border-r border-gray-700">
        <div className="bg-gray-700 text-white p-3 rounded-xl">
          <Wind size={28} />
        </div>
     <nav className="flex md:flex-col space-x-6 md:space-x-0 md:space-y-6 text-gray-400">
          {
            [<CloudSun size={28} />, <Building size={28} />, <Map size={28} />, <Settings size={28} />].map((icon, idx) => (
            <button
              key={idx}
              className="hover:text-white transition-colors duration-200"
            >
              {icon}
            </button>
          ))
        }
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-2 md:px-8 mt-4 md:mt-0">
        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search for cities"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 text-white rounded-lg bg-gray-700 p-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Current Weather */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-6 rounded-2xl shadow-lg">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold">{weatherData.name}</h1>
            <p className="text-gray-400 text-sm mt-2">
              Chance of rain: {weatherData?.rain?.["1h"] || 0}%
            </p>
            <h2 className="text-7xl font-extrabold mt-4">
              {Math.round(weatherData.main.temp)}°
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-center">
            {getWeatherIcon(current.main)}
            <p className="mt-2 font-semibold text-lg capitalize">{current.main}</p>
          </div>
        </div>

        {/* Today's Forecast */}
        <section className="mt-8">
          <h3 className="mb-4 text-gray-400 font-semibold text-sm">
            TODAY’S FORECAST
          </h3>
          <div className="flex justify-around overflow-x-auto gap-4 p-4 rounded-2xl bg-gray-800">
            {weatherData.hourly.map((h) => (
              <div key={h.dt} className="flex flex-col items-center min-w-[70px]">
                <p className="text-sm text-gray-400">
                  {new Date(h.dt * 1000).toLocaleTimeString([], { hour: "2-digit", hour12: true })}
                </p>
                <div className="my-2">{getWeatherIcon(h.weather[0].main)}</div>
                <p className="text-white font-semibold capitalize text-sm">
                  {h.weather[0].main}
                </p>
                <p className="text-lg font-bold">{Math.round(h.main.temp)}°</p>
              </div>
            ))}
          </div>
        </section>

        {/* Air Conditions */}
        <section className="mt-8">
          <h3 className="mb-4 text-gray-400 font-semibold text-sm">AIR CONDITIONS</h3>
          <div className="bg-gray-800 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Real Feel</p>
              <h4 className="text-xl font-bold">{Math.round(weatherData.main.feels_like)}°</h4>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Wind</p>
              <h4 className="text-xl font-bold">{weatherData.wind.speed} m/s</h4>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Humidity</p>
              <h4 className="text-xl font-bold">{weatherData.main.humidity}%</h4>
            </div>
            <div>
              <p className="text-gray-400 text-sm">UV Index</p>
              <h4 className="text-xl font-bold">{weatherData.uvIndex}</h4>
            </div>
          </div>
        </section>
      </main>

      {/* 7-Day Forecast */}
      <aside className="w-full md:w-64 mt-6 md:mt-0 md:ml-8">
        <h3 className="mb-4 text-gray-400 font-semibold text-sm">7-DAY FORECAST</h3>
        <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
          {weatherData.daily.map((d) => (
            <div
              key={d.dt}
              className="flex justify-between items-center p-3 rounded-lg bg-gray-700/50"
            >
              <span className="text-sm font-medium">
                {new Date(d.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <div className="flex items-center gap-2">
                {getWeatherIcon(d.weather[0].main)}
                <span className="text-sm font-semibold capitalize">{d.weather[0].main}</span>
              </div>
              <span className="text-sm font-semibold">
                {Math.round(d.main.temp_max)}° / {Math.round(d.main.temp_min)}°
              </span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default WeatherDashboard;