import axiosSecure from ".";

export const uploadImage = async (image) => {
  try {
    const { data } = await axiosSecure.post(
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
    return data.data;
  } catch (error) {
    console.error(error.message);
  }
};
