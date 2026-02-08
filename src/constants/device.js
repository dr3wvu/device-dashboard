const generateTorontoLocation = () => {
  const bounds = {
    latMin: 43.66,
    latMax: 43.9,
    lngMin: -79.55,
    lngMax: -79.23,
  };

  return {
    lat: Math.random() * (bounds.latMax - bounds.latMin) + bounds.latMin,
    lng: Math.random() * (bounds.lngMax - bounds.lngMin) + bounds.lngMin,
  };
};

const generateDevices = () => {
  const manufacturers = ["Google", "Samsung", "Apple", "Zebra", "Motorola"];
  const osVersions = ["11", "12", "13", "14", "15", "16"];

  return Array.from({ length: 18 }, (_, i) => {
    const man = manufacturers[Math.floor(Math.random() * 5)];
    const signal = -40 - Math.floor(Math.random() * 70);

    const lastActiveDate = new Date();
    lastActiveDate.setDate(lastActiveDate.getDate() - (i % 30));

    const dailyUsage = Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date();
      date.setDate(date.getDate() - dayIndex);
      return {
        date: date.toISOString().split("T")[0],
        usage: Math.floor(Math.random() * 500) + 100,
      };
    }).reverse();

    return {
      id: `dev${String(i + 1).padStart(3, "0")}`,
      name: `${man} Device ${i + 1}`,
      manufacturer: man,
      osVersion: `Version: ${osVersions[i % osVersions.length]}`,
      batteryLevel: Math.floor(Math.random() * 100),
      lastActive: lastActiveDate.toISOString(),
      signalStrength: String(signal),
      status: Math.random() > 0.2 ? "active" : "inactive",
      dataUsageMB: Math.floor(Math.random() * 5000),
      dailyUsage: dailyUsage,
      location: generateTorontoLocation(),
    };
  });
};

export const devices = generateDevices();
export const SIGNAL_MAP = {
  Good: { color: "#10b981" },
  Average: { color: "#f59e0b" },
  Bad: { color: "#ef4444" },
  "No Signal": { color: "#6b7280" },
};
export const getSignalCategory = (dbm) => {
  const val = parseInt(dbm);
  if (val >= -70) return "Good";
  if (val >= -85) return "Average";
  if (val >= -100) return "Bad";
  return "No Signal";
};
