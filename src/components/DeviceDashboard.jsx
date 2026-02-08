import { useMemo } from "react";
import ChartCard from "./ChartCard";
import DeviceTable from "./DeviceTable";
import { useFilters } from "./FilterContent";
import { SIGNAL_MAP, getSignalCategory } from "../constants/device";

export default function DeviceDashboard({
  devices = [],
  dateRange = { from: "", to: "" },
  visibleCharts,
}) {
  const { filters } = useFilters();

  const isMatch = (device, ignoreKey = null) => {
    if (dateRange?.from && dateRange?.to) {
      const dDate = new Date(device.lastActive).getTime();
      if (
        dDate < new Date(dateRange.from).getTime() ||
        dDate > new Date(dateRange.to).getTime()
      )
        return false;
    }

    if (
      ignoreKey !== "manufacturer" &&
      filters.manufacturer &&
      device.manufacturer !== filters.manufacturer
    )
      return false;
    if (
      ignoreKey !== "osVersion" &&
      filters.osVersion &&
      device.osVersion !== filters.osVersion
    )
      return false;
    if (
      ignoreKey !== "signalStrength" &&
      filters.signalStrength &&
      getSignalCategory(device.signalStrength) !== filters.signalStrength
    )
      return false;

    return true;
  };

  const filteredDevices = useMemo(
    () => devices.filter((d) => isMatch(d)),
    [devices, filters, dateRange],
  );

  const signalData = useMemo(() => {
    return Object.keys(SIGNAL_MAP).map((cat) => {
      const count = devices.filter(
        (d) =>
          getSignalCategory(d.signalStrength) === cat &&
          isMatch(d, "signalStrength"),
      ).length;
      const isSelected =
        !filters.signalStrength || filters.signalStrength === cat;
      const baseColor = SIGNAL_MAP[cat].color;

      return {
        name: cat,
        y: count,
        color: isSelected ? baseColor : `${baseColor}33`,
        opacity: isSelected ? 1 : 0.3,
      };
    });
  }, [devices, filters, dateRange]);

  const getGenericStats = (key) => {
    const cats = [...new Set(devices.map((d) => d[key]))].sort();
    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];

    return cats.map((cat, i) => {
      const count = devices.filter(
        (d) => d[key] === cat && isMatch(d, key),
      ).length;
      const isSelected = !filters[key] || filters[key] === cat;
      const baseColor = colors[i % colors.length];

      return {
        name: cat,
        y: count,
        color: isSelected ? baseColor : `${baseColor}33`,
        opacity: isSelected ? 1 : 0.3,
      };
    });
  };

  const timelineData = useMemo(() => {
    const usageByDate = {};
    filteredDevices.forEach((d) => {
      d.dailyUsage
        ?.filter((pt) => pt.date >= dateRange?.from && pt.date <= dateRange?.to)
        .forEach((entry) => {
          usageByDate[entry.date] =
            (usageByDate[entry.date] || 0) + entry.usage;
        });
    });
    return Object.entries(usageByDate)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, total]) => [new Date(date).getTime(), total]);
  }, [filteredDevices]);

  return (
    <>
      <div className="grid">
        {/* {visibleCharts["Battery Level"] && (
          <ChartCard
            title="Battery Level"
            data={getGenericStats("batteryLevel")}
            filterKey="osVersion"
            type="donut"
          />
        )} */}
        {visibleCharts["OS Versions"] && (
          <ChartCard
            title="OS Versions"
            data={getGenericStats("osVersion")}
            filterKey="osVersion"
            type="donut"
          />
        )}
        {visibleCharts["Manufacturers"] && (
          <ChartCard
            title="Manufacturers"
            data={getGenericStats("manufacturer")}
            filterKey="manufacturer"
            type="bar"
          />
        )}
        {visibleCharts["Signal Strength"] && (
          <ChartCard
            title="Signal Strength"
            data={signalData}
            filterKey="signalStrength"
            type="donut"
            showLegend={true}
          />
        )}
        {visibleCharts["Cellular Timeline"] && (
          <ChartCard
            title="Network Load (MB)"
            data={timelineData}
            type="timeline"
          />
        )}
      </div>
      <DeviceTable filteredDevices={filteredDevices} totalDevices={devices} />
    </>
  );
}
