import React from "react";
import ApexCharts from "react-apexcharts";


const series = [
  {
    name: "Orders",
    data: [Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000)],
  },
  {
    name: "Last Week Orders",
    data: [Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000)],
  },
];

const chartSettings = {
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    type: "category",
    categories: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],
    labels: {
      style: {
        colors: "#6B859E",
        opacity: 0.7,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: ["#6B859E"],
        opacity: 0.7,
      },
    },
  },
  tooltip: {
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 1,
      stops: [40, 90, 100]
    }
  },
  colors: ["#4D53E0", "#41D5E2"],
  chart: {
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: true,
    horizontalAlign: "center",
  },
};

export default function ApexLineChart() {
  return (
    <ApexCharts
      options={chartSettings}
      series={series}
      type="area"
      height={400}
    />
  );
}
