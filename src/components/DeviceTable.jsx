import { useState } from "react";

const formatDate = (dateStr) => {
  try {
    return new Date(dateStr).toLocaleString();
  } catch {
    return dateStr;
  }
};

export default function DeviceTable({
  filteredDevices = [],
  totalDevices = [],
}) {
  const [sortKey, setSortKey] = useState("lastActive");
  const [sortDesc, setSortDesc] = useState(true);

  if (!filteredDevices || filteredDevices.length === 0) {
    return (
      <div
        className="card"
        style={{ textAlign: "center", padding: "32px 16px" }}
      >
        <div className="empty-state-icon">📱</div>
        <div className="empty-state-title">No Devices found</div>
        <div className="empty-state-message">
          Check your filters or date range and try again
        </div>
      </div>
    );
  }

  const columns = [
    { key: "id", label: "Device ID" },
    { key: "name", label: "Device Name" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "osVersion", label: "OS Version" },
    { key: "lastActive", label: "Last Active" },
    { key: "signalStrength", label: "Signal Strength" },
    { key: "status", label: "Status" },
    { key: "location", label: "Location" },
    { key: "cellularUsageMB", label: "Cellular (MB)" },
  ];

  const validfilteredDevices = filteredDevices.filter(
    (d) => d && typeof d === "object" && d.id,
  );

  const sorted = [...validfilteredDevices].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (sortKey === "lastActive") {
      const aDate = new Date(aVal);
      const bDate = new Date(bVal);
      return sortDesc ? bDate - aDate : aDate - bDate;
    }

    if (aVal < bVal) return sortDesc ? 1 : -1;
    if (aVal > bVal) return sortDesc ? -1 : 1;
    return 0;
  });

  const changeSort = (key) => {
    if (sortKey === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  };

  const getCellContent = (device, key) => {
    const value = device[key];

    if (key === "lastActive") {
      return formatDate(value);
    }
    if (key === "installedApps") {
      return formatApps(value);
    }
    if (key === "location") {
      return value ? `${value.lat.toFixed(2)}, ${value.lng.toFixed(2)}` : "-";
    }
    if (key === "status") {
      const statusColor =
        value === "active" ? "var(--success)" : "var(--error)";
      return (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            background: statusColor + "20",
            color: statusColor,
            fontWeight: 600,
            fontSize: "12px",
            textTransform: "capitalize",
          }}
        >
          {value}
        </span>
      );
    }

    if (key === "cellularUsageMB") {
      // last cellular data
      const history = device.dailyUsage || [];
      const latest = history.length > 0 ? history[history.length - 1].usage : 0;

      return (
        <span style={{ fontWeight: "600", color: "var(--primary-sapphire)" }}>
          {latest.toLocaleString()} MB
        </span>
      );
    }
    return value || "-";
  };

  return (
    <div className="card">
      <div className="table-header">
        <h4>Devices </h4>
        <div>{`( ${filteredDevices.length} / ${totalDevices.length} )`}</div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => changeSort(col.key)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                  title={`Click to sort by ${col.label}`}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span style={{ marginLeft: "4px" }}>
                      {sortDesc ? "↓" : "↑"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((device) => (
              <tr key={device.id}>
                {columns.map((col) => (
                  <td key={`${device.id}-${col.key}`}>
                    {getCellContent(device, col.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          marginTop: "12px",
          fontSize: "12px",
          color: "var(--secondary)",
        }}
      ></div>
    </div>
  );
}
