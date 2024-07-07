import axios from "axios";
import axiosSecure from ".";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthNamesShort = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  try {
    const {
      data: { data },
    } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

// format date dd/mm/yy
export const formatDate = (date) => {
  const dateArray = new Date(date).toLocaleDateString().split("/");
  const newDate = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
  return newDate;
};

//format date month dd, yy
export const formatDateTwo = (date) => {
  const reviewDate = new Date(date);

  const month = reviewDate.getMonth();
  const day = reviewDate.getDate();
  const year = reviewDate.getFullYear();
  return `${monthNames[month]} ${day}, ${year}`;
};
//format date month dd
export const formatDateThree = (date) => {
  const reviewDate = new Date(date);

  const month = reviewDate.getMonth();
  const day = reviewDate.getDate();
  return `${monthNamesShort[month]} ${day}`;
};

export const getLastThreeMonths = (lastThreeMonthIdx) => {
  const lastThreeMonths = monthNames.filter((_, idx) =>
    lastThreeMonthIdx.includes(idx)
  );
  return lastThreeMonths;
};

export const getMonths = (monthsIdx) => {
  const months = monthNames.filter((_, idx) => monthsIdx.includes(idx));
  return months;
};
