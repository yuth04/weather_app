// ── Loading Spinner ───────────────────────────────────────────────────────────
export const Spinner = () => (
  <div style={{
    position: 'fixed', inset: 0,
    background: 'rgba(5,8,22,0.85)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 100, backdropFilter: 'blur(6px)',
  }}>
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      border: '3px solid rgba(99,179,237,0.15)',
      borderTopColor: '#63B3ED',
      animation: 'spin 0.9s linear infinite',
    }} />
    <p style={{ color: '#A0AEC0', marginTop: 16, fontSize: 14, letterSpacing: '0.08em' }}>
      Fetching weather…
    </p>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

// ── UV helpers ────────────────────────────────────────────────────────────────
export const uvColor = (v) => {
  if (v <= 2)  return '#68D391';
  if (v <= 5)  return '#F6E05E';
  if (v <= 7)  return '#F6AD55';
  if (v <= 10) return '#FC8181';
  return '#B794F4';
};

export const uvLabel = (v) => {
  if (v <= 2)  return 'Low';
  if (v <= 5)  return 'Moderate';
  if (v <= 7)  return 'High';
  if (v <= 10) return 'Very High';
  return 'Extreme';
};

// ── Mini stat bar ─────────────────────────────────────────────────────────────
export const StatBar = ({ value, max, color }) => (
  <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.07)', overflow: 'hidden', marginTop: 6 }}>
    <div style={{
      height: '100%', borderRadius: 2,
      width: `${Math.min(100, (value / max) * 100)}%`,
      background: color,
      transition: 'width 0.6s ease',
    }} />
  </div>
);

// ── Wind direction compass ────────────────────────────────────────────────────
export const WindCompass = ({ deg, speed }) => {
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  const label = dirs[Math.round(deg / 45) % 8];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          {['N','E','S','W'].map((d, i) => {
            const angle = i * 90 * Math.PI / 180;
            const x = 50 + 42 * Math.sin(angle);
            const y = 50 - 42 * Math.cos(angle);
            return (
              <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="central"
                fill="#4A5568" fontSize="10" fontFamily="Inter">{d}</text>
            );
          })}
          {/* compass needle */}
          <g transform={`rotate(${deg} 50 50)`}>
            <polygon points="50,12 53,50 50,56 47,50" fill="#FC8181" opacity="0.9" />
            <polygon points="50,88 53,50 50,44 47,50" fill="rgba(255,255,255,0.25)" />
            <circle cx="50" cy="50" r="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </g>
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#F7FAFC' }}>
          {speed} <span style={{ fontSize: 13, color: '#718096', fontWeight: 400 }}>m/s</span>
        </div>
        <div style={{ fontSize: 12, color: '#4A5568', marginTop: 2 }}>{label} · {deg}°</div>
      </div>
    </div>
  );
};