// ── Beautiful SVG Weather Icons ──────────────────────────────────────────────
export const SunIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="100%" stopColor="#FFAB00" />
      </radialGradient>
      <filter id="sunGlow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <g filter="url(#sunGlow)">
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <line key={i}
          x1="32" y1="8" x2="32" y2="14"
          stroke="#FFCA28" strokeWidth="2.5" strokeLinecap="round"
          transform={`rotate(${deg} 32 32)`}
          style={{ animation: `sunRayPulse 2s ease-in-out ${i*0.25}s infinite alternate` }}
        />
      ))}
      <circle cx="32" cy="32" r="11" fill="url(#sunCore)" />
    </g>
    <style>{`@keyframes sunRayPulse{from{opacity:0.5}to{opacity:1}}`}</style>
  </svg>
);

export const CloudIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E0E0E0" />
        <stop offset="100%" stopColor="#BDBDBD" />
      </linearGradient>
      <filter id="cloudShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#00000030" />
      </filter>
    </defs>
    <g filter="url(#cloudShadow)" style={{ animation: 'cloudBob 3s ease-in-out infinite' }}>
      <ellipse cx="32" cy="36" rx="20" ry="10" fill="url(#cloudGrad)" />
      <circle cx="24" cy="32" r="9" fill="url(#cloudGrad)" />
      <circle cx="36" cy="28" r="11" fill="url(#cloudGrad)" />
    </g>
    <style>{`@keyframes cloudBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
  </svg>
);

export const RainIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="rainCloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#90A4AE" />
        <stop offset="100%" stopColor="#607D8B" />
      </linearGradient>
    </defs>
    <g style={{ animation: 'cloudBob 3s ease-in-out infinite' }}>
      <ellipse cx="32" cy="28" rx="18" ry="9" fill="url(#rainCloud)" />
      <circle cx="22" cy="25" r="8" fill="url(#rainCloud)" />
      <circle cx="34" cy="21" r="10" fill="url(#rainCloud)" />
    </g>
    {[[24,40,0],[32,42,0.2],[20,46,0.4],[36,44,0.1],[28,48,0.3]].map(([x,y,delay],i)=>(
      <line key={i} x1={x} y1={y} x2={x-3} y2={y+7}
        stroke="#64B5F6" strokeWidth="2" strokeLinecap="round"
        style={{ animation: `rainDrop 1.2s ease-in ${delay}s infinite` }}
      />
    ))}
    <style>{`
      @keyframes cloudBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
      @keyframes rainDrop{0%{opacity:0;transform:translateY(-4px)}50%{opacity:1}100%{opacity:0;transform:translateY(6px)}}
    `}</style>
  </svg>
);

export const ThunderIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="stormCloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#546E7A" />
        <stop offset="100%" stopColor="#37474F" />
      </linearGradient>
      <filter id="boltGlow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <ellipse cx="32" cy="24" rx="18" ry="9" fill="url(#stormCloud)" />
    <circle cx="22" cy="21" r="8" fill="url(#stormCloud)" />
    <circle cx="34" cy="17" r="10" fill="url(#stormCloud)" />
    <g filter="url(#boltGlow)" style={{ animation: 'boltFlash 2s ease-in-out infinite' }}>
      <polygon points="34,32 28,44 33,44 30,54 40,38 34,38" fill="#FFD600" />
    </g>
    <style>{`@keyframes boltFlash{0%,90%,100%{opacity:1}95%{opacity:0.2}}`}</style>
  </svg>
);

export const PartlyCloudyIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="pcSun" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="100%" stopColor="#FFAB00" />
      </radialGradient>
      <linearGradient id="pcCloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F5F5F5" />
        <stop offset="100%" stopColor="#E0E0E0" />
      </linearGradient>
      <filter id="pcSunGlow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <g filter="url(#pcSunGlow)">
      <circle cx="22" cy="24" r="10" fill="url(#pcSun)" />
      {[0,60,120,180,240,300].map((deg,i)=>(
        <line key={i} x1="22" y1="10" x2="22" y2="14"
          stroke="#FFCA28" strokeWidth="2" strokeLinecap="round"
          transform={`rotate(${deg} 22 24)`} />
      ))}
    </g>
    <g style={{ animation: 'cloudBob 3s ease-in-out infinite' }}>
      <ellipse cx="38" cy="40" rx="17" ry="9" fill="url(#pcCloud)" />
      <circle cx="28" cy="36" r="8" fill="url(#pcCloud)" />
      <circle cx="40" cy="32" r="10" fill="url(#pcCloud)" />
    </g>
    <style>{`@keyframes cloudBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
  </svg>
);

export const WindIcon2 = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {[
      { y: 22, w: 32, r: 8 },
      { y: 32, w: 40, r: 0 },
      { y: 42, w: 28, r: 6 },
    ].map(({ y, w, r }, i) => (
      <g key={i} style={{ animation: `windLine 2s ease-in-out ${i * 0.3}s infinite` }}>
        <line x1="10" y1={y} x2={10 + w} y2={y}
          stroke="#82B1FF" strokeWidth="2.5" strokeLinecap="round" />
        {r > 0 && (
          <path d={`M ${10+w} ${y} Q ${10+w+r} ${y} ${10+w+r} ${y + (i===0?-r:r)}`}
            stroke="#82B1FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
      </g>
    ))}
    <style>{`@keyframes windLine{0%,100%{transform:translateX(0);opacity:1}50%{transform:translateX(4px);opacity:0.6}}`}</style>
  </svg>
);

export const getWeatherIcon = (main, size = 56) => {
  switch (main) {
    case "Clear":        return <SunIcon size={size} />;
    case "Clouds":       return <CloudIcon size={size} />;
    case "Rain":
    case "Drizzle":      return <RainIcon size={size} />;
    case "Thunderstorm": return <ThunderIcon size={size} />;
    case "Wind":         return <WindIcon2 size={size} />;
    default:             return <PartlyCloudyIcon size={size} />;
  }
};