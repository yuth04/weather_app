import SearchBar from "../components/search/SearchBar";
import { getWeatherIcon } from "../components/weather-icons/WeatherIcons";
import {
  ThermometerIcon,
  DropletIcon,
  WindMini,
  SunriseSunset,
} from "../components/weather-icons/Icons";
import { uvColor } from "../components/ui/SharedUI";
import { styles } from "../styles/dashboard.styles";

const TodayView = ({
  weatherData,
  searchInput,
  setSearchInput,
  handleSearch,
  themeConfig,
}) => {
  const current = weatherData?.weather?.[0];
  const currentDay = weatherData?.daily?.[0];
  const now = new Date();
  const S = styles;

  const isLightMode = themeConfig?.bg === "#F8FAFC";

  // ✅ UNIT FROM LOCALSTORAGE (OR DEFAULT °C)
  const unit = themeConfig?.unit || "°C";

  // ✅ CONVERT FUNCTION FIXED
  const convertTemp = (temp) => {
    if (temp == null) return "—";
    const t = Number(temp);

    return unit === "°F" ? Math.round((t * 9) / 5 + 32) : Math.round(t);
  };

  const accentColor = isLightMode ? "#4F46E5" : "#818CF8";

  const heroGradient =
    themeConfig.heroBg ||
    (isLightMode
      ? "linear-gradient(135deg, #E0E7FF 0%, #EEF2F6 100%)"
      : "linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)");

  return (
    <>
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        themeConfig={themeConfig}
      />

      {/* HERO */}
      <div style={{ ...S.heroCard, background: heroGradient }}>
        <div style={S.heroLeft}>
          <div style={S.heroCity}>{weatherData.name}</div>

          <div style={S.heroDate}>
            {now.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>

          {/* ✅ HERO TEMP FIXED */}
          <div
            style={{
              ...S.heroTemp,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: themeConfig.textPrimary,
                
              }}
            >
              {convertTemp(weatherData.main.temp)}
            </span>

            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                // color: accentColor,
                marginLeft: 8,
                marginTop: 10,
                // pushes unit slightly upward (weather-style look)
              }}
            >
              °<span style={{padding:4}}>{unit.replace("°", "")}</span>
            </span>
          </div>

          <div style={S.heroDesc}>{current.description}</div>

          {currentDay && (
            <div style={S.heroHighLow}>
              <span>↑ {convertTemp(currentDay.main.temp_max)}°</span>
              <span>↓ {convertTemp(currentDay.main.temp_min)}°</span>
            </div>
          )}
        </div>

        <div style={S.heroRight}>
          {getWeatherIcon(current.main, 110)}
          <div>{current.main}</div>
        </div>
      </div>

      {/* CONDITIONS */}
      <div style={S.condGrid}>
        {[
          {
            label: "Real Feel",
            value: `${convertTemp(weatherData.main.feels_like)}°`,
            icon: <ThermometerIcon />,
          },
          {
            label: "Humidity",
            value: `${weatherData.main.humidity}%`,
            icon: <DropletIcon />,
          },
          {
            label: "Wind",
            value: `${weatherData.wind.speed} m/s`,
            icon: <WindMini />,
          },
          {
            label: "UV",
            value: weatherData.uvIndex,
            icon: <SunriseSunset />,
          },
        ].map((item) => (
          <div key={item.label} style={S.condCard}>
            <div>{item.label}</div>
            <div>{item.icon}</div>
            <div>{item.value}</div>
          </div>
        ))}
      </div>

      {/* HOURLY */}
      <div style={S.hourlyRow}>
        {weatherData.hourly.map((h, i) => (
          <div key={h.dt} style={S.hourlyCard}>
            <div>
              {i === 0
                ? "Now"
                : new Date(h.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    hour12: true,
                  })}
            </div>

            <div>{getWeatherIcon(h.weather[0].main, 36)}</div>

            {/* ✅ HOURLY TEMP FIXED */}
            <div>{convertTemp(h.main.temp)}°</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodayView;
