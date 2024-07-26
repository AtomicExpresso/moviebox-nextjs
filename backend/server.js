require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const userRoutes = require("./routes/userRoutes");
const movieActionRoutes = require("./routes/movieActionRoute");

//Middle-ware
app.use(express.json());
app.use(cors());

//Routing
app.use('/api/users/', userRoutes);
app.use('/api/movieActions/', movieActionRoutes);

//Connect to mongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
      console.log(`DB connected, listening to port ${process.env.PORT}`)
    })
  } catch (error){
    console.log(error)
  }
}

startServer()