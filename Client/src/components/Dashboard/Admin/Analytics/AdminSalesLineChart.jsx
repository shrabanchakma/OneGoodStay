import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { Chart, registerables, Tooltip } from "chart.js";
Chart.register(...registerables, Tooltip);
const AdminSalesLineChart = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: ["Revenue of last three months"],
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

AdminSalesLineChart.propTypes = {};

export default AdminSalesLineChart;
