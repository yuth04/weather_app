// import React, { useEffect, useState, useCallback } from "react";

// // ── Beautiful SVG Weather Icons ──────────────────────────────────────────────
// const SunIcon = ({ size = 64 }) => (
//   <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
//     <defs>
//       <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor="#FFF176" />
//         <stop offset="100%" stopColor="#FFAB00" />
//       </radialGradient>
//       <filter id="sunGlow">
//         <feGaussianBlur stdDeviation="2" result="blur" />
//         <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
//       </filter>
//     </defs>
//     <g filter="url(#sunGlow)">
//       {[0,45,90,135,180,225,270,315].map((deg, i) => (
//         <line key={i}
//           x1="32" y1="8" x2="32" y2="14"
//           stroke="#FFCA28" strokeWidth="2.5" strokeLinecap="round"
//           transform={`rotate(${deg} 32 32)`}
//           style={{ animation: `sunRayPulse 2s ease-in-out ${i*0.25}s infinite alternate` }}
//         />
//       ))}
//       <circle cx="32" cy="32" r="11" fill="url(#sunCore)" />
//     </g>
//     <style>{`@keyframes sunRayPulse{from{opacity:0.5}to{opacity:1}}`}</style>
//   </svg>
// );

// const CloudIcon = ({ size = 64 }) => (
//   <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
//     <defs>
//       <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="0%" stopColor="#E0E0E0" />
//         <stop offset="100%" stopColor="#BDBDBD" />
//       </linearGradient>
//       <filter id="cloudShadow">
//         <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#00000030" />
//       </filter>
//     </defs>
//     <g filter="url(#cloudShadow)" style={{ animation: 'cloudBob 3s ease-in-out infinite' }}>
//       <ellipse cx="32" cy="36" rx="20" ry="10" fill="url(#cloudGrad)" />
//       <circle cx="24" cy="32" r="9" fill="url(#cloudGrad)" />
//       <circle cx="36" cy="28" r="11" fill="url(#cloudGrad)" />
//     </g>
//     <style>{`@keyframes cloudBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
//   </svg>
// );

// const RainIcon = ({ size = 64 }) => (
//   <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
//     <defs>
//       <linearGradient id="rainCloud" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="0%" stopColor="#90A4AE" />
//         <stop offset="100%" stopColor="#607D8B" />
//       </linearGradient>
//     </defs>
//     <g style={{ animation: 'cloudBob 3s ease-in-out infinite' }}>
//       <ellipse cx="32" cy="28" rx="18" ry="9" fill="url(#rainCloud)" />
//       <circle cx="22" cy="25" r="8" fill="url(#rainCloud)" />
//       <circle cx="34" cy="21" r="10" fill="url(#rainCloud)" />
//     </g>
//     {[[24,40,0],[32,42,0.2],[20,46,0.4],[36,44,0.1],[28,48,0.3]].map(([x,y,delay],i)=>(
//       <line key={i} x1={x} y1={y} x2={x-3} y2={y+7}
//         stroke="#64B5F6" strokeWidth="2" strokeLinecap="round"
//         style={{ animation: `rainDrop 1.2s ease-in ${delay}s infinite` }}
//       />
//     ))}
//     <style>{`
//       @keyframes cloudBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
//       @keyframes rainDrop{0%{opacity:0;transform:translateY(-4px)}50%{opacity:1}100%{opacity:0;transform:translateY(6px)}}
//     `}</style>
//   </svg>
// );

// const ThunderIcon = ({ size = 64 }) => (
//   <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
//     <defs>
//       <linearGradient id="stormCloud" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="0%" stopColor="#546E7A" />
//         <stop offset="100%" stopColor="#37474F" />
//       </linearGradient>
//       <filter id="boltGlow">
//         <feGaussianBlur stdDeviation="2" result="blur"/>
//         <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
//       </filter>
//     </defs>
//     <ellipse cx="32" cy="24" rx="18" ry="9" fill="url(#stormCloud)" />
//     <circle cx="22" cy="21" r="8" fill="url(#stormCloud)" />
//     <circle cx="34" cy="17" r="10" fill="url(#stormCloud)" />
//     <g filter="url(#boltGlow)" style={{ animation: 'boltFlash 2s ease-in-out infinite' }}>
//       <polygon points="34,32 28,44 33,44 30,54 40,38 34,38" fill="#FFD600" />
//     </g>
//     <style>{`@keyframes boltFlash{0%,90%,100%{opacity:1}95%{opacity:0.2}}`}</style>
//   </svg>
// );

// const PartlyCloudyIcon = ({ size = 64 }) => (
//   <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
//     <defs>
//       <radialGradient id="pcSun" cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor="#FFF176" />
//         <stop offset="100%" stopColor="#FFAB00" />
//       </radialGradient>
//       <linearGradient id="pcCloud" x1="0" y1="0" x2="0" y2="1">
//         <stop offset="0%" stopColor="#F5F5F5" />
//         <stop offset="100%" stopColor="#E0E0E0" />
//       </linearGradient>
//       <filter id="pcSunGlow">
//         <feGaussianBlur stdDeviation="2" result="blur"/>
//         <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
//       </filter>
//     </defs>
//     <g filter="url(#pcSunGlow)">
//       <circle cx="22" cy="24" r="10" fill="url(#pcSun)" />
//       {[0,60,120,180,240,300].map((deg,i)=>(
//         <line key={i} x1="22" y1="10" x2="22" y2="14"
//           stroke="#FFCA28" strokeWidth="2" strokeLinecap="round"
//           transform={`rotate(${deg} 22 24)`} />
//       ))}
//     </g>
//     <g style={{ animation: 'cloudBob 3s ease-in-out infinite' }}>
//       <ellipse cx="38" cy="40" rx="17" ry="9" fill="url(#pcCloud)" />
//       <circle cx="28" cy="36" r="8" fill="url(#pcCloud)" />
//       <circle cx="40" cy="32" r="10" fill="url(#pcCloud)" />
//     </g>
//     <style>{`@keyframes cloudBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
//   </svg>
// );

// const WindIcon2 = ({ size = 64 }) => (
//   <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
//     {[
//       { y: 22, w: 32, r: 8 },
//       { y: 32, w: 40, r: 0 },
//       { y: 42, w: 28, r: 6 },
//     ].map(({ y, w, r }, i) => (
//       <g key={i} style={{ animation: `windLine 2s ease-in-out ${i * 0.3}s infinite` }}>
//         <line x1="10" y1={y} x2={10 + w} y2={y}
//           stroke="#82B1FF" strokeWidth="2.5" strokeLinecap="round" />
//         {r > 0 && (
//           <path d={`M ${10+w} ${y} Q ${10+w+r} ${y} ${10+w+r} ${y + (i===0?-r:r)}`}
//             stroke="#82B1FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
//         )}
//       </g>
//     ))}
//     <style>{`@keyframes windLine{0%,100%{transform:translateX(0);opacity:1}50%{transform:translateX(4px);opacity:0.6}}`}</style>
//   </svg>
// );

