export const CHART_COLORS = [
  "rgba(37, 99, 235, 1)", // Electric Blue
  "rgba(16, 185, 129, 1)", // Emerald Green
  "rgba(245, 158, 11, 1)", // Amber
  "rgba(239, 68, 68, 1)", // Rose Red
  "rgba(139, 92, 246, 1)", // Vivid Violet
  "rgba(6, 182, 212, 1)", // Cyan
];

export const getAlphaColor = (color, opacity) =>
  color.replace("1)", `${opacity})`);
