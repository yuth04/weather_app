export const uvColor = (value) => {
  if (value <= 2) return "#68D391";
  if (value <= 5) return "#F6E05E";
  if (value <= 7) return "#F6AD55";
  if (value <= 10) return "#FC8181";

  return "#B794F4";
};

export const uvLabel = (value) => {
  if (value <= 2) return "Low";
  if (value <= 5) return "Moderate";
  if (value <= 7) return "High";
  if (value <= 10) return "Very High";

  return "Extreme";
};

export const getWindDirection = (deg) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  return directions[Math.round(deg / 45) % 8];
};

export const formatDay = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });
};

export const formatHour = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    hour12: true,
  });
};
