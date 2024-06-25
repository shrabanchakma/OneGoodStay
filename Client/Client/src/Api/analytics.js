import axiosSecure from ".";

// get analytics data
export const getAnalyticsData = async () => {
  const { data } = await axiosSecure(`/analytics/dashboard`);
  return data;
};
