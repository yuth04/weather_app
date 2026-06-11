import React, { useState, useEffect } from "react";
import WeatherDashboard from "./components/WeatherDashboard";

// ── CENTRAL THEME COLOR SYSTEM MAP ───────────────────────────────────────────
const THEMES = {
  Light: {
    bg: "#F8FAFC",
    surface: "#FFFFFF",
    headerBg: "#FFFFFF",
    textPrimary: "#1E293B",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",
    border: "rgba(0, 0, 0, 0.06)",
    activeNavBg: "rgba(79, 70, 229, 0.1)",
    activeNavText: "#4F46E5",
    overlayBg: "rgba(0, 0, 0, 0.25)"
  },
  Dark: {
    bg: "#0F172A",
    surface: "rgba(255, 255, 255, 0.03)",
    headerBg: "#0B1220",
    textPrimary: "#CBD5E0",
    textSecondary: "#718096",
    textMuted: "#4A5568",
    border: "rgba(255, 255, 255, 0.06)",
    activeNavBg: "rgba(99, 102, 241, 0.15)",
    activeNavText: "#818CF8",
    overlayBg: "rgba(0, 0, 0, 0.5)"
  },
  Midnight: {
    bg: "#020617",
    surface: "rgba(255, 255, 255, 0.015)",
    headerBg: "#000000",
    textPrimary: "#E2E8F0",
    textSecondary: "#94A3B8",
    textMuted: "#334155",
    border: "rgba(255, 255, 255, 0.04)",
    activeNavBg: "rgba(124, 58, 237, 0.15)",
    activeNavText: "#A78BFA",
    overlayBg: "rgba(0, 0, 0, 0.7)"
  }
};

function App() {
  // 1. Core initialization checks storage before processing fallbacks
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("dashboard-theme") || "Dark";
  });

  // 2. Keeps browser localStorage synced up when state updates
  useEffect(() => {
    localStorage.setItem("dashboard-theme", theme);
  }, [theme]);

  const currentTheme = THEMES[theme] || THEMES.Dark;

  return (
    <div 
      style={{ 
        minHeight: "100vh", 
        width: "100%",
        background: currentTheme.bg,
        transition: "background 0.3s ease",
      }}
    >
      <WeatherDashboard 
        theme={theme} 
        setTheme={setTheme} 
        currentTheme={currentTheme} 
      />
    </div>
  );
}

export default App;