// const getWeatherIcon = (main, size = 56) => {
//   switch (main) {
//     case "Clear":        return <SunIcon size={size} />;
//     case "Clouds":       return <CloudIcon size={size} />;
//     case "Rain":
//     case "Drizzle":      return <RainIcon size={size} />;
//     case "Thunderstorm": return <ThunderIcon size={size} />;
//     case "Wind":         return <WindIcon2 size={size} />;
//     default:             return <PartlyCloudyIcon size={size} />;
//   }
// };

// // ── Mini icons ────────────────────────────────────────────────────────────────
// const Icon = ({ d, size = 22, color = "currentColor", fill = "none", strokeW = 1.8 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
//     <path d={d} />
//   </svg>
// );

// const WindMini       = () => <Icon d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />;
// const DropletIcon    = () => <Icon d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="#60A5FA" color="#3B82F6" />;
// const ThermometerIcon= () => <Icon d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />;
// const EyeIcon        = () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;
// const SearchIcon     = () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
// const MapIcon        = () => <Icon d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />;
// const SettingsIcon   = () => <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />;
// const SunriseSunset  = () => <Icon d="M12 2v2M4.22 4.22l1.42 1.42M2 12h2m16 0h2M19.78 4.22l-1.42 1.42M12 6a6 6 0 0 1 6 6H6a6 6 0 0 1 6-6zM3 20h18" />;

// // Extra icons for new views
// const LocationIcon   = () => <Icon d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="rgba(99,179,237,0.3)" color="#63B3ED" />;
// const GaugeIcon      = () => <Icon d="M12 2a10 10 0 1 0 10 10M12 6v6l4 2" />;
// const SunriseIcon    = () => <Icon d="M17 18a5 5 0 0 0-10 0M12 2v3M4.22 7.22l2.12 2.12M1 14h3M20 14h3M19.78 7.22l-2.12 2.12M5 18H3M21 18h-2" />;
// const MoonIcon       = () => <Icon d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
// const BarChartIcon   = () => <Icon d="M12 20V10M18 20V4M6 20v-4" />;
// const BellIcon       = () => <Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />;
// const PaletteIcon    = () => <Icon d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.5c0-.55-.2-1.05-.53-1.43a.5.5 0 0 1 .36-.86H15c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zM7 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3-5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />;

// // ── Loading Spinner ───────────────────────────────────────────────────────────
// const Spinner = () => (
//   <div style={{
//     position: 'fixed', inset: 0,
//     background: 'rgba(5,8,22,0.85)',
//     display: 'flex', flexDirection: 'column',
//     alignItems: 'center', justifyContent: 'center',
//     zIndex: 100, backdropFilter: 'blur(6px)',
//   }}>
//     <div style={{
//       width: 56, height: 56, borderRadius: '50%',
//       border: '3px solid rgba(99,179,237,0.15)',
//       borderTopColor: '#63B3ED',
//       animation: 'spin 0.9s linear infinite',
//     }} />
//     <p style={{ color: '#A0AEC0', marginTop: 16, fontSize: 14, letterSpacing: '0.08em' }}>
//       Fetching weather…
//     </p>
//     <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//   </div>
// );

// // ── UV badge ─────────────────────────────────────────────────────────────────
// const uvColor = (v) => {
//   if (v <= 2) return '#68D391';
//   if (v <= 5) return '#F6E05E';
//   if (v <= 7) return '#F6AD55';
//   if (v <= 10) return '#FC8181';
//   return '#B794F4';
// };

// const uvLabel = (v) => {
//   if (v <= 2) return 'Low';
//   if (v <= 5) return 'Moderate';
//   if (v <= 7) return 'High';
//   if (v <= 10) return 'Very High';
//   return 'Extreme';
// };

// // ── Mini stat bar ─────────────────────────────────────────────────────────────
// const StatBar = ({ value, max, color }) => (
//   <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', marginTop: 6 }}>
//     <div style={{
//       height: '100%', borderRadius: 2,
//       width: `${Math.min(100, (value / max) * 100)}%`,
//       background: color,
//       transition: 'width 0.6s ease',
//     }} />
//   </div>
// );

// // ── Wind direction compass ────────────────────────────────────────────────────
// const WindCompass = ({ deg, speed }) => {
//   const dirs = ['N','NE','E','SE','S','SW','W','NW'];
//   const label = dirs[Math.round(deg / 45) % 8];
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
//       <div style={{ position: 'relative', width: 100, height: 100 }}>
//         <svg width="100" height="100" viewBox="0 0 100 100">
//           <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
//           <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
//           {['N','E','S','W'].map((d, i) => {
//             const angle = i * 90 * Math.PI / 180;
//             const x = 50 + 42 * Math.sin(angle);
//             const y = 50 - 42 * Math.cos(angle);
//             return <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="#4A5568" fontSize="10" fontFamily="Inter">{d}</text>;
//           })}
//           {/* compass needle */}
//           <g transform={`rotate(${deg} 50 50)`}>
//             <polygon points="50,12 53,50 50,56 47,50" fill="#FC8181" opacity="0.9" />
//             <polygon points="50,88 53,50 50,44 47,50" fill="rgba(255,255,255,0.25)" />
//             <circle cx="50" cy="50" r="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
//           </g>
//         </svg>
//       </div>
//       <div style={{ textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 700, color: '#F7FAFC' }}>{speed} <span style={{ fontSize: 13, color: '#718096', fontWeight: 400 }}>m/s</span></div>
//         <div style={{ fontSize: 12, color: '#4A5568', marginTop: 2 }}>{label} · {deg}°</div>
//       </div>
//     </div>
//   );
// };

// // ────────────────────────────────────────────────────────────────────────────
// // VIEW: TODAY (main dashboard)
// // ────────────────────────────────────────────────────────────────────────────
// const TodayView = ({ weatherData, searchInput, setSearchInput, handleSearch }) => {
//   const current = weatherData?.weather?.[0];
//   const currentDay = weatherData?.daily?.[0];
//   const now = new Date();
//   const S = styles;

