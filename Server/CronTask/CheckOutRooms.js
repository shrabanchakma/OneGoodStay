const cron = require("node-cron");

// update Room status
const updateRoomStatus = async (roomCollection, bookedRoomsCollection) => {
  console.log("operation started");
  const currentDate = new Date();
  //   filter available rooms
  const filterRooms = {
    $and: [{ endDate: currentDate }, { status: "available" }],
  };
  //   filter booked rooms
  const filterBookedRooms = {
    $and: [{ endDate: currentDate }, { status: "booked" }],
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
  await roomCollection.updateMany(filterBookedRooms, updateBookedRooms);
  await roomCollection.updateMany(filterRooms, updateRooms);

  // delete expired rooms in database
  // delete if todays the last day
  const deleteFilter = {
    "roomDetails.endDate": currentDate,
  };
  await bookedRoomsCollection.deleteMany(deleteFilter);
  console.log("operation ended");
};

// cron task function
const scheduledCronJob = (roomCollection, bookedRoomsCollection) => {
  cron.schedule("*/10 * * * * *", async () => {
    await updateRoomStatus(roomCollection, bookedRoomsCollection);
  });
};
module.exports = { scheduledCronJob };
