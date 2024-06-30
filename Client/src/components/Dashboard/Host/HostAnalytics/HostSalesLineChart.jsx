import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { Chart, registerables, Tooltip } from "chart.js";
Chart.register(...registerables, Tooltip);
const HostSalesLineChart = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: ["Sales Chart"],
        data,
        fill: false,
        borderColor: "#e41b43",
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return <Line data={chartData} options={options} />;
};

HostSalesLineChart.propTypes = {};

export default HostSalesLineChart;