//   return (
//     <>
//       {/* search */}
//       <div style={S.searchRow}>
//         <div style={S.searchWrap}>
//           <span style={S.searchIcon}><SearchIcon /></span>
//           <input
//             style={S.searchInput}
//             placeholder="Search city…"
//             value={searchInput}
//             onChange={e => setSearchInput(e.target.value)}
//             onKeyDown={e => e.key === 'Enter' && handleSearch()}
//           />
//         </div>
//         <button onClick={handleSearch} style={S.searchBtn}>Search</button>
//       </div>

//       {/* hero card */}
//       <div style={S.heroCard}>
//         <div style={S.heroLeft}>
//           <div style={S.heroCity}>{weatherData.name}</div>
//           <div style={S.heroDate}>
//             {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
//           </div>
//           <div style={S.heroTemp}>
//             {Math.round(weatherData.main.temp)}<span style={S.heroDeg}>°C</span>
//           </div>
//           <div style={S.heroDesc}>{current.description}</div>
//           {currentDay && (
//             <div style={S.heroHighLow}>
//               <span style={{ color: '#FBD38D' }}>↑ {Math.round(currentDay.main.temp_max)}°</span>
//               <span style={{ marginLeft: 12, color: '#90CDF4' }}>↓ {Math.round(currentDay.main.temp_min)}°</span>
//             </div>
//           )}
//         </div>
//         <div style={S.heroRight}>
//           {getWeatherIcon(current.main, 120)}
//           <div style={S.heroWeatherLabel}>{current.main}</div>
//         </div>
//       </div>

//       {/* air conditions */}
//       <div style={S.sectionLabel}>AIR CONDITIONS</div>
//       <div style={S.condGrid}>
//         {[
//           { label: 'Real Feel', value: `${Math.round(weatherData.main.feels_like)}°`, icon: <ThermometerIcon />, color: '#F6AD55' },
//           { label: 'Humidity',  value: `${weatherData.main.humidity}%`,                icon: <DropletIcon />,     color: '#63B3ED' },
//           { label: 'Wind',      value: `${weatherData.wind.speed} m/s`,                icon: <WindMini />,        color: '#9AE6B4' },
//           { label: 'UV Index',  value: weatherData.uvIndex,                            icon: <SunriseSunset />,   color: uvColor(weatherData.uvIndex) },
//         ].map(({ label, value, icon, color }) => (
//           <div key={label} style={S.condCard}>
//             <div style={{ ...S.condIcon, color }}>{icon}</div>
//             <div style={S.condLabel}>{label}</div>
//             <div style={{ ...S.condValue, color }}>{value}</div>
//           </div>
//         ))}
//       </div>

//       {/* today's forecast */}
//       <div style={S.sectionLabel}>TODAY'S FORECAST</div>
//       <div style={S.hourlyRow}>
//         {weatherData.hourly.map((h, i) => (
//           <div key={h.dt} style={{ ...S.hourlyCard, ...(i === 0 ? S.hourlyCardActive : {}) }}>
//             <div style={S.hourlyTime}>
//               {i === 0 ? 'Now' : new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit', hour12: true })}
//             </div>
//             <div style={S.hourlyIcon}>{getWeatherIcon(h.weather[0].main, 40)}</div>
//             <div style={S.hourlyTemp}>{Math.round(h.main.temp)}°</div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// // ────────────────────────────────────────────────────────────────────────────
// // VIEW: MAP
// // ────────────────────────────────────────────────────────────────────────────
// const MapView = ({ weatherData }) => {
//   const lat = weatherData?.coord?.lat;
//   const lon = weatherData?.coord?.lon;
//   const city = weatherData?.name;
//   const temp = weatherData?.main?.temp;
//   const current = weatherData?.weather?.[0];

//   // Nearby cities using a simple offset grid (illustrative)
//   const nearby = [
//     { name: 'North', dlat: 0.8, dlon: 0, temp: temp - 1 },
//     { name: 'East',  dlat: 0, dlon: 1.2, temp: temp + 0.5 },
//     { name: 'South', dlat: -0.9, dlon: 0, temp: temp + 1.5 },
//     { name: 'West',  dlat: 0, dlon: -1.1, temp: temp - 0.5 },
//   ];

//   // Map bounds
//   const rangeKm = 150;
//   const degLat  = rangeKm / 111;
//   const degLon  = rangeKm / (111 * Math.cos(lat * Math.PI / 180));
//   const minLat  = lat - degLat, maxLat = lat + degLat;
//   const minLon  = lon - degLon, maxLon = lon + degLon;

//   const project = (plat, plon) => ({
//     x: ((plon - minLon) / (maxLon - minLon)) * 560 + 20,
//     y: ((maxLat - plat) / (maxLat - minLat)) * 340 + 20,
//   });

//   const center = project(lat, lon);

//   // Grid lines
//   const gridLines = [];
//   const gridStep = degLat / 3;
//   for (let i = 0; i <= 6; i++) {
//     const glat = minLat + i * (degLat * 2 / 6);
//     const p1 = project(glat, minLon), p2 = project(glat, maxLon);
//     gridLines.push(<line key={`h${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(99,179,237,0.07)" strokeWidth="1" />);
//   }
//   for (let i = 0; i <= 6; i++) {
//     const glon = minLon + i * (degLon * 2 / 6);
//     const p1 = project(minLat, glon), p2 = project(maxLat, glon);
//     gridLines.push(<line key={`v${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(99,179,237,0.07)" strokeWidth="1" />);
//   }

//   return (
//     <div>
//       <div style={{ marginBottom: 20 }}>
//         <div style={styles.sectionLabel}>WEATHER MAP</div>
//         <div style={{ fontSize: 13, color: '#4A5568' }}>
//           Centered on {city} · {lat?.toFixed(2)}°N, {lon?.toFixed(2)}°E
//         </div>
//       </div>

//       <div style={{
//         borderRadius: 20,
//         border: '1px solid rgba(255,255,255,0.08)',
//         overflow: 'hidden',
//         background: 'rgba(10,15,35,0.9)',
//         position: 'relative',
//       }}>
//         <svg width="100%" viewBox="0 0 600 380" style={{ display: 'block' }}>
//           {/* ocean bg */}
//           <rect width="600" height="380" fill="rgba(5,8,22,0.95)" />
//           {gridLines}

//           {/* radius circles */}
//           <circle cx={center.x} cy={center.y} r="60" fill="rgba(99,102,241,0.05)" stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="4 4" />
//           <circle cx={center.x} cy={center.y} r="120" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1" strokeDasharray="4 4" />

