import axios from "axios";
import axiosSecure from ".";

export const uploadImage = async (image) => {
  let imageData = null;
  try {
    const data = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      { image },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    imageData = data;
  } catch (error) {
    console.error(error.message);
  }
  return imageData.data;
};
