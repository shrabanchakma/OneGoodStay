const cron = require("node-cron");

// update Room status
const task = async (roomCollection, bookedRoomsCollection) => {
  console.log("operation started");
  try {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const currentDate = today.toISOString();
    const validity = new Date(today).setDate(today.getDate() + 30);
    const validityDate = new Date(
      new Date(validity).setHours(0, 0, 0, 0)
    ).toISOString();
    // filter available rooms
    const filterRooms = {
      $and: [{ endDate: { $lte: currentDate } }, { status: "available" }],
    };
    // filter rooms with status "booked"
    const filterRooms2 = {
      $and: [{ endDate: { $lte: currentDate } }, { status: "booked" }],
    };
    //   filter booked rooms
    const filterBookedRooms = {
      $and: [
        { "roomDetails.endDate": { $lte: currentDate } },
        { "roomDetails.status": "booked" },
      ],
    };
    // update available rooms
    const updateRooms = {
      $set: {
        status: "needs_update",
      },
    };
    // update room with status "booked"
    const updateRooms2 = {
      $set: {
        status: "checkedOut",
      },
    };
    // updated booked rooms
    const updateBookedRooms = {
      $set: {
        "roomDetails.status": "checkedOut",
        validity: validityDate,
      },
    };
    //   update booked room status to "checkedOut" and available rooms to "needs_update"
    await bookedRoomsCollection.updateMany(
      filterBookedRooms,
      updateBookedRooms
    );
    await roomCollection.updateMany(filterRooms, updateRooms);
    await roomCollection.updateMany(filterRooms2, updateRooms2);
    console.log("operation ended");
  } catch (error) {
    console.error(error.message);
  }
};

// cron task function
const updateRoomStatus = (roomCollection, bookedRoomsCollection) => {
  cron.schedule("0 13 * * *", async () => {
    await task(roomCollection, bookedRoomsCollection);
  });
};
module.exports = { updateRoomStatus };