//           {/* nearby markers */}
//           {nearby.map((n) => {
//             const p = project(lat + n.dlat, lon + n.dlon);
//             return (
//               <g key={n.name}>
//                 <circle cx={p.x} cy={p.y} r="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
//                 <text x={p.x} y={p.y - 1} textAnchor="middle" dominantBaseline="central" fill="#CBD5E0" fontSize="10" fontFamily="Inter" fontWeight="600">
//                   {Math.round(n.temp)}°
//                 </text>
//                 <text x={p.x} y={p.y + 12} textAnchor="middle" fill="#4A5568" fontSize="8" fontFamily="Inter">{n.name}</text>
//               </g>
//             );
//           })}

//           {/* center — main city */}
//           <circle cx={center.x} cy={center.y} r="8" fill="rgba(99,102,241,0.3)" stroke="#818CF8" strokeWidth="2" />
//           <circle cx={center.x} cy={center.y} r="3" fill="#818CF8" />

//           {/* city label */}
//           <rect x={center.x - 40} y={center.y - 42} width="80" height="28" rx="8"
//             fill="rgba(13,17,38,0.9)" stroke="rgba(99,102,241,0.4)" strokeWidth="1" />
//           <text x={center.x} y={center.y - 32} textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="Inter" fontWeight="600">{city}</text>
//           <text x={center.x} y={center.y - 20} textAnchor="middle" fill="#818CF8" fontSize="10" fontFamily="Inter">{Math.round(temp)}°C</text>

//           {/* compass */}
//           <g transform="translate(548, 28)">
//             <circle cx="0" cy="0" r="20" fill="rgba(13,17,38,0.85)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
//             <text x="0" y="-8" textAnchor="middle" fill="#CBD5E0" fontSize="8" fontFamily="Inter" fontWeight="700">N</text>
//             <text x="0" y="12" textAnchor="middle" fill="#4A5568" fontSize="7" fontFamily="Inter">S</text>
//             <text x="-12" y="3" textAnchor="middle" fill="#4A5568" fontSize="7" fontFamily="Inter">W</text>
//             <text x="12" y="3" textAnchor="middle" fill="#4A5568" fontSize="7" fontFamily="Inter">E</text>
//             <polygon points="0,-14 2,-2 0,2 -2,-2" fill="#FC8181" />
//             <polygon points="0,14 2,2 0,-2 -2,2" fill="rgba(255,255,255,0.2)" />
//           </g>

//           {/* scale bar */}
//           <g transform="translate(20, 355)">
//             <line x1="0" y1="0" x2="60" y2="0" stroke="#4A5568" strokeWidth="1.5" />
//             <line x1="0" y1="-4" x2="0" y2="4" stroke="#4A5568" strokeWidth="1.5" />
//             <line x1="60" y1="-4" x2="60" y2="4" stroke="#4A5568" strokeWidth="1.5" />
//             <text x="30" y="-8" textAnchor="middle" fill="#4A5568" fontSize="9" fontFamily="Inter">50 km</text>
//           </g>
//         </svg>

//         {/* map legend */}
//         <div style={{
//           position: 'absolute', bottom: 12, right: 16,
//           background: 'rgba(13,17,38,0.85)',
//           border: '1px solid rgba(255,255,255,0.06)',
//           borderRadius: 10, padding: '8px 12px',
//           fontSize: 11, color: '#4A5568',
//           backdropFilter: 'blur(8px)',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
//             <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#818CF8', boxShadow: '0 0 6px #818CF8' }} />
//             <span style={{ color: '#CBD5E0' }}>{city}</span>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
//             <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.2)' }} />
//             <span>Nearby reference</span>
//           </div>
//         </div>
//       </div>

//       {/* coordinate info cards */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
//         {[
//           { label: 'Latitude',  value: `${lat?.toFixed(4)}°` },
//           { label: 'Longitude', value: `${lon?.toFixed(4)}°` },
//           { label: 'Timezone',  value: weatherData?.timezone ? `UTC${weatherData.timezone >= 0 ? '+' : ''}${weatherData.timezone / 3600}` : '—' },
//         ].map(({ label, value }) => (
//           <div key={label} style={styles.condCard}>
//             <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
//             <div style={{ fontSize: 18, fontWeight: 700, color: '#A0AEC0', marginTop: 4 }}>{value}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ────────────────────────────────────────────────────────────────────────────
// // VIEW: DETAILS / STATS
// // ────────────────────────────────────────────────────────────────────────────
// const DetailsView = ({ weatherData }) => {
//   const uv    = weatherData?.uvIndex ?? 0;
//   const wind  = weatherData?.wind;
//   const main  = weatherData?.main;
//   const sys   = weatherData?.sys;

//   const sunrise = sys ? new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : '—';
//   const sunset  = sys ? new Date(sys.sunset  * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : '—';

//   const dayMs   = sys ? (sys.sunset - sys.sunrise) * 1000 : 0;
//   const hours   = Math.floor(dayMs / 3600000);
//   const mins    = Math.floor((dayMs % 3600000) / 60000);

//   const now     = Date.now() / 1000;
//   const dayPct  = sys ? Math.max(0, Math.min(100, ((now - sys.sunrise) / (sys.sunset - sys.sunrise)) * 100)) : 50;

//   return (
//     <div>
//       <div style={styles.sectionLabel}>DETAILED STATS</div>

//       {/* Sun arc card */}
//       <div style={{ ...styles.condCard, marginBottom: 16, padding: '24px 20px' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//             <div style={{ color: '#F6AD55' }}><SunriseIcon /></div>
//             <span style={{ fontSize: 12, color: '#4A5568', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Daylight</span>
//           </div>
//           <span style={{ fontSize: 13, color: '#CBD5E0' }}>{hours}h {mins}m</span>
//         </div>

//         {/* Sun arc visualization */}
//         <svg width="100%" viewBox="0 0 300 90" style={{ display: 'block', overflow: 'visible' }}>
//           <defs>
//             <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
//               <stop offset="0%" stopColor="#F6AD55" stopOpacity="0.3" />
//               <stop offset="50%" stopColor="#FFCA28" stopOpacity="0.8" />
//               <stop offset="100%" stopColor="#F6AD55" stopOpacity="0.3" />
//             </linearGradient>
//           </defs>
//           {/* horizon */}
//           <line x1="20" y1="72" x2="280" y2="72" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
//           {/* arc path */}
//           <path d="M 30 72 Q 150 -20 270 72" fill="none" stroke="url(#arcGrad)" strokeWidth="2" strokeDasharray="4 3" />
//           {/* filled portion */}
//           <path d={`M 30 72 Q 150 -20 270 72`} fill="rgba(255,202,40,0.04)" />
//           {/* sun dot along the arc */}
//           {(() => {
//             const t = dayPct / 100;
//             const x = 30 + (270 - 30) * t;
//             const arcY = 72 + ((-20 - 72) * 4 * t * (1 - t));
//             return (
//               <g>
//                 <circle cx={x} cy={arcY} r="10" fill="rgba(255,202,40,0.15)" />
//                 <circle cx={x} cy={arcY} r="6" fill="#FFCA28" />
//                 <line x1={x} y1={arcY} x2={x} y2="72" stroke="rgba(255,202,40,0.2)" strokeWidth="1" strokeDasharray="2 2" />
//               </g>
//             );
//           })()}
//           {/* labels */}
//           <text x="20" y="86" fill="#4A5568" fontSize="10" fontFamily="Inter" textAnchor="middle">☀ {sunrise}</text>
//           <text x="280" y="86" fill="#4A5568" fontSize="10" fontFamily="Inter" textAnchor="middle">☀ {sunset}</text>
//         </svg>
//       </div>

