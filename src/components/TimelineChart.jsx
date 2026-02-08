import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function TimelineChart({
  data, // Expecting [[timestamp, value], ...]
  title = "Cellular Usage Trend",
}) {
  if (!data || data.length === 0) {
    return <div className="no-data">No data available for {title}</div>;
  }

  const options = {
    chart: {
      type: "area",
      height: 300,
      backgroundColor: "transparent",
      zoomType: "x",
    },
    title: { text: null },
    xAxis: {
      type: "datetime", // CRITICAL: This matches the [timestamp, value] format
      labels: {
        style: { color: "var(--secondary)", fontSize: "11px" },
      },
      lineColor: "rgba(255,255,255,0.1)",
    },
    yAxis: {
      title: {
        text: "Data Usage (MB)",
        style: { color: "var(--secondary)" },
      },
      labels: {
        style: { color: "var(--secondary)" },
      },
      gridLineColor: "rgba(255, 255, 255, 0.05)",
    },
    tooltip: {
      xDateFormat: "%b %e, %Y",
      shared: true,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      style: { color: "white" },
      headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y} MB</b>',
    },
    legend: {
      enabled: true,
      itemStyle: { color: "var(--secondary)", fontWeight: "normal" },
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: { hover: { enabled: true } },
        },
        lineWidth: 2,
        states: { hover: { lineWidth: 3 } },
        threshold: null,
      },
    },
    series: [
      {
        name: "Total Network Load",
        data: data,
        color: "#3b82f6",
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(59, 130, 246, 0.5)"],
            [1, "rgba(59, 130, 246, 0)"],
          ],
        },
      },
    ],
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
