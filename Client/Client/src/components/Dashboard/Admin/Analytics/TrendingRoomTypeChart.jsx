import React from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";
const TrendingRoomTypeChart = (props) => {
  const demoData = [
    ["type", "total"],
    ["Beach", 73],
    ["Windmills", 45],
    ["Modern", 89],
    ["Countryside", 12],
    ["Pools", 56],
    ["Islands", 34],
    ["Lake", 78],
    ["Skiing", 23],
    ["Castles", 67],
    ["Caves", 39],
    ["Camping", 91],
    ["Arctic", 5],
    ["Desert", 82],
    ["Barns", 28],
    ["Lux", 60],
  ];

  const options = {
    legend: "label",
    pieSliceText: "label",
  };

  return <Chart chartType="PieChart" data={demoData} options={options} />;
};

TrendingRoomTypeChart.propTypes = {};

export default TrendingRoomTypeChart;