//       {/* Wind section */}
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
//         <div style={{ ...styles.condCard, alignItems: 'center' }}>
//           <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, alignSelf: 'flex-start' }}>Wind</div>
//           <WindCompass deg={wind?.deg ?? 0} speed={wind?.speed ?? 0} />
//           {wind?.gust && (
//             <div style={{ fontSize: 12, color: '#4A5568', marginTop: 8 }}>
//               Gusts up to <span style={{ color: '#9AE6B4' }}>{wind.gust} m/s</span>
//             </div>
//           )}
//         </div>

//         <div style={{ ...styles.condCard, gap: 12 }}>
//           <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Atmosphere</div>
//           {[
//             { label: 'Pressure',   value: `${main?.pressure ?? '—'} hPa`, pct: ((main?.pressure - 950) / 100) * 100, color: '#B794F4' },
//             { label: 'Humidity',   value: `${main?.humidity ?? '—'}%`,     pct: main?.humidity ?? 0,                  color: '#63B3ED' },
//             { label: 'Visibility', value: `${((weatherData?.visibility ?? 10000) / 1000).toFixed(1)} km`, pct: (weatherData?.visibility ?? 10000) / 100, color: '#9AE6B4' },
//           ].map(({ label, value, pct, color }) => (
//             <div key={label}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
//                 <span style={{ fontSize: 12, color: '#4A5568' }}>{label}</span>
//                 <span style={{ fontSize: 12, fontWeight: 600, color }}>{value}</span>
//               </div>
//               <StatBar value={pct} max={100} color={color} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* UV index detail */}
//       <div style={{ ...styles.condCard, marginBottom: 16 }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
//           <span style={{ fontSize: 11, color: '#4A5568', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>UV Index</span>
//           <span style={{ fontSize: 12, fontWeight: 600, color: uvColor(uv), background: `${uvColor(uv)}22`, padding: '3px 10px', borderRadius: 20 }}>
//             {uvLabel(uv)}
//           </span>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//           <div style={{ fontSize: 48, fontWeight: 800, color: uvColor(uv), lineHeight: 1 }}>{uv}</div>
//           <div style={{ flex: 1 }}>
//             {/* UV scale bar */}
//             <div style={{ height: 8, borderRadius: 4, background: 'linear-gradient(to right, #68D391, #F6E05E, #F6AD55, #FC8181, #B794F4)', marginBottom: 4 }} />
//             <div style={{ position: 'relative', height: 12 }}>
//               <div style={{
//                 position: 'absolute',
//                 left: `${Math.min(95, (uv / 12) * 100)}%`,
//                 top: 0,
//                 width: 2, height: 8,
//                 background: '#fff',
//                 borderRadius: 1,
//                 transform: 'translateX(-50%)',
//               }} />
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#4A5568' }}>
//               <span>0</span><span>3</span><span>6</span><span>9</span><span>12+</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Temperature breakdown */}
//       <div style={styles.condCard}>
//         <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Temperature</div>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
//           {[
//             { label: 'Current',   value: main?.temp,       color: '#F7FAFC' },
//             { label: 'Feels Like',value: main?.feels_like, color: '#F6AD55' },
//             { label: 'Max',       value: weatherData?.daily?.[0]?.main?.temp_max, color: '#FBD38D' },
//             { label: 'Min',       value: weatherData?.daily?.[0]?.main?.temp_min, color: '#90CDF4' },
//           ].map(({ label, value, color }) => (
//             <div key={label} style={{ textAlign: 'center', padding: '10px 6px', borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
//               <div style={{ fontSize: 10, color: '#4A5568', marginBottom: 4 }}>{label}</div>
//               <div style={{ fontSize: 20, fontWeight: 700, color }}>{value != null ? `${Math.round(value)}°` : '—'}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ────────────────────────────────────────────────────────────────────────────
// // VIEW: SETTINGS
// // ────────────────────────────────────────────────────────────────────────────
// const SettingsView = ({ unit, setUnit, theme, setTheme, notifications, setNotifications, refreshInterval, setRefreshInterval }) => {
//   const S = styles;

//   const Toggle = ({ value, onChange, color = '#818CF8' }) => (
//     <button
//       onClick={() => onChange(!value)}
//       style={{
//         width: 44, height: 24, borderRadius: 12,
//         background: value ? color : 'rgba(255,255,255,0.1)',
//         border: 'none', cursor: 'pointer',
//         position: 'relative', transition: 'background 0.2s',
//         flexShrink: 0,
//       }}
//     >
//       <div style={{
//         position: 'absolute', top: 3, left: value ? 23 : 3,
//         width: 18, height: 18, borderRadius: '50%',
//         background: '#fff', transition: 'left 0.2s',
//         boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
//       }} />
//     </button>
//   );

//   const Row = ({ icon, label, sub, children }) => (
//     <div style={{
//       display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//       padding: '14px 16px',
//       borderBottom: '1px solid rgba(255,255,255,0.04)',
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//         <div style={{ color: '#718096', flexShrink: 0 }}>{icon}</div>
//         <div>
//           <div style={{ fontSize: 14, color: '#CBD5E0', fontWeight: 500 }}>{label}</div>
//           {sub && <div style={{ fontSize: 12, color: '#4A5568', marginTop: 1 }}>{sub}</div>}
//         </div>
//       </div>
//       {children}
//     </div>
//   );

//   const sectionStyle = {
//     background: 'rgba(255,255,255,0.03)',
//     border: '1px solid rgba(255,255,255,0.06)',
//     borderRadius: 16, overflow: 'hidden',
//     marginBottom: 20,
//   };

//   return (
//     <div>
//       <div style={S.sectionLabel}>PREFERENCES</div>

