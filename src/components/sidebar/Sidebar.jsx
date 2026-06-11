import { useEffect } from "react";
import {
  SunriseSunset,
  MapIcon,
  EyeIcon,
  SettingsIcon,
} from "../weather-icons/Icons";
import { styles } from "../../styles/dashboard.styles";

const NAV_ITEMS = [
  { label: "Today", icon: <SunriseSunset /> },
  { label: "Map", icon: <MapIcon /> },
  { label: "Details", icon: <EyeIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
];

const Logo = () => (
  <div
    style={{
      width: 38,
      height: 38,
      borderRadius: 12,
      background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: 700,
      fontSize: 14,
    }}
  >
    W
  </div>
);

const Sidebar = ({
  activeNav,
  setActiveNav,
  isMobile,
  isTablet,
  open,
  setOpen,
  themeConfig, // Received from WeatherDashboard
}) => {
  const S = styles;

  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open, isMobile]);

  const handleClick = (i) => {
    setActiveNav(i);
    if (isMobile) setOpen(false);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: themeConfig.overlayBg || "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            zIndex: 998,
          }}
        />
      )}

      <aside
        style={{
          ...S.sidebar,
          background: themeConfig.headerBg,
          borderRight: `1px solid ${themeConfig.border}`,
          transition: "background 0.3s ease, border 0.3s ease, left 0.25s ease",

          /* ===== RESPONSIVE BEHAVIOR CONFIGURATIONS ===== */

          // MOBILE: Drawer placement overrides
          ...(isMobile && {
            position: "fixed",
            left: open ? 0 : "-100%",
            top: 0,
            height: "100vh",
            zIndex: 999,
          }),

          // TABLET: Compact layout width configuration
          ...(isTablet &&
            !isMobile && {
              width: 64,
            }),
        }}
      >
        {/* Logo container */}
        <div style={{ marginBottom: 30 }}>
          <Logo />
        </div>

        {/* Dynamic Nav Controls */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flex: 1,
          }}
        >
          {NAV_ITEMS.map((item, i) => {
            const isActive = activeNav === i;
            return (
              <button
                key={item.label}
                onClick={() => handleClick(i)}
                title={item.label}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // Blends active background indicator based on the theme
                  background: isActive
                    ? themeConfig.activeNavBg || "rgba(99,102,241,0.18)"
                    : "transparent",
                  color: isActive 
                    ? themeConfig.activeNavText || "#818CF8" 
                    : themeConfig.textSecondary || "#64748B",
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
              >
                {item.icon}
              </button>
            );
          })}
        </nav>

        {/* Current Tab Label (Desktop Window Only) */}
        {!isMobile && !isTablet && (
          <div
            style={{
              fontSize: 10,
              color: themeConfig.textSecondary || "#64748B",
              letterSpacing: 1,
              textTransform: "uppercase",
              marginTop: "auto",
              fontWeight: 500,
            }}
          >
            {NAV_ITEMS[activeNav].label}
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;