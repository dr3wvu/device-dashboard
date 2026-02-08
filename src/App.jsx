import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import DateSelector from "./components/DateSelector";
import DeviceDashboard from "./components/DeviceDashboard";
import MapDashboard from "./components/MapDashboard";
import ChartSelector from "./components/ChartSelector";
import { FilterProvider } from "./components/FilterContent";
import { devices } from "./constants/device";
import FilterTags from "./components/FilterTags";

const AVAILABLE_CHARTS = {
  "OS Versions": true,
  Manufacturers: true,
  "Signal Strength": true,
  "Cellular Timeline": true,
};

export default function App() {
  const [dashboard, setDashboard] = useState("device");
  const [dateRange, setDateRange] = useState(null);
  const [visibleCharts, setVisibleCharts] = useState(AVAILABLE_CHARTS);

  const validDevices = useMemo(
    () => devices.filter((d) => d && typeof d === "object" && d.id),
    [],
  );

  return (
    <div className="app-container">
      <FilterProvider>
        <Navbar dashboard={dashboard} setDashboard={setDashboard} />

        <main className="main-content">
          <div className="controls-bar">
            <DateSelector onChange={setDateRange} />
            {dashboard !== "map" && (
              <ChartSelector
                charts={AVAILABLE_CHARTS}
                visibleCharts={visibleCharts}
                setVisibleCharts={setVisibleCharts}
              />
            )}
            <FilterTags />
          </div>
          {dashboard === "device" ? (
            <DeviceDashboard
              devices={validDevices}
              dateRange={dateRange}
              visibleCharts={visibleCharts}
            />
          ) : (
            <MapDashboard
              devices={validDevices}
              dateRange={dateRange}
              visibleCharts={visibleCharts}
            />
          )}
        </main>
      </FilterProvider>
    </div>
  );
}