//       <div style={sectionStyle}>
//         <Row
//           icon={<ThermometerIcon />}
//           label="Temperature Unit"
//           sub="Display temperatures in Celsius or Fahrenheit"
//         >
//           <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
//             {['°C', '°F'].map(u => (
//               <button key={u} onClick={() => setUnit(u)} style={{
//                 padding: '6px 16px', fontSize: 13, fontWeight: 600,
//                 background: unit === u ? 'rgba(99,102,241,0.3)' : 'transparent',
//                 color: unit === u ? '#818CF8' : '#4A5568',
//                 border: 'none', cursor: 'pointer', transition: 'all 0.2s',
//                 fontFamily: 'Inter, sans-serif',
//               }}>{u}</button>
//             ))}
//           </div>
//         </Row>
//         <Row
//           icon={<PaletteIcon />}
//           label="Theme"
//           sub="Switch between dark and darker"
//         >
//           <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
//             {['Dark', 'Midnight'].map(t => (
//               <button key={t} onClick={() => setTheme(t)} style={{
//                 padding: '6px 14px', fontSize: 13, fontWeight: 600,
//                 background: theme === t ? 'rgba(99,102,241,0.3)' : 'transparent',
//                 color: theme === t ? '#818CF8' : '#4A5568',
//                 border: 'none', cursor: 'pointer', transition: 'all 0.2s',
//                 fontFamily: 'Inter, sans-serif',
//               }}>{t}</button>
//             ))}
//           </div>
//         </Row>
//       </div>

//       <div style={S.sectionLabel}>DATA & REFRESH</div>

//       <div style={sectionStyle}>
//         <Row
//           icon={<GaugeIcon />}
//           label="Auto Refresh"
//           sub={`Refresh data every ${refreshInterval} minutes`}
//         >
//           <select
//             value={refreshInterval}
//             onChange={e => setRefreshInterval(Number(e.target.value))}
//             style={{
//               background: 'rgba(255,255,255,0.06)',
//               border: '1px solid rgba(255,255,255,0.1)',
//               borderRadius: 8, color: '#CBD5E0',
//               padding: '6px 10px', fontSize: 13,
//               cursor: 'pointer', outline: 'none',
//               fontFamily: 'Inter, sans-serif',
//             }}
//           >
//             {[5, 10, 15, 30, 60].map(m => (
//               <option key={m} value={m} style={{ background: '#0d1126' }}>{m} min</option>
//             ))}
//           </select>
//         </Row>
//         <Row
//           icon={<BarChartIcon />}
//           label="Extended Forecast"
//           sub="Show 14-day forecast when available"
//         >
//           <Toggle value={notifications.extended} onChange={v => setNotifications(n => ({ ...n, extended: v }))} />
//         </Row>
//       </div>

//       <div style={S.sectionLabel}>ALERTS</div>

//       <div style={sectionStyle}>
//         {[
//           { key: 'severe',    label: 'Severe Weather Alerts', sub: 'Storms, extreme heat, heavy rain',     color: '#FC8181' },
//           { key: 'rain',      label: 'Rain Notifications',    sub: 'Alert before rain is expected',         color: '#63B3ED' },
//           { key: 'uv',        label: 'High UV Warnings',      sub: 'Warn when UV index exceeds 7',          color: '#F6AD55' },
//           { key: 'wind',      label: 'Strong Wind Alerts',    sub: 'Alert when gusts exceed 15 m/s',        color: '#9AE6B4' },
//         ].map(({ key, label, sub, color }) => (
//           <Row key={key} icon={<BellIcon />} label={label} sub={sub}>
//             <Toggle value={notifications[key]} onChange={v => setNotifications(n => ({ ...n, [key]: v }))} color={color} />
//           </Row>
//         ))}
//       </div>

//       <div style={S.sectionLabel}>ABOUT</div>

//       <div style={sectionStyle}>
//         <Row icon={<LocationIcon />} label="Data Sources" sub="OpenWeatherMap · Open-Meteo">
//           <span style={{ fontSize: 12, color: '#4A5568' }}>Free tier</span>
//         </Row>
//         <Row icon={<SunriseSunset />} label="App Version" sub="Weather Dashboard">
//           <span style={{ fontSize: 12, color: '#4A5568' }}>v1.0.0</span>
//         </Row>
//       </div>
//     </div>
//   );
// };

// // ── Main Component ────────────────────────────────────────────────────────────
// const WeatherDashboard = () => {
//   const [city, setCity] = useState("Phnom Penh");
//   const [searchInput, setSearchInput] = useState(city);
//   const [weatherData, setWeatherData] = useState({ daily: [], hourly: [] });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [activeNav, setActiveNav] = useState(0);

//   // Settings state
//   const [unit, setUnit] = useState('°C');
//   const [theme, setTheme] = useState('Dark');
//   const [refreshInterval, setRefreshInterval] = useState(15);
//   const [notifications, setNotifications] = useState({
//     severe: true, rain: false, uv: true, wind: false, extended: true,
//   });

//   const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

//   const fetchDailyAndUv = useCallback(async (lat, lon) => {
//     const res = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code,uv_index_max&hourly=uv_index&timezone=auto&forecast_days=7`
//     );
//     const data = await res.json();
//     if (!res.ok || data.error) throw new Error(data.reason || "Failed to fetch forecast.");
//     return data;
//   }, []);

//   const fetchForecast = useCallback(async (cityName, currentWeather) => {
//     const res = await fetch(
//       `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
//     );
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to fetch hourly forecast.");

//     const now = Date.now();
//     const hourlyToday = [
//       { dt: Math.floor(now / 1000), main: { temp: currentWeather.main.temp }, weather: currentWeather.weather },
//       ...data.list.filter(item => {
//         const t = item.dt * 1000;
//         return new Date(t).toLocaleDateString() === new Date(now).toLocaleDateString() && t > now;
//       }),
//     ];

//     const uv = await fetchDailyAndUv(currentWeather.coord.lat, currentWeather.coord.lon);
//     const currentUvIndex = uv?.hourly?.uv_index?.[0] || "N/A";

//     const todayForecast = uv.daily.time.map((t, i) => ({
//       dt: new Date(t).getTime() / 1000,
//       main: {
//         temp_max: uv.daily.temperature_2m_max[i],
//         temp_min: uv.daily.temperature_2m_min[i],
//       },
//       weather: [{ main: "Clouds" }],
//     }));
//     todayForecast[0].main.temp_max = Math.max(todayForecast[0].main.temp_max, currentWeather.main.temp);
//     todayForecast[0].main.temp_min = Math.min(todayForecast[0].main.temp_min, currentWeather.main.temp);

