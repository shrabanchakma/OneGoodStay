import axiosSecure from ".";

// get admin analytics data
export const getAdminAnalyticsData = async () => {
  const currentDate = new Date().toISOString();
  const { data } = await axiosSecure(
    `admin/analytics/dashboard?date=${currentDate}`
  );
  return data;
};

// get host analytics data
export const getHostAnalyticsData = async (email, timestamp) => {
  const currentDate = new Date().toISOString();
  const { data } = await axiosSecure(
    `host/analytics/dashboard?date=${currentDate}&email=${email}&timestamp=${timestamp}`
  );
  return data;
};
// get host analytics data
export const getGuestAnalyticsData = async (email, timestamp) => {
  const currentDate = new Date().toISOString();
  const { data } = await axiosSecure(
    `guest/analytics/dashboard?date=${currentDate}&email=${email}&timestamp=${timestamp}`
  );
  return data;
};
