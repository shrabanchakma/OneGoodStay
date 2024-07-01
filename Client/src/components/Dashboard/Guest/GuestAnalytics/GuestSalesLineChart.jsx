import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
const GuestSalesLineChart = (props) => {
  const chartData = {
    labels: ["january", "february", "march"],
    datasets: [
      {
        label: ["Sales Chart"],
        data: [10, 1000, 10],
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

GuestSalesLineChart.propTypes = {};

export default GuestSalesLineChart;
