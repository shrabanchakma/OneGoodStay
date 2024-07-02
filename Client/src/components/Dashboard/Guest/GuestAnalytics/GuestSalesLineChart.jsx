import React from "react";
import PropTypes from "prop-types";
import { Doughnut, Line } from "react-chartjs-2";
const GuestSalesDoughnutChart = ({ labels, data, backgroundColor }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: ["Sales Chart"],
        data,
        backgroundColor,
        fill: false,
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return <Doughnut data={chartData} options={options} />;
};

GuestSalesDoughnutChart.propTypes = {};

export default GuestSalesDoughnutChart;
