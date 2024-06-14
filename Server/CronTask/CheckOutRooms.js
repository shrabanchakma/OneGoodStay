const { ObjectId } = require("mongodb");
const cron = require("node-cron");

// update Room status
const updateRoomStatus = async (roomCollection, bookedRoomsCollection) => {
  console.log("operation started");
  try {
    const currentDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
    // filter available rooms
    const filterRooms = {
      $and: [{ endDate: { $lte: currentDate } }, { status: "available" }],
    };
    //   filter booked rooms
    const filterBookedRooms = {
      $and: [{ endDate: { $lte: currentDate } }, { status: "booked" }],
    };
    // update available rooms

    const updateRooms = {
      $set: {
        status: "needs_update",
      },
    };
    // updated booked rooms
    const updateBookedRooms = {
      $set: {
        status: "checkedOut",
      },
    };
    //   update booked room status to "checkedOut" and available rooms to "needs_update"
    const data1 = await roomCollection.updateMany(
      filterBookedRooms,
      updateBookedRooms
    );
    const data2 = await roomCollection.updateMany(filterRooms, updateRooms);

    // delete expired rooms in database
    // delete if todays the last day
    const deleteFilter = {
      "roomDetails.endDate": currentDate,
    };
    const data3 = await bookedRoomsCollection.deleteMany(deleteFilter);
    console.log("data1 --->", data1);
    console.log("data2 --->", data2);
    console.log("data3 --->", data3);
    console.log("operation ended");
  } catch (error) {
    console.error(error.message);
  }
};

// cron task function
const scheduledCronJob = (roomCollection, bookedRoomsCollection) => {
  cron.schedule("*/5 * * * * *", async () => {
    await updateRoomStatus(roomCollection, bookedRoomsCollection);
  });
};
module.exports = { scheduledCronJob };
