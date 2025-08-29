import React, { useEffect, useState, useCallback } from "react";
import { Sun, Cloud, CloudRain, CloudLightning, Wind } from "lucide-react";

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

  const fetchForecast = useCallback(
    async (cityName, currentWeather) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch forecast.");

        // Daily forecast at 12:00
        const dailyForecasts = data.list
          .filter((item) => item.dt_txt.endsWith("12:00:00"))
          .slice(0, 7);

        // Hourly forecast from now until 12 AM
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

        setWeatherData({
          ...currentWeather,
          daily: dailyForecasts,
          hourly: hourlyToday,
        });
      } catch (err) {
        console.error("Error fetching forecast:", err);
        setError("Failed to load forecast data. Please try again later.");
      }
    },
    [apiKey]
  );

  const fetchWeather = useCallback(
    async (cityName) => {
      if (!cityName) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        if (data.cod !== 200) throw new Error("City not found!");

        // Fetch forecast and include current weather for hourly
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
    return <p className="text-white p-6 text-center">Loading...</p>;
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
          {["🌤️", "🏙️", "🗺️", "⚙️"].map((icon, idx) => (
            <button
              key={idx}
              className="hover:text-white transition-colors duration-200"
            >
              {icon}
            </button>
          ))}
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
              <h4 className="text-xl font-bold">{weatherData.hourly?.[0]?.uvi || "N/A"}</h4>
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
