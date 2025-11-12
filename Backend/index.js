const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const authRoutes = require("./routes/authRoutes.js");
const { connectMongoDb } = require("./Config/mongodb.js");
const { DB_NAME } = require("./constants");
const { userRouter } = require("./Routes/UserRoutes.js");

dotenv.config();
const app = express();

connectMongoDb(`${process.env.MONGODB_URI}/${DB_NAME}`)
  .then(() => console.log("Mongodb is connected successfully"))
  .catch((error) => console.log(" Error in connecting with mongodb:", error));

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("This is the home page");
});

// Routes 
app.use('/api/user',userRouter)

app.listen(process.env.PORT, () => {
  console.log("Server is running peacefully");
});