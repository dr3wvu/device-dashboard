import Highcharts from "highcharts";
import Highcharts3D from "highcharts/highcharts-3d";
import HighchartsReact from "highcharts-react-official";
import { useFilters } from "./FilterContent";

if (typeof Highcharts3D === "function") {
  Highcharts3D(Highcharts);
}
export default function BarChart({
  data,
  filterKey,
  title = "Chart",
  enable3D = true,
}) {
  const { filters, updateFilter } = useFilters();

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "var(--secondary)",
          padding: "20px",
        }}
      >
        No data available for {title}
      </div>
    );
  }

  const options = {
    chart: {
      type: "column",
      height: 300,
      backgroundColor: "transparent",
      ...(enable3D && {
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25,
        },
      }),
    },
    title: { text: null },
    xAxis: {
      categories: data.map((d) => d.name),
      labels: {
        style: {
          color: "var(--secondary)",
          fontSize: "14px",
        },
      },
      lineColor: "var(--border)",
    },
    yAxis: {
      title: {
        text: "Devices",
        style: { color: "var(--secondary)" },
      },
      labels: {
        style: {
          color: "var(--secondary)",
          fontSize: "14px",
        },
      },
      gridLineColor: "rgba(108, 122, 224, 0.1)",
    },
    tooltip: {
      backgroundColor: "rgba(23, 25, 28, 0.9)",
      borderWidth: 1,
      borderColor: "#3d424a",
      borderRadius: 8,
      shadow: true,
      useHTML: true,
      style: {
        fontFamily: '"Inter", sans-serif',
        color: "#F3F4F6",
      },
      headerFormat:
        '<div style="font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">{point.key}</div>',
      pointFormat: `
    <div style="display: flex; align-items: center; gap: 8px;">
      <div style="width: 8px; height: 8px; border-radius: 50%; background-color: {point.color};"></div>
      <span style="font-weight: 600; font-size: 14px;">{point.y}</span>
      <span style="font-size: 12px; color: #94a3b8;">Devices</span>
    </div>
  `,
      padding: 15,
    },
    plotOptions: {
      column: {
        colorByPoint: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.y}",
          color: "var(--fg)",
        },
        events: {
          click: function (event) {
            updateFilter(filterKey, event.point.category);
          },
        },
      },
    },
    series: [
      {
        name: title,
        data: data,
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