//     setWeatherData({ ...currentWeather, daily: todayForecast, hourly: hourlyToday, uvIndex: currentUvIndex });
//     setLoading(false);
//   }, [apiKey, fetchDailyAndUv]);

//   const fetchWeather = useCallback(async (cityName) => {
//     if (!cityName) return;
//     setLoading(true); setError(null);
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
//       );
//       const data = await res.json();
//       if (data.cod !== 200) throw new Error("City not found.");
//       fetchForecast(cityName, data);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   }, [apiKey, fetchForecast]);

//   useEffect(() => { fetchWeather(city); }, [city]);

//   // Auto-refresh
//   useEffect(() => {
//     const id = setInterval(() => fetchWeather(city), refreshInterval * 60 * 1000);
//     return () => clearInterval(id);
//   }, [city, refreshInterval, fetchWeather]);

//   const handleSearch = () => { if (searchInput.trim()) setCity(searchInput.trim()); };

//   const current = weatherData?.weather?.[0];
//   const currentDay = weatherData?.daily?.[0];

//   if (loading) return <Spinner />;
//   if (error) return (
//     <div style={{ minHeight: '100vh', background: '#050816', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div style={{ textAlign: 'center', color: '#FC8181' }}>
//         <p style={{ fontSize: 18 }}>⚠ {error}</p>
//         <button onClick={() => fetchWeather(city)} style={{ marginTop: 16, padding: '8px 20px', borderRadius: 8, background: '#2D3748', color: '#fff', border: 'none', cursor: 'pointer' }}>Retry</button>
//       </div>
//     </div>
//   );
//   if (!current) return null;

//   const S = styles;

//   const navLabels = ['Today', 'Map', 'Details', 'Settings'];
//   const navIcons  = [<SunriseSunset />, <MapIcon />, <EyeIcon />, <SettingsIcon />];

//   return (
//     <div style={{ ...S.root, background: theme === 'Midnight' ? '#020510' : '#050816' }}>
//       <div style={S.blob1} />
//       <div style={S.blob2} />

//       <div style={S.layout}>
//         {/* ── Sidebar ── */}
//         <aside style={S.sidebar}>
//           <div style={S.logo}>
//             <WindMini />
//           </div>
//           <nav style={S.nav}>
//             {navIcons.map((icon, i) => (
//               <button
//                 key={i}
//                 onClick={() => setActiveNav(i)}
//                 title={navLabels[i]}
//                 style={{ ...S.navBtn, ...(activeNav === i ? S.navBtnActive : {}) }}
//               >
//                 {icon}
//               </button>
//             ))}
//           </nav>
//           {/* active indicator label */}
//           <div style={{ fontSize: 9, color: '#4A5568', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 'auto' }}>
//             {navLabels[activeNav]}
//           </div>
//         </aside>

//         {/* ── Main ── */}
//         <main style={S.main}>
//           {activeNav === 0 && (
//             <TodayView
//               weatherData={weatherData}
//               searchInput={searchInput}
//               setSearchInput={setSearchInput}
//               handleSearch={handleSearch}
//             />
//           )}
//           {activeNav === 1 && <MapView weatherData={weatherData} />}
//           {activeNav === 2 && <DetailsView weatherData={weatherData} />}
//           {activeNav === 3 && (
//             <SettingsView
//               unit={unit} setUnit={setUnit}
//               theme={theme} setTheme={setTheme}
//               notifications={notifications} setNotifications={setNotifications}
//               refreshInterval={refreshInterval} setRefreshInterval={setRefreshInterval}
//             />
//           )}
//         </main>

