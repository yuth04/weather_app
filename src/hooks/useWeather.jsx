import { useState, useCallback, useEffect } from "react";

/**
 * Data strategy:
 *  1. /weather          → current conditions (free tier)
 *  2. /forecast         → hourly slots for today + 5-day daily (free tier)
 *  3. onecall (3.0)     → real 7-day forecast + UV index (One Call API, paid)
 *
 * If VITE_OWM_ONECALL_KEY is set, One Call is used for daily + UV.
 * Otherwise the hook falls back to /forecast-derived daily data and UV = "N/A".
 */

const BASE = "https://api.openweathermap.org/data/2.5";
const OC   = "https://api.openweathermap.org/data/3.0/onecall";

const useWeather = (initialCity = "Phnom Penh") => {
  const [city,        setCity]        = useState(initialCity);
  const [weatherData, setWeatherData] = useState({ daily: [], hourly: [] });
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);

  const apiKey      = import.meta.env.VITE_WEATHER_API_KEY;
  const oneCallKey  = import.meta.env.VITE_OWM_ONECALL_KEY || apiKey;

  // ── Build 7-day daily from /forecast (free-tier fallback) ─────────────────
  const dailyFromForecast = (list, currentWeather) => {
    const byDay = {};
    list.forEach((item) => {
      const day = new Date(item.dt * 1000).toLocaleDateString();
      if (!byDay[day]) byDay[day] = [];
      byDay[day].push(item);
    });

    const days = Object.values(byDay)
      .slice(0, 7)
      .map((entries) => {
        const midday = entries.reduce((best, e) =>
          Math.abs(new Date(e.dt * 1000).getHours() - 12) <
          Math.abs(new Date(best.dt * 1000).getHours() - 12)
            ? e : best
        );
        return {
          dt: midday.dt,
          main: {
            temp_max: Math.max(...entries.map((e) => e.main.temp_max ?? e.main.temp)),
            temp_min: Math.min(...entries.map((e) => e.main.temp_min ?? e.main.temp)),
          },
          weather: midday.weather,
        };
      });

    if (days[0]) {
      days[0].main.temp_max = Math.max(days[0].main.temp_max, currentWeather.main.temp);
      days[0].main.temp_min = Math.min(days[0].main.temp_min, currentWeather.main.temp);
    }
    return days;
  };

  // ── Fetch using One Call 3.0 (7-day + UV) ─────────────────────────────────
  const fetchOneCall = useCallback(async (lat, lon) => {
    const res  = await fetch(
      `${OC}?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${oneCallKey}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "One Call API failed.");
    return data;
  }, [oneCallKey]);

  // ── Main forecast fetch ───────────────────────────────────────────────────
  const fetchForecast = useCallback(
    async (cityName, currentWeather) => {
      const { coord } = currentWeather;

      // Always fetch /forecast for today's hourly slots
      const fRes  = await fetch(
        `${BASE}/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const fData = await fRes.json();
      if (!fRes.ok) throw new Error(fData.message || "Failed to fetch forecast.");

      const now = Date.now();
      const hourlyToday = [
        {
          dt: Math.floor(now / 1000),
          main:    { temp: currentWeather.main.temp },
          weather: currentWeather.weather,
        },
        ...fData.list.filter((item) => {
          const t = item.dt * 1000;
          return (
            new Date(t).toLocaleDateString() === new Date(now).toLocaleDateString() &&
            t > now
          );
        }),
      ];

      // Try One Call for real 7-day + UV; fall back to /forecast-derived data
      let dailyForecast;
      let uvIndex = "N/A";

      try {
        const oc = await fetchOneCall(coord.lat, coord.lon);

        // One Call daily array — 8 entries (today + 7 days)
        dailyForecast = oc.daily.slice(0, 7).map((d) => ({
          dt: d.dt,
          main: {
            temp_max: d.temp.max,
            temp_min: d.temp.min,
          },
          weather: d.weather,
        }));

        // Merge today's live temp into day 0
        dailyForecast[0].main.temp_max = Math.max(
          dailyForecast[0].main.temp_max,
          currentWeather.main.temp
        );
        dailyForecast[0].main.temp_min = Math.min(
          dailyForecast[0].main.temp_min,
          currentWeather.main.temp
        );

        uvIndex = oc.current?.uvi ?? "N/A";
      } catch {
        // One Call unavailable — fall back to /forecast-derived 5-day
        dailyForecast = dailyFromForecast(fData.list, currentWeather);
      }

      setWeatherData({
        ...currentWeather,
        daily:   dailyForecast,
        hourly:  hourlyToday,
        uvIndex,
      });
      setLoading(false);
    },
    [apiKey, fetchOneCall]
  );

  // ── Current conditions ────────────────────────────────────────────────────
  const fetchWeather = useCallback(
    async (cityName) => {
      if (!cityName) return;
      setLoading(true);
      setError(null);
      try {
        const res  = await fetch(
          `${BASE}/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        if (data.cod !== 200) throw new Error("City not found.");
        await fetchForecast(cityName, data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    },
    [apiKey, fetchForecast]
  );

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return { city, setCity, weatherData, loading, error, fetchWeather };
};

export default useWeather;