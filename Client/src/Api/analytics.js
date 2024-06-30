import axiosSecure from ".";

// get analytics data
export const getAnalyticsData = async () => {
  const currentDate = new Date().toISOString();
  const { data } = await axiosSecure(
    `/analytics/dashboard?date=${currentDate}`
  );
  return data;
};
