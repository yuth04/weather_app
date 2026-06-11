import { useState, useEffect } from "react";
import useWeather from "../hooks/useWeather";
import { Spinner } from "./ui/SharedUI";
import Sidebar from "./sidebar/Sidebar";
import ForecastSidebar from "./sidebar/ForecastSidebar";
import TodayView from "../views/TodayView";
import MapView from "../views/MapView";
import DetailsView from "../views/DetailsView";
import SettingsView from "../views/SettingsView";
import { styles } from "../styles/dashboard.styles";

const WeatherDashboard = ({ theme, setTheme, currentTheme }) => {
  const { city, setCity, weatherData, loading, error, fetchWeather } =
    useWeather("Phnom Penh");

  const [searchInput, setSearchInput] = useState(city);
  const [activeNav, setActiveNav] = useState(0);

  // ✅ UNIT WITH LOCALSTORAGE
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem("unit") || "°C";
  });

  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  const [refreshInterval, setRefreshInterval] = useState(15);

  const [notifications, setNotifications] = useState({
    extended: true,
    severe: true,
    rain: false,
    uv: true,
    wind: false,
  });

  const [ui, setUi] = useState({
    isMobile: false,
    isTablet: false,
    sidebarOpen: false,
    forecastOpen: false,
  });

  const { isMobile, isTablet, sidebarOpen, forecastOpen } = ui;

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setUi((prev) => ({
        ...prev,
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024,
        sidebarOpen: w < 768 ? prev.sidebarOpen : false,
        forecastOpen: w < 768 ? prev.forecastOpen : false,
      }));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => fetchWeather(city),
      refreshInterval * 60 * 1000
    );
    return () => clearInterval(id);
  }, [city, refreshInterval, fetchWeather]);

  const handleSearch = () => {
    if (searchInput.trim()) setCity(searchInput.trim());
  };

  if (loading) return <Spinner />;

  if (error)
    return (
      <div style={styles.errorWrap}>
        <p style={{ color: "#FC8181" }}>⚠ {error}</p>
        <button onClick={() => fetchWeather(city)} style={styles.retryBtn}>
          Retry
        </button>
      </div>
    );

  if (!weatherData?.weather?.[0]) return null;

  const S = styles;

  return (
    <div
      style={{
        ...S.root,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        background: currentTheme.bg,
        color: currentTheme.textPrimary,
      }}
    >
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isMobile={isMobile}
        isTablet={isTablet}
        open={sidebarOpen}
        setOpen={(v) => setUi((p) => ({ ...p, sidebarOpen: v }))}
        themeConfig={currentTheme}
      />

      <main style={{ flex: 1, padding: 32 }}>
        {activeNav === 0 && (
          <TodayView
            weatherData={weatherData}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearch={handleSearch}
            themeConfig={{ ...currentTheme, unit }} 
          />
        )}

        {activeNav === 1 && <MapView weatherData={weatherData} themeConfig={currentTheme} />}
        {activeNav === 2 && <DetailsView weatherData={weatherData} themeConfig={currentTheme} />}

        {activeNav === 3 && (
          <SettingsView
            unit={unit}
            setUnit={setUnit}
            theme={theme}
            setTheme={setTheme}
            refreshInterval={refreshInterval}
            setRefreshInterval={setRefreshInterval}
            notifications={notifications}
            setNotifications={setNotifications}
            themeConfig={{ ...currentTheme, unit }}   // ✅ PASS UNIT
          />
        )}
      </main>

      {!isMobile && (
        <ForecastSidebar
          weatherData={weatherData}
          city={city}
          setCity={setCity}
          setSearchInput={setSearchInput}
          setActiveNav={setActiveNav}
          themeConfig={currentTheme}
        />
      )}
    </div>
  );
};

export default WeatherDashboard;