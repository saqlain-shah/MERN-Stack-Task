import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import carRoute from "./routes/cars.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config(); //automatically loads environment variables from a . env file

const connect = async () => {
  //to handle unwanted errors during the execution
  try {
    await mongoose.connect(process.env.MONGO); //contains the URI connection string to MongoDB
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

//middlewares
app.use(cors()); //allows a server to indicate any origins other than its own.
app.use(cookieParser()); // parses cookies attached to the client request object
app.use(express.json()); // parse the incoming requests with JSON payloads

app.use("/api/auth", authRoute); //authRoute from "./routes/auth.js";
app.use("/api/users", usersRoute); // usersRoute from "./routes/users.js";
app.use("/api/cars", carRoute); // carRoute from "./routes/cars.js";

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Create a listener on the port 8800
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connect();
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
  console.log("Connected to Backend.");
});
