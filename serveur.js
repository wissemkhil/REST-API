const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
// database connection
mongoose
  .connect("mongodb://localhost:27017/checkrest")
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("could not connect to mongodb", err));
app.use(express.json());
app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listenning on port ${port}`));