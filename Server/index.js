const express = require("express");
const cors = require("cors");
const { scheduledCronJob } = require("./CronTask/CheckOutRooms");
const app = express();
const port = 8000 || process.env.PORT;

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://api.imgbb.com/1/upload"],
  })
);

app.use(express.json());
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    scheduledCronJob(roomCollection, bookedRoomsCollection);
    // add users
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
      res.send(result);
    });

    // get all users
    app.get("/users", async (req, res) => {
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
    app.patch("/user/role/:email", async (req, res) => {
      const email = req.params.email;
      const role = req.body.role;
      const options = { upsert: true };

      if (Object.keys(role).length !== 0) {
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
    app.put("/user/update", async (req, res) => {
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
    app.patch("/user/update", async (req, res) => {
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
    app.post("/rooms", async (req, res) => {
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
    app.get("/rooms/:id", async (req, res) => {
      const roomId = req.params.id;
      const result = await roomCollection.findOne({
        _id: new ObjectId(roomId),
      });
      // get all rooms for host
      res.send(result);
    });
    // delete a room
    app.delete("/room/delete", async (req, res) => {
      const roomId = req.query.roomId;
      const result = await roomCollection.deleteOne({
        _id: ObjectId.createFromHexString(roomId),
      });
      res.send(result);
    });

    // update a room
    app.put("/room/update", async (req, res) => {
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
    app.get("/stripe-publishable-key", (req, res) => {
      res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
    });

    // create payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const roomInfo = req.body;
      const roomID = roomInfo?.roomID;
      const price = roomInfo?.price;
      console.log("id --->", ObjectId.createFromHexString(roomID));
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
    app.put("/book/room/:id", async (req, res) => {
      const id = req.params.id;
      const roomDetails = req.body;
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

        const result = await bookedRoomsCollection.insertOne(roomDetails);
        res.send(result);
      } catch (error) {
        return res.status(400).send({ error: { message: error.message } });
      }
    });

    // get all booked rooms
    app.get("/booked-rooms/:email", async (req, res) => {
      const email = req.params.email;
      try {
        const result = await bookedRoomsCollection
          .find({ "guest.email": email })
          .toArray();
        res.send(result);
      } catch (error) {
        return res.status(400).send({ error: error.message });
      }
    });

    // save review data
    app.post("/rooms/ratings", async (req, res) => {
      const ratingData = req.body;
      const result = await reviewCollection.insertOne(ratingData);
      res.send(result);
    });
    // get room reviews
    app.get("/rooms/ratings/:id", async (req, res) => {
      const roomId = req.params.id;
      const result = await reviewCollection.find({ roomId }).toArray();
      res.send(result);
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
