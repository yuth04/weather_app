import { styles } from '../styles/dashboard.styles';

const MapView = ({ weatherData, themeConfig }) => {
  const lat     = weatherData?.coord?.lat;
  const lon     = weatherData?.coord?.lon;
  const city    = weatherData?.name;
  const temp    = weatherData?.main?.temp;

  const isLightMode = themeConfig?.bg === '#F8FAFC';

  // Nearby cities using a simple offset grid (illustrative)
  const nearby = [
    { name: 'North', dlat:  0.8, dlon:  0,   temp: temp - 1   },
    { name: 'East',  dlat:  0,   dlon:  1.2, temp: temp + 0.5 },
    { name: 'South', dlat: -0.9, dlon:  0,   temp: temp + 1.5 },
    { name: 'West',  dlat:  0,   dlon: -1.1, temp: temp - 0.5 },
  ];

  // Map bounds
  const rangeKm = 150;
  const degLat  = rangeKm / 111;
  const degLon  = rangeKm / (111 * Math.cos((lat * Math.PI) / 180));
  const minLat  = lat - degLat;
  const maxLat  = lat + degLat;
  const minLon  = lon - degLon;
  const maxLon  = lon + degLon;

  const project = (plat, plon) => ({
    x: ((plon - minLon) / (maxLon - minLon)) * 560 + 20,
    y: ((maxLat - plat) / (maxLat - minLat)) * 340 + 20,
  });

  const center = project(lat, lon);

  // Dynamic Theme Styling Tokens
  const mapContainerBg = isLightMode ? '#EDF2F7' : themeConfig.surface || 'rgba(10,15,35,0.9)';
  const svgCanvasBg    = isLightMode ? '#F1F5F9' : 'rgba(5,8,22,0.95)';
  const gridLineStroke = isLightMode ? 'rgba(0,0,0,0.05)' : 'rgba(99,179,237,0.08)';
  const mapOverlayBg   = isLightMode ? 'rgba(255,255,255,0.92)' : 'rgba(13,17,38,0.9)';
  const radarRingAlpha = isLightMode ? 'rgba(79,70,229,0.15)' : 'rgba(99,102,241,0.25)';

  // Grid lines generator loop
  const gridLines = [];
  for (let i = 0; i <= 6; i++) {
    const glat = minLat + i * ((degLat * 2) / 6);
    const p1 = project(glat, minLon);
    const p2 = project(glat, maxLon);
    gridLines.push(
      <line key={`h${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={gridLineStroke} strokeWidth="1" />
    );
  }
  for (let i = 0; i <= 6; i++) {
    const glon = minLon + i * ((degLon * 2) / 6);
    const p1 = project(minLat, glon);
    const p2 = project(maxLat, glon);
    gridLines.push(
      <line key={`v${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={gridLineStroke} strokeWidth="1" />
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ ...styles.sectionLabel, color: themeConfig.textSecondary }}>WEATHER MAP</div>
        <div style={{ fontSize: 13, color: themeConfig.textMuted, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
          Centered on {city} · {lat?.toFixed(2)}°N, {lon?.toFixed(2)}°E
        </div>
      </div>

      {/* ── MAP CONTAINER ── */}
      <div style={{
        borderRadius: 24,
        border: `1px solid ${themeConfig.border}`,
        overflow: 'hidden',
        background: mapContainerBg,
        position: 'relative',
        boxShadow: isLightMode ? '0 4px 20px -2px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <svg width="100%" viewBox="0 0 600 380" style={{ display: 'block' }}>
          <rect width="600" height="380" fill={svgCanvasBg} style={{ transition: 'fill 0.3s' }} />
          {gridLines}

          {/* Radius rings */}
          <circle cx={center.x} cy={center.y} r="60"
            fill={isLightMode ? 'rgba(79,70,229,0.02)' : 'rgba(99,102,241,0.04)'} 
            stroke={radarRingAlpha} strokeWidth="1" strokeDasharray="4 4" />
          <circle cx={center.x} cy={center.y} r="120"
            fill="none" stroke={isLightMode ? 'rgba(79,70,229,0.06)' : 'rgba(99,102,241,0.08)'} 
            strokeWidth="1" strokeDasharray="4 4" />

          {/* Nearby markers */}
          {nearby.map((n) => {
            const p = project(lat + n.dlat, lon + n.dlon);
            return (
              <g key={n.name}>
                <circle cx={p.x} cy={p.y} r="18"
                  fill={isLightMode ? '#FFFFFF' : 'rgba(255,255,255,0.03)'} 
                  stroke={themeConfig.border} strokeWidth="1" style={{ transition: 'all 0.3s' }} />
                <text x={p.x} y={p.y - 1} textAnchor="middle" dominantBaseline="central"
                  fill={themeConfig.textPrimary} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700">
                  {Math.round(n.temp)}°
                </text>
                <text x={p.x} y={p.y + 13} textAnchor="middle"
                  fill={themeConfig.textSecondary} fontSize="8" fontFamily="Inter, sans-serif" fontWeight="600">
                  {n.name}
                </text>
              </g>
            );
          })}

          {/* Center city marker radar point */}
          <circle cx={center.x} cy={center.y} r="10" fill={isLightMode ? 'rgba(79,70,229,0.18)' : 'rgba(129,140,248,0.25)'} />
          <circle cx={center.x} cy={center.y} r="4" fill={isLightMode ? '#4F46E5' : '#818CF8'} />

          {/* Core Target Popup Tag */}
          <rect x={center.x - 45} y={center.y - 44} width="90" height="30" rx="10"
            fill={mapOverlayBg} stroke={isLightMode ? '#4F46E5' : 'rgba(129,140,248,0.5)'} strokeWidth="1.5" style={{ transition: 'all 0.3s' }} />
          <text x={center.x} y={center.y - 33} textAnchor="middle"
            fill={themeConfig.textPrimary} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700">{city}</text>
          <text x={center.x} y={center.y - 21} textAnchor="middle"
            fill={isLightMode ? '#4F46E5' : '#818CF8'} fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600">{Math.round(temp)}°C</text>

          {/* Compass rose */}
          <g transform="translate(552, 32)">
            <circle cx="0" cy="0" r="20" fill={mapOverlayBg} stroke={themeConfig.border} strokeWidth="1" />
            <text x="0" y="-8" textAnchor="middle" fill={themeConfig.textPrimary} fontSize="8" fontFamily="Inter, sans-serif" fontWeight="800">N</text>
            <text x="0" y="12"  textAnchor="middle" fill={themeConfig.textMuted} fontSize="7" fontFamily="Inter, sans-serif" fontWeight="600">S</text>
            <text x="-12" y="3" textAnchor="middle" fill={themeConfig.textMuted} fontSize="7" fontFamily="Inter, sans-serif" fontWeight="600">W</text>
            <text x="12"  y="3" textAnchor="middle" fill={themeConfig.textMuted} fontSize="7" fontFamily="Inter, sans-serif" fontWeight="600">E</text>
            <polygon points="0,-14 3,-2 0,0 -3,-2"  fill="#EF4444" />
            <polygon points="0,14 3,2 0,0 -3,2"    fill={isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)'} />
          </g>

          {/* Scale bar */}
          <g transform="translate(24, 355)">
            <line x1="0"  y1="0" x2="60" y2="0" stroke={themeConfig.textSecondary} strokeWidth="1.5" />
            <line x1="0"  y1="-4" x2="0"  y2="4" stroke={themeConfig.textSecondary} strokeWidth="1.5" />
            <line x1="60" y1="-4" x2="60" y2="4" stroke={themeConfig.textSecondary} strokeWidth="1.5" />
            <text x="30" y="-8" textAnchor="middle" fill={themeConfig.textSecondary} fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600">50 km</text>
          </g>
        </svg>

        {/* Dynamic Map Legend Floating Box */}
        <div style={{
          position: 'absolute', bottom: 12, right: 16,
          background: mapOverlayBg,
          border: `1px solid ${themeConfig.border}`,
          borderRadius: 12, padding: '10px 14px',
          fontSize: 11, color: themeConfig.textSecondary,
          backdropFilter: 'blur(10px)',
          boxShadow: isLightMode ? '0 4px 12px rgba(0,0,0,0.03)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: isLightMode ? '#4F46E5' : '#818CF8', boxShadow: isLightMode ? '0 0 6px #4F46E5' : '0 0 6px #818CF8' }} />
            <span style={{ color: themeConfig.textPrimary, fontWeight: 600 }}>{city}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: isLightMode ? '#FFFFFF' : 'rgba(255,255,255,0.05)', border: `1px solid ${themeConfig.border}` }} />
            <span style={{ color: themeConfig.textMuted, fontWeight: 500 }}>Nearby reference</span>
          </div>
        </div>
      </div>

      {/* ── COORDINATE DATA CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
        {[
          { label: 'Latitude',  value: `${lat?.toFixed(4)}°` },
          { label: 'Longitude', value: `${lon?.toFixed(4)}°` },
          { label: 'Timezone',  value: weatherData?.timezone
              ? `UTC${weatherData.timezone >= 0 ? '+' : ''}${weatherData.timezone / 3600}`
              : '—' },
        ].map(({ label, value }) => (
          <div key={label} style={{ 
            ...styles.condCard,
            background: themeConfig.cardBg,
            border: `1px solid ${themeConfig.border}`,
            borderRadius: 16,
            padding: '14px 16px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: 11, color: themeConfig.textSecondary, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: themeConfig.textPrimary, marginTop: 4 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;