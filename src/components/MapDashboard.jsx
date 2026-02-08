import DeviceMap from "./DeviceMap";
import DeviceTable from "./DeviceTable";
import { useFilters } from "./FilterContent";

export default function MapDashboard({
  devices = [],
  dateRange = null,
  view = "map",
}) {
  const { filters } = useFilters();

  let filteredDevices = devices.filter((d) => {
    if (!d || !d.id || !d.location) {
      return false;
    }

    if (filters.manufacturer && d.manufacturer !== filters.manufacturer) {
      return false;
    }

    if (filters.osVersion && d.osVersion !== filters.osVersion) {
      return false;
    }

    if (dateRange?.from && dateRange?.to) {
      const deviceDate = new Date(d.lastActive);
      const from = new Date(dateRange.from);
      const to = new Date(dateRange.to);
      if (deviceDate < from || deviceDate > to) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="map-dashboard-container">
      <DeviceMap devices={filteredDevices} />
      <DeviceTable filteredDevices={filteredDevices} totalDevices={devices} />
    </div>
  );
}
