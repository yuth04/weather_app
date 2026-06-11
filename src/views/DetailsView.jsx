import {
  StatBar,
  WindCompass,
  uvColor,
  uvLabel,
} from "../components/ui/SharedUI";
import { SunriseIcon } from "../components/weather-icons/Icons";
import { styles } from "../styles/dashboard.styles";

const DetailsView = ({ weatherData, Isdark }) => {
  const uv = weatherData?.uvIndex ?? 0;
  const wind = weatherData?.wind;
  const main = weatherData?.main;
  const sys = weatherData?.sys;

  const sunrise = sys
    ? new Date(sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "—";
  const sunset = sys
    ? new Date(sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "—";

  const dayMs = sys ? (sys.sunset - sys.sunrise) * 1000 : 0;
  const hours = Math.floor(dayMs / 3600000);
  const mins = Math.floor((dayMs % 3600000) / 60000);

  const now = Date.now() / 1000;
  const dayPct = sys
    ? Math.max(
        0,
        Math.min(100, ((now - sys.sunrise) / (sys.sunset - sys.sunrise)) * 100),
      )
    : 50;

  return (
    <div>
      <div style={styles.sectionLabel}>DETAILED STATS</div>

      {/* Sun arc card */}
      <div
        style={{ ...styles.condCard, marginBottom: 16, padding: "24px 20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ color: "#F6AD55" }}>
              <SunriseIcon />
            </div>
            <span
              style={{
                fontSize: 12,
                color: "#4A5568",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Daylight
            </span>
          </div>
          <span style={{ fontSize: 13, color: "#CBD5E0" }}>
            {hours}h {mins}m
          </span>
        </div>

        <svg
          width="100%"
          viewBox="0 0 300 90"
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F6AD55" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FFCA28" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F6AD55" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <line
            x1="20"
            y1="72"
            x2="280"
            y2="72"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <path
            d="M 30 72 Q 150 -20 270 72"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <path d="M 30 72 Q 150 -20 270 72" fill="rgba(255,202,40,0.04)" />
          {(() => {
            const t = dayPct / 100;
            const x = 30 + (270 - 30) * t;
            const arcY = 72 + (-20 - 72) * 4 * t * (1 - t);
            return (
              <g>
                <circle cx={x} cy={arcY} r="10" fill="rgba(255,202,40,0.15)" />
                <circle cx={x} cy={arcY} r="6" fill="#FFCA28" />
                <line
                  x1={x}
                  y1={arcY}
                  x2={x}
                  y2="72"
                  stroke="rgba(255,202,40,0.2)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </g>
            );
          })()}
          <text
            x="20"
            y="86"
            fill="#4A5568"
            fontSize="10"
            fontFamily="Inter"
            textAnchor="middle"
          >
            ☀ {sunrise}
          </text>
          <text
            x="280"
            y="86"
            fill="#4A5568"
            fontSize="10"
            fontFamily="Inter"
            textAnchor="middle"
          >
            ☀ {sunset}
          </text>
        </svg>
      </div>

      {/* Wind + Atmosphere */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div style={{ ...styles.condCard, alignItems: "center" }}>
          <div
            style={{
              fontSize: 11,
              color: "#4A5568",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 12,
              alignSelf: "flex-start",
            }}
          >
            Wind
          </div>
          <WindCompass deg={wind?.deg ?? 0} speed={wind?.speed ?? 0} />
          {wind?.gust && (
            <div style={{ fontSize: 12, color: "#4A5568", marginTop: 8 }}>
              Gusts up to{" "}
              <span style={{ color: "#9AE6B4" }}>{wind.gust} m/s</span>
            </div>
          )}
        </div>

        <div style={{ ...styles.condCard, gap: 12 }}>
          <div
            style={{
              fontSize: 11,
              color: "#4A5568",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Atmosphere
          </div>
          {[
            {
              label: "Pressure",
              value: `${main?.pressure ?? "—"} hPa`,
              pct: ((main?.pressure - 950) / 100) * 100,
              color: "#B794F4",
            },
            {
              label: "Humidity",
              value: `${main?.humidity ?? "—"}%`,
              pct: main?.humidity ?? 0,
              color: "#63B3ED",
            },
            {
              label: "Visibility",
              value: `${((weatherData?.visibility ?? 10000) / 1000).toFixed(1)} km`,
              pct: (weatherData?.visibility ?? 10000) / 100,
              color: "#9AE6B4",
            },
          ].map(({ label, value, pct, color }) => (
            <div key={label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                <span style={{ fontSize: 12, color: "#4A5568" }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color }}>
                  {value}
                </span>
              </div>
              <StatBar value={pct} max={100} color={color} />
            </div>
          ))}
        </div>
      </div>

      {/* UV index */}
      <div style={{ ...styles.condCard, marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "#4A5568",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            UV Index
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: uvColor(uv),
              background: `${uvColor(uv)}22`,
              padding: "3px 10px",
              borderRadius: 20,
            }}
          >
            {uvLabel(uv)}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: uvColor(uv),
              lineHeight: 1,
            }}
          >
            {uv}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 8,
                borderRadius: 4,
                background:
                  "linear-gradient(to right, #68D391, #F6E05E, #F6AD55, #FC8181, #B794F4)",
                marginBottom: 4,
              }}
            />
            <div style={{ position: "relative", height: 12 }}>
              <div
                style={{
                  position: "absolute",
                  left: `${Math.min(95, (uv / 12) * 100)}%`,
                  top: 0,
                  width: 2,
                  height: 8,
                  background: "#fff",
                  borderRadius: 1,
                  transform: "translateX(-50%)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10,
                color: "#4A5568",
              }}
            >
              <span>0</span>
              <span>3</span>
              <span>6</span>
              <span>9</span>
              <span>12+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Temperature breakdown */}
      <div style={styles.condCard}>
        <div
          style={{
            fontSize: 11,
            color: "#4A5568",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Temperature
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
          }}
        >
          {[
            { label: "Current", value: main?.temp, color: "#F7FAFC" },
            { label: "Feels Like", value: main?.feels_like, color: "#F6AD55" },
            {
              label: "Max",
              value: weatherData?.daily?.[0]?.main?.temp_max,
              color: "#FBD38D",
            },
            {
              label: "Min",
              value: weatherData?.daily?.[0]?.main?.temp_min,
              color: "#90CDF4",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                padding: "10px 6px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div style={{ fontSize: 10, color: "#4A5568", marginBottom: 4 }}>
                {label}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color }}>
                {value != null ? `${Math.round(value)}°` : "—"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
