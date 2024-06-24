import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { Chart, registerables, Tooltip } from "chart.js";
Chart.register(...registerables, Tooltip);
const SalesLineChart = (props) => {
  // get the data of last 2 months
  // get the months and data in a separate arrays
  const data = {
    labels: [
      "April",
      "September",
      "January",
      "July",
      "November",
      "March",
      "August",
    ],
    datasets: [
      {
        label: "Demo Data",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return <Line data={data} options={options} />;
};

SalesLineChart.propTypes = {};

export default SalesLineChart;