//         {/* ── 7-day sidebar ── */}
//         <aside style={S.forecastSidebar}>
//           <div style={S.sectionLabel}>7-DAY FORECAST</div>
//           <div style={S.forecastList}>
//             {weatherData.daily.map((d, i) => (
//               <div key={d.dt} style={{ ...S.forecastRow, ...(i === 0 ? S.forecastRowToday : {}) }}>
//                 <span style={S.forecastDay}>
//                   {i === 0 ? 'Today' : new Date(d.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
//                 </span>
//                 <span style={S.forecastIcon}>{getWeatherIcon(d.weather[0].main, 32)}</span>
//                 <span style={S.forecastTemps}>
//                   <span style={{ color: '#FBD38D' }}>{Math.round(d.main.temp_max)}°</span>
//                   <span style={{ color: '#718096', margin: '0 4px' }}>/</span>
//                   <span style={{ color: '#90CDF4' }}>{Math.round(d.main.temp_min)}°</span>
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div style={{ marginTop: 24 }}>
//             <div style={S.sectionLabel}>MORE DETAILS</div>
//             <div style={S.detailCard}>
//               {[
//                 { label: 'Pressure',    value: `${weatherData.main.pressure} hPa` },
//                 { label: 'Visibility',  value: `${((weatherData.visibility || 10000) / 1000).toFixed(1)} km` },
//                 { label: 'Cloud Cover', value: `${weatherData.clouds?.all || 0}%` },
//               ].map(({ label, value }) => (
//                 <div key={label} style={S.detailRow}>
//                   <span style={S.detailLabel}>{label}</span>
//                   <span style={S.detailValue}>{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Quick city search in sidebar */}
//           <div style={{ marginTop: 24 }}>
//             <div style={S.sectionLabel}>QUICK CITIES</div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//               {['Phnom Penh', 'Siem Reap', 'Battambang', 'Kampot'].map(c => (
//                 <button
//                   key={c}
//                   onClick={() => { setCity(c); setSearchInput(c); setActiveNav(0); }}
//                   style={{
//                     padding: '8px 14px', borderRadius: 10, textAlign: 'left',
//                     background: city === c ? 'rgba(99,102,241,0.15)' : 'transparent',
//                     border: city === c ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
//                     color: city === c ? '#818CF8' : '#4A5568',
//                     cursor: 'pointer', fontSize: 13, fontWeight: 500,
//                     transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
//                   }}
//                 >
//                   <LocationIcon />{' '}{c}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// // ── Styles ────────────────────────────────────────────────────────────────────
// const styles = {
//   root: {
//     minHeight: '100vh',
//     background: '#050816',
//     color: '#E2E8F0',
//     fontFamily: "'Inter', sans-serif",
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   blob1: {
//     position: 'fixed', top: '-120px', right: '-120px',
//     width: 500, height: 500, borderRadius: '50%',
//     background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
//     pointerEvents: 'none',
//   },
//   blob2: {
//     position: 'fixed', bottom: '-80px', left: '-80px',
//     width: 400, height: 400, borderRadius: '50%',
//     background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)',
//     pointerEvents: 'none',
//   },
//   layout: {
//     display: 'flex', flexDirection: 'row',
//     minHeight: '100vh', gap: 0,
//   },
//   sidebar: {
//     width: 72,
//     background: 'rgba(13,17,38,0.9)',
//     borderRight: '1px solid rgba(255,255,255,0.06)',
//     display: 'flex', flexDirection: 'column',
//     alignItems: 'center', padding: '24px 0',
//     gap: 32, flexShrink: 0,
//     backdropFilter: 'blur(12px)',
//   },
//   logo: {
//     width: 44, height: 44, borderRadius: 12,
//     background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     color: '#fff', boxShadow: '0 4px 16px rgba(79,70,229,0.4)',
//   },
//   nav: { display: 'flex', flexDirection: 'column', gap: 8, flex: 1 },
//   navBtn: {
//     width: 44, height: 44, borderRadius: 12,
//     background: 'transparent', border: 'none',
//     color: '#4A5568', cursor: 'pointer',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     transition: 'all 0.2s',
//   },
//   navBtnActive: {
//     background: 'rgba(99,102,241,0.15)',
//     color: '#818CF8',
//   },
//   main: {
//     flex: 1, padding: '28px 24px',
//     overflowY: 'auto', minWidth: 0,
//   },
//   searchRow: {
//     display: 'flex', gap: 10, marginBottom: 24,
//   },
//   searchWrap: {
//     flex: 1, position: 'relative',
//     display: 'flex', alignItems: 'center',
//   },
//   searchIcon: {
//     position: 'absolute', left: 14,
//     color: '#4A5568', pointerEvents: 'none',
//   },
//   searchInput: {
//     width: '100%', padding: '12px 16px 12px 44px',
//     borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)',
//     background: 'rgba(255,255,255,0.04)',
//     color: '#E2E8F0', fontSize: 14,
//     outline: 'none', backdropFilter: 'blur(8px)',
//     fontFamily: 'Inter, sans-serif',
//   },
//   searchBtn: {
//     padding: '12px 22px', borderRadius: 14,
//     background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
//     color: '#fff', border: 'none', cursor: 'pointer',
//     fontSize: 14, fontWeight: 600, letterSpacing: '0.02em',
//     boxShadow: '0 4px 16px rgba(79,70,229,0.35)',
//     transition: 'transform 0.15s, box-shadow 0.15s',
//     fontFamily: 'Inter, sans-serif',
//   },
//   heroCard: {
//     background: 'linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(56,189,248,0.08) 100%)',
//     border: '1px solid rgba(255,255,255,0.08)',
//     borderRadius: 24, padding: '32px 36px',
//     display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//     marginBottom: 28, backdropFilter: 'blur(16px)',
//     boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
//   },
//   heroLeft: { flex: 1 },
//   heroCity: { fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', color: '#F7FAFC' },
//   heroDate: { fontSize: 13, color: '#718096', marginTop: 4, marginBottom: 16 },
//   heroTemp: { fontSize: 80, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', color: '#F7FAFC' },
//   heroDeg: { fontSize: 32, fontWeight: 300, verticalAlign: 'super', color: '#A0AEC0' },
//   heroDesc: { fontSize: 16, color: '#A0AEC0', marginTop: 8, textTransform: 'capitalize' },
//   heroHighLow: { marginTop: 10, fontSize: 15, fontWeight: 500 },
//   heroRight: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
//   heroWeatherLabel: { fontSize: 14, color: '#A0AEC0', fontWeight: 500, letterSpacing: '0.04em' },
//   sectionLabel: {
//     fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
//     color: '#4A5568', textTransform: 'uppercase', marginBottom: 12,
//   },
//   condGrid: {
//     display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
//     gap: 12, marginBottom: 28,
//   },
//   condCard: {
//     background: 'rgba(255,255,255,0.03)',
//     border: '1px solid rgba(255,255,255,0.06)',
//     borderRadius: 16, padding: '18px 16px',
//     display: 'flex', flexDirection: 'column', gap: 8,
//     backdropFilter: 'blur(8px)',
//   },
//   condIcon: { display: 'flex' },
//   condLabel: { fontSize: 12, color: '#4A5568', fontWeight: 500, letterSpacing: '0.03em' },
//   condValue: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' },
//   hourlyRow: {
//     display: 'flex', gap: 10, overflowX: 'auto',
//     paddingBottom: 6, marginBottom: 4,
//   },
//   hourlyCard: {
//     minWidth: 80, borderRadius: 16,
//     background: 'rgba(255,255,255,0.03)',
//     border: '1px solid rgba(255,255,255,0.06)',
//     padding: '14px 12px',
//     display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
//     flexShrink: 0,
//   },
//   hourlyCardActive: {
//     background: 'linear-gradient(135deg, rgba(79,70,229,0.25), rgba(99,102,241,0.15))',
//     border: '1px solid rgba(99,102,241,0.35)',
//   },
//   hourlyTime: { fontSize: 12, color: '#718096', fontWeight: 500 },
//   hourlyIcon: { lineHeight: 0 },
//   hourlyTemp: { fontSize: 16, fontWeight: 700, color: '#F7FAFC' },
//   forecastSidebar: {
//     width: 280, flexShrink: 0,
//     background: 'rgba(13,17,38,0.85)',
//     borderLeft: '1px solid rgba(255,255,255,0.06)',
//     padding: '28px 20px',
//     backdropFilter: 'blur(12px)',
//     overflowY: 'auto',
//   },
//   forecastList: {
//     display: 'flex', flexDirection: 'column', gap: 4,
//     marginBottom: 8,
//   },
//   forecastRow: {
//     display: 'flex', alignItems: 'center',
//     padding: '10px 14px', borderRadius: 12,
//     transition: 'background 0.2s',
//   },
//   forecastRowToday: {
//     background: 'rgba(99,102,241,0.12)',
//     border: '1px solid rgba(99,102,241,0.2)',
//   },
//   forecastDay: { flex: 1, fontSize: 13, fontWeight: 500, color: '#CBD5E0' },
//   forecastIcon: { marginRight: 8, lineHeight: 0 },
//   forecastTemps: { fontSize: 13, fontWeight: 600 },
//   detailCard: {
//     background: 'rgba(255,255,255,0.03)',
//     border: '1px solid rgba(255,255,255,0.06)',
//     borderRadius: 16, padding: '4px 0',
//   },
//   detailRow: {
//     display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//     padding: '10px 16px',
//     borderBottom: '1px solid rgba(255,255,255,0.04)',
//   },
//   detailLabel: { fontSize: 13, color: '#4A5568' },
//   detailValue: { fontSize: 13, fontWeight: 600, color: '#CBD5E0' },
// };

// export default WeatherDashboard;