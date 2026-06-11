import { ThermometerIcon, GaugeIcon, BarChartIcon, BellIcon, PaletteIcon, LocationIcon, SunriseSunset } from '../components/weather-icons/Icons';
import { styles } from '../styles/dashboard.styles';

// ── Toggle Switch Input Control ───────────────────────────────────────────────
const Toggle = ({ value, onChange, color = '#818CF8' }) => (
  <button
    onClick={() => onChange(!value)}
    style={{
      width: 44, height: 24, borderRadius: 12,
      background: value ? color : 'rgba(148, 163, 184, 0.2)',
      border: 'none', cursor: 'pointer',
      position: 'relative', transition: 'background 0.2s',
      flexShrink: 0,
    }}
  >
    <div style={{
      position: 'absolute', top: 3, left: value ? 23 : 3,
      width: 18, height: 18, borderRadius: '50%',
      background: '#fff', transition: 'left 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }} />
  </button>
);

// ── Generic Structured Preference Settings Line Option ─────────────────────────
const Row = ({ icon, label, sub, themeConfig, children }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: `1px solid ${themeConfig.border}`,
    gap: 16,
    transition: 'border-color 0.3s ease',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ color: themeConfig.textSecondary, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 14, color: themeConfig.textPrimary, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: themeConfig.textSecondary, marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
    {children}
  </div>
);

// ── Settings View Form Layout Panel ───────────────────────────────────────────
const SettingsView = ({ 
  unit, 
  setUnit, 
  theme, 
  setTheme, 
  notifications = {}, 
  setNotifications, 
  refreshInterval, 
  setRefreshInterval,
  themeConfig // Passed down dynamically from parent layout context
}) => {
  const S = styles;

  const sectionContainerStyle = {
    background: themeConfig.surface,
    border: `1px solid ${themeConfig.border}`,
    borderRadius: 16, 
    overflow: 'hidden',
    marginBottom: 20,
    boxShadow: theme === 'Light' ? '0 1px 3px rgba(0,0,0,0.02)' : 'none',
    transition: 'background 0.3s ease, border-color 0.3s ease',
  };

  const segmentControlGroupStyle = { 
    display: 'flex', 
    borderRadius: 10, 
    overflow: 'hidden', 
    border: `1px solid ${themeConfig.border}`,
    background: theme === 'Light' ? '#F1F5F9' : 'rgba(255,255,255,0.02)'
  };

  return (
    <div>
      <div style={{ ...S.sectionLabel, color: themeConfig.textSecondary }}>PREFERENCES</div>

      <div style={sectionContainerStyle}>
        {/* TEMPERATURE UNITS SEGMENT */}
        <Row icon={<ThermometerIcon />} label="Temperature Unit" sub="Display temperatures in Celsius or Fahrenheit" themeConfig={themeConfig}>
          <div style={segmentControlGroupStyle}>
            {['°C', '°F'].map(u => (
              <button key={u} onClick={() => setUnit(u)} style={{
                padding: '6px 16px', fontSize: 13, fontWeight: 600,
                background: unit === u ? themeConfig.activeNavBg : 'transparent',
                color: unit === u ? themeConfig.activeNavText : themeConfig.textSecondary,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}>{u}</button>
            ))}
          </div>
        </Row>

        {/* CONTRAST THEME SELECTION SEGMENT */}
        <Row icon={<PaletteIcon />} label="Theme" sub="Switch color profiles instantly" themeConfig={themeConfig}>
          <div style={segmentControlGroupStyle}>
            {['Light', 'Dark', 'Midnight'].map(t => (
              <button key={t} onClick={() => setTheme(t)} style={{
                padding: '6px 14px', fontSize: 13, fontWeight: 600,
                background: theme === t ? themeConfig.activeNavBg : 'transparent',
                color: theme === t ? themeConfig.activeNavText : themeConfig.textSecondary,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}>{t}</button>
            ))}
          </div>
        </Row>
      </div>

      <div style={{ ...S.sectionLabel, color: themeConfig.textSecondary }}>DATA & REFRESH</div>

      <div style={sectionContainerStyle}>
        {/* AUTOMATIC POLLING SELECT DROP-DOWN */}
        <Row icon={<GaugeIcon />} label="Auto Refresh" sub={`Refresh data every ${refreshInterval} minutes`} themeConfig={themeConfig}>
          <select
            value={refreshInterval}
            onChange={e => setRefreshInterval(Number(e.target.value))}
            style={{
              background: theme === 'Light' ? '#FFFFFF' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${themeConfig.border}`,
              borderRadius: 8, 
              color: themeConfig.textPrimary,
              padding: '6px 10px', fontSize: 13,
              cursor: 'pointer', outline: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {[5, 10, 15, 30, 60].map(m => (
              <option key={m} value={m} style={{ background: theme === 'Light' ? '#FFFFFF' : '#0d1126', color: theme === 'Light' ? '#1E293B' : '#CBD5E0' }}>
                {m} min
              </option>
            ))}
          </select>
        </Row>

        {/* EXTENDED RADAR TOGGLE ROW */}
        <Row icon={<BarChartIcon />} label="Extended Forecast" sub="Show 14-day forecast when available" themeConfig={themeConfig}>
          <Toggle value={!!notifications.extended} onChange={v => setNotifications?.(n => ({ ...n, extended: v }))} color={themeConfig.activeNavText} />
        </Row>
      </div>

      <div style={{ ...S.sectionLabel, color: themeConfig.textSecondary }}>ALERTS</div>

      <div style={sectionContainerStyle}>
        {[
          { key: 'severe', label: 'Severe Weather Alerts', sub: 'Storms, extreme heat, heavy rain',  color: '#FC8181' },
          { key: 'rain',   label: 'Rain Notifications',    sub: 'Alert before rain is expected',       color: '#63B3ED' },
          { key: 'uv',     label: 'High UV Warnings',      sub: 'Warn when UV index exceeds 7',        color: '#F6AD55' },
          { key: 'wind',   label: 'Strong Wind Alerts',    sub: 'Alert when gusts exceed 15 m/s',     color: '#9AE6B4' },
        ].map(({ key, label, sub, color }) => (
          <Row key={key} icon={<BellIcon />} label={label} sub={sub} themeConfig={themeConfig}>
            <Toggle value={!!notifications[key]} onChange={v => setNotifications?.(n => ({ ...n, [key]: v }))} color={color} />
          </Row>
        ))}
      </div>

      <div style={{ ...S.sectionLabel, color: themeConfig.textSecondary }}>ABOUT</div>

      <div style={sectionContainerStyle}>
        <Row icon={<LocationIcon />} label="Data Sources" sub="OpenWeatherMap · Open-Meteo" themeConfig={themeConfig}>
          <span style={{ fontSize: 12, color: themeConfig.textMuted }}>Free tier</span>
        </Row>
        <Row icon={<SunriseSunset />} label="App Version" sub="Weather Dashboard" themeConfig={themeConfig}>
          <span style={{ fontSize: 12, color: themeConfig.textMuted }}>v1.0.0</span>
        </Row>
      </div>
    </div>
  );
};

export default SettingsView;