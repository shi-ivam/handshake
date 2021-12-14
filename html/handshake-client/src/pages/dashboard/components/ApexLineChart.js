import React from "react";
import ApexCharts from "react-apexcharts";
import moment from 'moment';


// const series = [
//   {
//     name: "Orders",
//     data: [Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000)],
//   },
//   {
//     name: "Last Week Orders",
//     data: [Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000)],
//   },
// ];

// const chartSettings = {
//   dataLabels: {
//     enabled: false,
//   },
//   stroke: {
//     curve: "smooth",
//     width: 2,
//   },
//   xaxis: {
//     type: "category",
//     categories: [
//       moment().subtract(6, 'days').format('ddd'),
//       moment().subtract(5, 'days').format('ddd'),
//       moment().subtract(4, 'days').format('ddd'),
//       moment().subtract(3, 'days').format('ddd'),
//       moment().subtract(2, 'days').format('ddd'),
//       moment().subtract(1, 'days').format('ddd'),
//       moment().subtract(0, 'days').format('ddd'),
//     ],
//     labels: {
//       style: {
//         colors: "#6B859E",
//         opacity: 0.7,
//       },
//     },
//   },
//   yaxis: {
//     labels: {
//       style: {
//         colors: ["#6B859E"],
//         opacity: 0.7,
//       },
//     },
//   },
//   tooltip: {
//     x: {
//       show: false,
//     },
//   },
//   fill: {
//     type: "gradient",
//     gradient: {
//       shadeIntensity: 1,
//       opacityFrom: 0.7,
//       opacityTo: 1,
//       stops: [40, 90, 100]
//     }
//   },
//   colors: ["#4D53E0", "#41D5E2"],
//   chart: {
//     toolbar: {
//       show: false,
//     },
//   },
//   legend: {
//     show: true,
//     horizontalAlign: "center",
//   },
// };

export default function ApexLineChart(props) {

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
        ...props.days
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
  return (
    <ApexCharts
      options={chartSettings}
      series={props.series}
      type="area"
      height={400}
    />
  );
}
