import { getWeatherIcon } from '../weather-icons/WeatherIcons';
import { LocationIcon } from '../weather-icons/Icons';
import { styles } from '../../styles/dashboard.styles';

const QUICK_CITIES = ['Phnom Penh', 'Siem Reap', 'Battambang', 'Kampot'];

const ForecastSidebar = ({ 
  weatherData, 
  city, 
  setCity, 
  setSearchInput, 
  setActiveNav,
  themeConfig 
}) => {
  const S = styles;

  // Guard: wait until data is fully populated with appropriate structural fallbacks
  if (!weatherData?.main || !weatherData?.daily?.length) {
    return (
      <aside 
        style={{ 
          ...S.forecastSidebar, 
          background: themeConfig?.surface || 'transparent',
          borderLeft: themeConfig ? `1px solid ${themeConfig.border}` : undefined 
        }} 
      />
    );
  }

  const pressure   = weatherData.main.pressure;
  const visibility = ((weatherData.visibility ?? 10000) / 1000).toFixed(1);
  const clouds     = weatherData.clouds?.all ?? 0;

  return (
    <aside style={{ 
      ...S.forecastSidebar, 
      borderLeft: `1px solid ${themeConfig.border}`,
      background: themeConfig.surface,
      transition: 'background 0.3s ease, border 0.3s ease'
    }}>

      {/* ── 7-day forecast ─────────────────────────────────────────────── */}
      <div style={{ ...S.sectionLabel, color: themeConfig.textSecondary }}>7-DAY FORECAST</div>
      <div style={S.forecastList}>
        {weatherData.daily.map((d, i) => {
          const icon    = d.weather?.[0]?.main ?? 'Clouds';
          const tempMax = d.main?.temp_max != null ? Math.round(d.main.temp_max) : '—';
          const tempMin = d.main?.temp_min != null ? Math.round(d.main.temp_min) : '—';

          return (
            <div
              key={d.dt}
              style={{ 
                ...S.forecastRow, 
                ...(i === 0 ? S.forecastRowToday : {}),
                borderBottom: `1px solid ${themeConfig.border}`
              }}
            >
              <span style={{ ...S.forecastDay, color: themeConfig.textPrimary }}>
                {i === 0
                  ? 'Today'
                  : new Date(d.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span style={S.forecastIcon}>{getWeatherIcon(icon, 32)}</span>
              <span style={S.forecastTemps}>
                <span style={{ color: '#F6AD55', fontWeight: 600 }}>{tempMax}°</span>
                <span style={{ color: themeConfig.textMuted || '#A0AEC0', margin: '0 4px' }}>/</span>
                <span style={{ color: '#63B3ED', fontWeight: 500 }}>{tempMin}°</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* ── More details ───────────────────────────────────────────────── */}
      <div style={{ marginTop: 24 }}>
        <div style={{ ...S.sectionLabel, color: themeConfig.textSecondary }}>MORE DETAILS</div>
        <div style={{ 
          ...S.detailCard, 
          background: themeConfig.cardBgSubtle || 'rgba(255, 255, 255, 0.03)', 
          border: `1px solid ${themeConfig.border}`,
          borderRadius: 12
        }}>
          {[
            { label: 'Pressure',    value: `${pressure} hPa`   },
            { label: 'Visibility',  value: `${visibility} km`   },
            { label: 'Cloud Cover', value: `${clouds}%`         },
          ].map(({ label, value }) => (
            <div key={label} style={{ ...S.detailRow, borderBottom: `1px solid ${themeConfig.border}` }}>
              <span style={{ ...S.detailLabel, color: themeConfig.textSecondary }}>{label}</span>
              <span style={{ ...S.detailValue, color: themeConfig.textPrimary }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick cities ───────────────────────────────────────────────── */}
      <div style={{ marginTop: 24 }}>
        <div style={{ ...S.sectionLabel, color: themeConfig.textSecondary }}>QUICK CITIES</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {QUICK_CITIES.map(c => {
            const isSelected = city === c;
            return (
              <button
                key={c}
                onClick={() => { setCity(c); setSearchInput(c); setActiveNav(0); }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 10,
                  textAlign: 'left',
                  background: isSelected ? themeConfig.activeNavBg : 'transparent',
                  border: isSelected ? `1px solid ${themeConfig.border}` : '1px solid transparent',
                  color: isSelected ? themeConfig.activeNavText : themeConfig.textSecondary,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: isSelected ? 600 : 500,
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: isSelected ? themeConfig.activeNavText : themeConfig.textMuted 
                }}>
                  <LocationIcon />
                </span>
                {c}
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};

export default ForecastSidebar;