import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import TimelineChart from "./TimelineChart";

export default function ChartCard({
  title,
  data,
  filterKey,
  type = "donut",
  dateRange = null,
  enable3D = true,
}) {
  if (!data || data.length === 0) {
    return (
      <div className="card chart-card">
        <h4>{title}</h4>
        <div
          style={{
            textAlign: "center",
            color: "var(--secondary)",
            padding: "40px 16px",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>📊</div>
          <div style={{ fontSize: "14px" }}>No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card chart-card">
      <h4>{title}</h4>
      {type === "donut" && (
        <DonutChart
          data={data}
          filterKey={filterKey}
          title={title}
          enable3D={enable3D}
        />
      )}
      {type === "bar" && (
        <BarChart
          data={data}
          filterKey={filterKey}
          title={title}
          enable3D={enable3D}
        />
      )}
      {type === "timeline" && (
        <TimelineChart
          data={data}
          dateRange={dateRange}
          title={title}
          enable3D={enable3D}
        />
      )}
    </div>
  );
}
