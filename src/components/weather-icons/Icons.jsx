// ── Mini SVG Icon Primitive ───────────────────────────────────────────────────
export const Icon = ({ d, size = 22, color = "currentColor", fill = "none", strokeW = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

// ── Mini Icons ────────────────────────────────────────────────────────────────
export const WindMini        = () => <Icon d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />;
export const DropletIcon     = () => <Icon d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="#60A5FA" color="#3B82F6" />;
export const ThermometerIcon = () => <Icon d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />;
export const EyeIcon         = () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;
export const SearchIcon      = () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
export const MapIcon         = () => <Icon d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />;
export const SettingsIcon    = () => <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />;
export const SunriseSunset   = () => <Icon d="M12 2v2M4.22 4.22l1.42 1.42M2 12h2m16 0h2M19.78 4.22l-1.42 1.42M12 6a6 6 0 0 1 6 6H6a6 6 0 0 1 6-6zM3 20h18" />;

// ── Extra icons for detail / settings views ───────────────────────────────────
export const LocationIcon    = () => <Icon d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="rgba(99,179,237,0.3)" color="#63B3ED" />;
export const GaugeIcon       = () => <Icon d="M12 2a10 10 0 1 0 10 10M12 6v6l4 2" />;
export const SunriseIcon     = () => <Icon d="M17 18a5 5 0 0 0-10 0M12 2v3M4.22 7.22l2.12 2.12M1 14h3M20 14h3M19.78 7.22l-2.12 2.12M5 18H3M21 18h-2" />;
export const MoonIcon        = () => <Icon d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
export const BarChartIcon    = () => <Icon d="M12 20V10M18 20V4M6 20v-4" />;
export const BellIcon        = () => <Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />;
export const PaletteIcon     = () => <Icon d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.5c0-.55-.2-1.05-.53-1.43a.5.5 0 0 1 .36-.86H15c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zM7 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3-5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />;