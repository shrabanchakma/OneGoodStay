const express = require("express");
const cors = require("cors");
const { updateRoomStatus } = require("./CronTask/updateRoomStatus");
const { deleteBookedRooms } = require("./CronTask/deleteBookedRooms");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const port = 8000 || process.env.PORT;

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://api.imgbb.com/1/upload"],
    credentials: true,
    allowedHeaders: ["content-type"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(cookieParser());
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).send({ message: "Unauthorized access" });
    }
    // console.log("decoded --->", decoded);
    res.user = decoded;
    next();
  });
};

// send email
const sendEmail = (emailAddress, emailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: process.env.USER_MAIL, pass: process.env.USER_PASS },
  });

  //verify connection
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our emails", success);
    }
  });

  const mailBody = {
    from: process.env.USER_MAIL,
    to: emailAddress,
    subject: emailData?.subject,
    html: `<div>${emailData?.message}</div>`,
  };

  transporter.sendMail(mailBody, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hrheaqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const userCollection = await client
      .db("OneGoodStay")
      .createCollection("users");
    const roomCollection = await client
      .db("OneGoodStay")
      .createCollection("rooms");
    const bookedRoomsCollection = await client
      .db("OneGoodStay")
      .createCollection("booked");
    const reviewCollection = await client
      .db("OneGoodStay")
      .createCollection("reviews");
    // validate room dates everyday at 1pm
    updateRoomStatus(roomCollection, bookedRoomsCollection);
    deleteBookedRooms(bookedRoomsCollection);

    // middleware
    const verifyAdmin = async (req, res, next) => {
      const user = res.user;
      const result = await userCollection.findOne({ email: user?.email });
      if (!result || result?.role !== "admin") {
        return res.status(401).send({ message: "Unauthorized access" });
      }
      next();
    };
    const verifyHost = async (req, res, next) => {
      const user = res.user;
      const result = await userCollection.findOne({ email: user?.email });
      if (!result || result?.role !== "host") {
        return res.status(401).send({ message: "Unauthorized access" });
      }
      next();
    };

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    app.get("/logout", async (req, res) => {
      try {
        console.log("entering");
        res
          .cookie("token", "", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (err) {
        res.status(400).send({ message: err.message });
      }
    });
    // add users or update users
    app.put("/users/:email", async (req, res) => {
      const newUser = req.body;
      const email = req.params.email;
      const isExist = await userCollection.findOne({ email });
      if (isExist) {
        return res.send(isExist);
      }
      const result = await userCollection.updateOne(
        { email },
        {
          $set: {
            ...newUser,
            timestamp: Date.now(),
          },
        },
        { upsert: true }
      );
      if (result.upsertedCount) {
        const accountCreationDate = new Date();
        emailData = {
          subject: `Welcome to OneGoodStay!`,
          message: `
    <h1>Welcome to OneGoodStay!</h1>
    <p>Dear ${newUser?.name},</p>
    <p>Thank you for creating an account with us. We're excited to have you on board!</p>
    <p>With your new account, you can easily book rooms, manage your reservations, and enjoy a seamless experience on our platform.</p>
    <p><strong>Account Details:</strong></p>
    <ul>
        <li><strong>Username:</strong> ${newUser?.name}</li>
        <li><strong>Email:</strong> ${newUser?.email}</li>
        <li><strong>Account Created On:</strong> <span id="account-created-date">${accountCreationDate.toLocaleDateString(
          "en-GB"
        )}</span></li>
    </ul>
    <p>If you have any questions or need assistance, feel free to contact our support team.</p>
    <p>We look forward to providing you with the best service.</p>
    <p>Best regards,</p>
    <p>OneGoodStay Team</p>
          `,
        };
        sendEmail(email, emailData);
      }
      res.send(result);
    });

    // get all users
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    // get the users
    app.get("/user", async (req, res) => {
      const userEmail = req.query.email;
      const result = await userCollection.findOne({ email: userEmail });
      res.send(result);
    });

    // update user role
    app.patch("/user/role/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const role = req.body.role || "";
      const options = { upsert: true };

      if (role.length !== 0) {
        const result = await userCollection.updateOne(
          { email },
          {
            $set: {
              role,
              timestamp: Date.now(),
            },
          },
          options
        );

        return res.send(result);
      }

      // set user role to "requested"
      const result = await userCollection.updateOne(
        { email },
        {
          $set: {
            status: "requested",
          },
        },
        options
      );
      res.send(result);
    });

    // update user data
    app.put("/user/update", verifyToken, async (req, res) => {
      const email = req.query.email;
      const updatedUserData = req.body;
      const result = await userCollection.updateOne(
        { email },
        {
          $set: {
            ...updatedUserData,
          },
        },
        { upsert: true }
      );
      res.send(result);
    });

    // update user contact information
    app.patch("/user/update", verifyToken, async (req, res) => {
      const email = req.query.email;
      const contactInfo = req.body;
      const result = await userCollection.updateOne(
        { email },
        {
          $set: {
            contactInfo,
          },
        }
      );
      res.send(result);
    });

    // save rooms in database
    app.post("/rooms", verifyToken, verifyHost, async (req, res) => {
      const newRoom = req.body;
      const result = await roomCollection.insertOne(newRoom);
      res.send(result);
    });
    // get all rooms from database
    app.get("/rooms", async (req, res) => {
      const email = req.query.email;
      // get rooms based on user email
      if (email) {
        const result = await roomCollection
          .find({ "host.email": email })
          .toArray();
        return res.send(result);
      }
      const result = await roomCollection.find().toArray();
      res.send(result);
    });

    // get single room
    app.get("/rooms/:id", verifyToken, async (req, res) => {
      const roomId = req.params.id;
      const result = await roomCollection.findOne({
        _id: new ObjectId(roomId),
      });
      // get all rooms for host
      res.send(result);
    });
    // delete a room
    app.delete("/room/delete", verifyToken, verifyHost, async (req, res) => {
      const roomId = req.query.roomId;
      const result = await roomCollection.deleteOne({
        _id: ObjectId.createFromHexString(roomId),
      });
      res.send(result);
    });

    // update a room
    app.put("/room/update", verifyToken, verifyHost, async (req, res) => {
      const roomId = ObjectId.createFromHexString(req.query.roomId);
      const roomData = req.body;
      const updateRoom = {
        $set: {
          ...roomData,
        },
      };
      const result = roomCollection.updateOne({ _id: roomId }, updateRoom, {
        upsert: false,
      });
      res.send(result);
    });

    // stripe payment setup
    // send the publishable key
    app.get("/stripe-publishable-key", verifyToken, (req, res) => {
      res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
    });

    // create payment intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const roomInfo = req.body;
      const roomID = roomInfo?.roomID;
      const price = roomInfo?.price;
      const roomDB = await roomCollection.findOne({
        _id: ObjectId.createFromHexString(roomID),
      });
      if (price !== roomDB?.price) {
        return res.status(400).send({
          error: {
            message: "Something went wrong",
          },
        });
      }
      const metadata = {
        userEmail: roomInfo?.guestEmail,
        roomID,
      };
      try {
        if (stripe) {
          const paymentIntent = await stripe.paymentIntents.create({
            currency: "usd",
            amount: price * 100,
            metadata,
            payment_method_options: {
              card: {
                request_three_d_secure: "automatic",
              },
            },
            payment_method_types: ["card"],
          });

          // Send publishable key and PaymentIntent details to client
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
        }
      } catch (e) {
        return res.status(400).send({
          error: {
            message: e.message,
          },
        });
      }
    });

    // book a room
    app.put("/book/room/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const roomDetails = req.body;
      const transactionId = roomDetails.transactionId;
      const options = { upsert: true };
      // set isBooked true for that room
      try {
        await roomCollection.updateOne(
          { _id: ObjectId.createFromHexString(id) },
          {
            $set: {
              status: "booked",
            },
          },
          options
        );

        const result = await bookedRoomsCollection.insertOne({
          ...roomDetails,
          bookingDate: new Date(roomDetails.bookingDate),
        });
        const roomData = await roomCollection.findOne({
          _id: ObjectId.createFromHexString(roomDetails?.roomID),
        });
        // send mail to guest
        if (result.insertedId && roomData) {
          const startDate = new Date(roomData?.startDate);
          const endDate = new Date(roomData?.endDate);
          sendEmail(roomDetails?.guest?.email, {
            subject: `Your Booking Confirmation at ${roomData?.title}`,
            message: `
          <h1>Booking Confirmation</h1>
            <p>Dear ${roomDetails?.guest?.name},</p>
           <p>Thank you for booking with ${
             roomData?.title
           }! We are pleased to confirm your reservation.</p>
          <p><strong>Booking Details:</strong></p>
        <ul>
          <li><strong>Check-in Date:</strong> <span id="check-in-date">${startDate.toLocaleDateString(
            "en-US"
          )}</span></li>
          <li><strong>Check-out Date:</strong> <span id="check-out-date">${endDate.toLocaleDateString(
            "en-US"
          )}</span></li>
          <li><strong>Room Type:</strong> ${roomData?.category}</li>
       </ul>
    <p>If you have any questions or need to make any changes, please contact us.</p>
    <p>We look forward to welcoming you!</p>
    <p>Best regards,</p>
    <p>${roomData?.title}</p>
            `,
          });
          // send mail to host
          sendEmail(roomData?.host?.email, {
            subject: `New Booking Alert: ${roomDetails?.guest?.name} at ${roomData?.title}`,
            message: `
                <h1>New Booking Alert</h1>
    <p>Dear ${roomData?.host?.name},</p>
    <p>We are excited to inform you that ${
      roomDetails?.guest?.name
    } has made a reservation at ${roomData?.title}.</p>
    <p><strong>Booking Details:</strong></p>
    <ul>
        <li><strong>Guest Name:</strong> ${roomDetails?.guest?.name}</li>
        <li><strong>Check-in Date:</strong>${startDate.toLocaleDateString(
          "en-US"
        )}</li>
        <li><strong>Check-out Date:</strong>${endDate.toLocaleDateString(
          "en-US"
        )}</li>
        <li><strong>Room Type:</strong> ${roomData?.category}</li>
    </ul>
    <p>Please ensure that the room is prepared and ready for the guest's arrival. If you have any questions, feel free to contact us.</p>
    <p>Best regards,</p>
    <p>${roomData?.title}</p>
            `,
          });
        }

        res.send(result);
      } catch (error) {
        return res.status(400).send({ error: { message: error.message } });
      }
    });

    // get all booked rooms
    app.get("/booked-rooms/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      try {
        const bookedRooms = await bookedRoomsCollection
          .aggregate([
            {
              $match: {
                "guest.email": email,
              },
            },
            {
              $project: {
                _id: 0,
                roomID: 1,
              },
            },
          ])
          .toArray();
        const bookedRoomsID = bookedRooms.map((room) =>
          ObjectId.createFromHexString(room.roomID)
        );

        const roomData = await roomCollection
          .aggregate([
            {
              $match: {
                _id: { $in: bookedRoomsID },
              },
            },
          ])
          .toArray();
        res.send(roomData);
      } catch (error) {
        console.log(error.message);
        return res.status(400).send({ error: error.message });
      }
    });

    // save review data
    app.post("/rooms/ratings", verifyToken, async (req, res) => {
      const ratingData = req.body;
      const result = await reviewCollection.insertOne(ratingData);
      res.send(result);
    });
    // get room reviews (lazy loading)
    app.get("/rooms/reviews/:id", verifyToken, async (req, res) => {
      const { page = 1, limit = 6 } = req.query;
      const roomId = req.params.id;
      const start = 0;
      const end = page * limit;
      const result = (await reviewCollection.find({ roomId }).toArray()).slice(
        start,
        end
      );
      res.send(result);
    });

    // total reviews
    app.get("/rooms/total-reviews/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await reviewCollection
        .aggregate([
          {
            $match: {
              roomId: id,
            },
          },
          {
            $count: "total_reviews",
          },
        ])
        .toArray();
      res.send(result[0]);
    });
    // get category reviews
    app.get("/rooms/category-reviews/:id", verifyToken, async (req, res) => {
      const roomId = req.params.id;
      let result = await reviewCollection
        .aggregate([
          {
            $match: {
              roomId: roomId,
            },
          },
          {
            $group: {
              _id: null,
              avg_cleanliness: {
                $avg: "$ratings.cleanliness",
              },
              avg_staff_service: {
                $avg: "$ratings.staff & service",
              },
              avg_amenities: {
                $avg: "$ratings.amenities",
              },
              avg_condition_facilities: {
                $avg: "$ratings.property conditions & facilities",
              },
              avg_eco_friendliness: {
                $avg: "$ratings.eco-friendliness",
              },
              avg_overall_satisfaction: {
                $avg: "$ratings.overall satisfaction",
              },
            },
          },
          {
            $project: {
              avg_cleanliness: {
                $multiply: ["$avg_cleanliness", 2],
              },
              avg_staff_service: {
                $multiply: ["$avg_staff_service", 2],
              },
              avg_amenities: {
                $multiply: ["$avg_amenities", 2],
              },
              avg_condition_facilities: {
                $multiply: ["$avg_condition_facilities", 2],
              },
              avg_eco_friendliness: {
                $multiply: ["$avg_eco_friendliness", 2],
              },
              avg_overall_satisfaction: {
                $multiply: ["$avg_overall_satisfaction", 2],
              },
            },
          },
        ])
        .toArray();
      res.send(result[0]);
    });

    // check if user is allowed to give review
    app.get("/can-review/:id", verifyToken, async (req, res) => {
      const email = req.query.email;
      const id = req.params.id;
      const query = {
        $and: [{ "guest.email": email }, { "roomDetails._id": id }],
      };
      const isUserExist = await bookedRoomsCollection.findOne(query);
      if (isUserExist) {
        res.send({ isAllowed: true });
      } else {
        res.send({ isAllowed: false });
      }
    });

    // get analytics data
    app.get(
      "/admin/analytics/dashboard",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        try {
          const currentDate = new Date(req.query.date);
          const currentYear = currentDate.getFullYear();
          const currentMonth = (currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const lastMonth = currentDate.getMonth().toString().padStart(2, "0");
          const twoMonthsAgo = (currentDate.getMonth() - 1)
            .toString()
            .padStart(2, "0");
          const threeMonthsAgo = (currentDate.getMonth() - 2)
            .toString()
            .padStart(2, "0");
          const [
            bookedRoomsData,
            totalUsers,
            totalRooms,
            revenue_last_month,
            revenue_two_months_ago,
            revenue_three_months_ago,
          ] = await Promise.all([
            bookedRoomsCollection
              .aggregate([
                {
                  $group: {
                    _id: null,
                    totalRevenue: {
                      $sum: "$price",
                    },
                    totalBookings: {
                      $sum: 1,
                    },
                  },
                },
              ])
              .toArray(),
            userCollection.countDocuments(),
            roomCollection.countDocuments(),
            // get revenues of last three months
            bookedRoomsCollection
              .aggregate([
                {
                  $match: {
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${lastMonth}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${currentMonth}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    total_revenue: { $sum: "$price" },
                  },
                },
              ])
              .toArray(),
            bookedRoomsCollection
              .aggregate([
                {
                  $match: {
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${twoMonthsAgo}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${lastMonth}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    total_revenue: { $sum: "$price" },
                  },
                },
              ])
              .toArray(),
            bookedRoomsCollection
              .aggregate([
                {
                  $match: {
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${threeMonthsAgo}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${twoMonthsAgo}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    total_revenue: { $sum: "$price" },
                  },
                },
              ])
              .toArray(),
          ]);
          const analyticsData = {
            totalRevenue: bookedRoomsData[0]?.totalRevenue || 0,
            totalBookings: bookedRoomsData[0]?.totalBookings || 0,
            totalUsers: totalUsers || 0,
            totalRooms: totalRooms || 0,
            revenue_last_month: revenue_last_month[0]?.total_revenue || 0,
            revenue_two_months_ago:
              revenue_two_months_ago[0]?.total_revenue || 0,
            revenue_three_months_ago:
              revenue_three_months_ago[0]?.total_revenue || 0,
          };
          res.send(analyticsData);
        } catch (err) {
          res.status(400).send({ message: err.message });
        }
      }
    );

    app.get(
      "/host/analytics/dashboard",
      verifyToken,
      verifyHost,
      async (req, res) => {
        try {
          const email = req.query.email;
          const accountCreationTimestamp = parseInt(req.query.timestamp);
          const currentDate = new Date(req.query.date);
          const currentYear = currentDate.getFullYear();
          const currentMonth = (currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const nextMonth = (currentDate.getMonth() + 2)
            .toString()
            .padStart(2, "0");
          const lastMonth = currentDate.getMonth().toString().padStart(2, "0");
          const twoMonthsAgo = (currentDate.getMonth() - 1)
            .toString()
            .padStart(2, "0");
          const threeMonthsAgo = (currentDate.getMonth() - 2)
            .toString()
            .padStart(2, "0");
          const fourMonthsAgo = (currentDate.getMonth() - 3)
            .toString()
            .padStart(2, "0");
          const fiveMonthsAgo = (currentDate.getMonth() - 4)
            .toString()
            .padStart(2, "0");
          const data = await Promise.all([
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: { $arrayElemAt: ["$roomDetailsArray", 0] },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                  },
                },
                {
                  $group: {
                    _id: null,
                    total_sales: { $sum: "$price" },
                    total_bookings: { $sum: 1 },
                  },
                },
              ])
              .toArray(),
            roomCollection
              .aggregate([
                {
                  $match: {
                    "host.email": email,
                  },
                },
                {
                  $count: "total_rooms",
                },
              ])
              .toArray(),
            // get revenues of last 5 months

            // sales last month
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${lastMonth}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${currentMonth}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    sales_last_month: { $sum: "$price" },
                  },
                },
              ])
              .toArray(),
            // sales two months ago
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${twoMonthsAgo}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${lastMonth}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    sales_two_months_ago: { $sum: "$price" },
                  },
                },
              ])
              .toArray(),
            // sales three months ago
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${threeMonthsAgo}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${twoMonthsAgo}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    sales_three_months_ago: { $sum: "$price" },
                  },
                },
              ])
              .toArray(),
            // sales four months ago
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${fourMonthsAgo}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${threeMonthsAgo}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    sales_four_months_ago: { $sum: "$price" },
                  },
                },
              ])
              .toArray(),
            // sales five months ago
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${fiveMonthsAgo}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${fourMonthsAgo}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    sales_five_months_ago: { $sum: "$price" },
                  },
                },
              ])
              .toArray(),
            // current month
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${currentMonth}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${nextMonth}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    sales_current_month: { $sum: "$price" },
                  },
                },
              ])
              .toArray(),
            // total bookings for current month (idx = 8)
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${currentMonth}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${nextMonth}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $count: "current_month_total_bookings",
                },
              ])
              .toArray(),
            // total bookings for previous month (idx = 9)
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${lastMonth}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${currentMonth}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $count: "previous_month_total_bookings",
                },
              ])
              .toArray(),
            // room added in current month (idx = 10)
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${currentMonth}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${nextMonth}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $count: "room_added_in_current_month",
                },
              ])
              .toArray(),
            // room added in previous month (idx = 11)
            bookedRoomsCollection
              .aggregate([
                {
                  $addFields: {
                    roomIDObjectId: { $toObjectId: "$roomID" },
                  },
                },
                {
                  $lookup: {
                    from: "rooms",
                    localField: "roomIDObjectId",
                    foreignField: "_id",
                    as: "roomDetailsArray",
                  },
                },
                {
                  $addFields: {
                    roomDetails: {
                      $arrayElemAt: ["$roomDetailsArray", 0],
                    },
                  },
                },
                {
                  $match: {
                    "roomDetails.host.email": email,
                    bookingDate: {
                      $gte: new Date(
                        `${currentYear}-${lastMonth}-01T00:00:00.000Z`
                      ),
                      $lt: new Date(
                        `${currentYear}-${currentMonth}-01T00:00:00.000Z`
                      ),
                    },
                  },
                },
                {
                  $count: "room_added_in_previous_month",
                },
              ])
              .toArray(),
          ]);

          const today = new Date().getTime() / (1000 * 60 * 60 * 24);
          const accountCreationDay =
            new Date(accountCreationTimestamp).getTime() /
            (1000 * 60 * 60 * 24);
          const user_since = Math.round(Math.abs(today - accountCreationDay));

          // line chart data
          const sales_last_month = data[2][0]?.sales_last_month || 0;
          const sales_two_months_ago = data[3][0]?.sales_two_months_ago || 0;
          const sales_three_months_ago =
            data[4][0]?.sales_three_months_ago || 0;
          const sales_four_months_ago = data[5][0]?.sales_four_months_ago || 0;
          const sales_five_months_ago = data[6][0]?.sales_five_months_ago || 0;
          // growth and decline
          const sales_current_month = data[7][0]?.sales_current_month || 0;
          const current_month_total_bookings =
            data[8][0]?.current_month_total_bookings || 0;
          const previous_month_total_bookings =
            data[8][0]?.previous_month_total_bookings || 0;

          const salesChangePercentage =
            sales_last_month === 0
              ? 100
              : Math.round(
                  ((sales_current_month - sales_last_month) /
                    sales_last_month) *
                    100
                );
          const bookingsChangePercentage =
            previous_month_total_bookings === 0
              ? 100
              : Math.round(
                  ((current_month_total_bookings -
                    previous_month_total_bookings) /
                    previous_month_total_bookings) *
                    100
                );

          const room_added_in_current_month =
            data[10][0]?.room_added_in_current_month || 0;

          const room_added_in_previous_month =
            data[10][0]?.room_added_in_previous_month || 0;

          const changeOfRoomNumbers =
            room_added_in_current_month === room_added_in_previous_month
              ? room_added_in_current_month
              : room_added_in_current_month - room_added_in_previous_month;
          const analyticsData = {
            totalSales: data[0][0]?.total_sales || 0,
            totalBookings: data[0][0]?.total_bookings || 0,
            totalRooms: data[1][0]?.total_rooms || 0,
            lineChartData: [
              sales_five_months_ago,
              sales_four_months_ago,
              sales_three_months_ago,
              sales_two_months_ago,
              sales_last_month,
            ],
            userSince: user_since,
            percentages: {
              salesChangePercentage,
              bookingsChangePercentage,
              changeOfRoomNumbers,
            },
          };
          res.send(analyticsData);
        } catch (err) {
          res.send({ message: err.message });
        }
      }
    );

    app.get("/guest/analytics/dashboard", verifyToken, async (req, res) => {
      const email = req.query.email;
      const accountCreationTimestamp = parseInt(req.query.timestamp);
      try {
        const [totalSpent, chartData] = await Promise.all([
          // total spent
          bookedRoomsCollection
            .aggregate([
              {
                $match: {
                  "guest.email": email,
                },
              },
              {
                $group: {
                  _id: null,
                  total_spent: { $sum: "$price" },
                  total_bookings: { $sum: 1 },
                },
              },
            ])
            .toArray(),
          // doughnut chart data
          bookedRoomsCollection
            .aggregate([
              {
                $addFields: {
                  roomIDObjectId: { $toObjectId: "$roomID" },
                },
              },
              {
                $lookup: {
                  from: "rooms",
                  localField: "roomIDObjectId",
                  foreignField: "_id",
                  as: "roomDetailsArray",
                },
              },
              {
                $addFields: {
                  roomDetails: {
                    $arrayElemAt: ["$roomDetailsArray", 0],
                  },
                },
              },
              {
                $match: {
                  "guest.email": email,
                },
              },
              {
                $group: {
                  _id: "$roomDetails.category",
                  category_sum: { $sum: 1 },
                },
              },
            ])
            .toArray(),
        ]);
        const today = new Date().getTime() / (1000 * 60 * 60 * 24);
        const accountCreationDay =
          new Date(accountCreationTimestamp).getTime() / (1000 * 60 * 60 * 24);
        const user_since = Math.round(Math.abs(today - accountCreationDay));

        const analyticsData = {
          totalSpent: totalSpent[0].total_spent,
          totalBookings: totalSpent[0].total_bookings,
          userSince: user_since,
          chartData,
        };
        res.send(analyticsData);
      } catch (err) {
        res.status(400).send({ message: err.message });
      }
    });
    // add visited rooms
    app.post("/visited-rooms", async (req, res) => {
      const roomId = ObjectId.createFromHexString(req.body.roomId);
      const email = req.body.userEmail;
      try {
        const room = await roomCollection.findOne({ _id: roomId });
        const user = await userCollection.findOne({ email });
        const visitedRoomDetails = {
          roomId: room?._id,
          image: room?.image,
          title: room?.title,
        };
        if (!user?.visitedRooms || user?.visitedRooms.length === 0) {
          const result = await userCollection.updateOne(
            { email },
            { $set: { visitedRooms: [visitedRoomDetails] } },
            { upsert: true }
          );
          res.send(result);
        } else {
          const visitedRooms = user?.visitedRooms;
          if (visitedRooms.length === 4) {
            visitedRooms.pop();
            visitedRooms.unshift(visitedRoomDetails);
          } else {
            visitedRooms.unshift(visitedRoomDetails);
          }
          const result = await userCollection.updateOne(
            { email },
            { $set: { visitedRooms } },
            { upsert: true }
          );
          res.send(result);
        }
      } catch (err) {
        res.status(400).send({ message: err.message });
      }
    });

    // get visited rooms
    app.get("/visited-rooms", async (req, res) => {
      try {
        const email = req.query.email;
        const user = await userCollection.findOne({ email });
        if (!user?.visitedRooms || user.visitedRooms.length === 0) {
          res.send({ visitedRooms: [] });
        } else {
          res.send({ visitedRooms: user.visitedRooms });
        }
      } catch (err) {
        res.status(400).send({ message: err.message });
      }
    });

    // get searched rooms
    app.get("/room-search", async (req, res) => {
      try {
        const city = req.query.city;
        const startDate = new Date(req.query.startDate).toISOString();
        const endDate = new Date(req.query.endDate).toISOString();
        const rooms = parseInt(req.query.rooms);
        const guests = parseInt(req.query.guests);
        console.log({ city, startDate, endDate, rooms, guests });
        const result = await roomCollection
          .aggregate([
            {
              $addFields: {
                guestNumeric: { $toInt: "$guest" },
                bedroomsNumeric: { $toInt: "$bedrooms" },
              },
            },
            {
              $match: {
                startDate: {
                  $gte: startDate,
                },
                endDate: {
                  $lte: endDate,
                },
                guestNumeric: { $gte: guests },
                bedroomsNumeric: {
                  $gte: rooms,
                },
                location: { $regex: city, $options: "i" },
                status: "available",
              },
            },
          ])
          .toArray();
        res.send(result);
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("One Good Stay Server");
});

app.listen(port, () => {
  console.log(`OneGoodSay running on server ${port}`);
});
