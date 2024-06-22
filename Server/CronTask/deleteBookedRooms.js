const { ObjectId } = require("mongodb");
const cron = require("node-cron");

// delete room from "booked" collection
const task = async (roomCollection, bookedRoomsCollection) => {
  console.log("delete operation started");
  try {
    const currentDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
    const filterRooms = {
      $and: [
        { "roomDetails.endDate": { $lte: currentDate } },
        { "roomDetails.status": "checkedOut" },
      ],
    };

    const result = await bookedRoomsCollection.deleteMany(filterRooms);
    console.log("operation result ---->", result);
    console.log("delete operation ended");
  } catch (error) {
    console.error(error.message);
  }
};

const deleteBookedRooms = (roomCollection, bookedRoomsCollection) => {
  cron.schedule("* * * * *", async () => {
    await task(roomCollection, bookedRoomsCollection);
  });
};
module.exports = { deleteBookedRooms };
