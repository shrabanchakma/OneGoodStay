const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000 || process.env.PORT;
app.use(
  cors({
    origin: ["http://localhost:5173/"],
  })
);

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.OneGoodStay}:${process.env.DB_PASSWORD}@cluster0.hrheaqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    app.get("/users", async (req, res) => {
      console.log("it's connected to the server");
      res.send("it's connected to the server");
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
