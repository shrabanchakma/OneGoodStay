const cron = require("node-cron");

// delete room from "booked" collection
const task = async (bookedRoomsCollection) => {
  console.log("delete operation started");
  try {
    const currentDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
    const filterRooms = {
      $and: [
        { "roomDetails.status": "checkedOut" },
        { validity: { $lte: currentDate } },
      ],
    };

    await bookedRoomsCollection.deleteMany(filterRooms);
    console.log("delete operation ended");
  } catch (error) {
    console.error(error.message);
  }
};

const deleteBookedRooms = (bookedRoomsCollection) => {
  cron.schedule("30 13 * * *", async () => {
    await task(bookedRoomsCollection);
  });
};
module.exports = { deleteBookedRooms };
