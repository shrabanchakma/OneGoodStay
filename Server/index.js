const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000 || process.env.PORT;
app.use(
  cors({
    origin: ["http://localhost:5173", "https://api.imgbb.com/1/upload"],
  })
);
app.use(express.json());
require("dotenv").config();

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
    // save rooms in database
    app.post("/rooms", async (req, res) => {
      const newRoom = req.body;
      const result = await roomCollection.insertOne(newRoom);
      res.send(result);
    });
    // get all rooms from database
    app.get("/rooms", async (req, res) => {
      const email = req.body;
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
      console.log(roomId);
      const result = await roomCollection.findOne({
        _id: new ObjectId(roomId),
      });
      // get all rooms for host
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
