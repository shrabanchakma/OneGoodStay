import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
const GuestSalesDoughnutChart = ({ labels, data, backgroundColor }) => {
  const chartData = {
    labels,
    datasets: [
      {
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

GuestSalesDoughnutChart.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array,
  backgroundColor: PropTypes.array,
};

export default GuestSalesDoughnutChart;
