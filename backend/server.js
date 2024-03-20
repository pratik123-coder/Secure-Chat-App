import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";

//Route Imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import { app, server } from "./socket/socket.js";
const PORT = process.env.PORT || 8000;


app.use(express.json());  //to parse the incoming requests from JSON payloads (from req.body)
app.use(cookieParser()); //middleware for cookie

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

connectDB()
.then(() => {
  server.listen(process.env.PORT || 8000 , () => {
    console.log(`Server is running at port ${PORT}`)
  })
})
.catch((err) => {
  console.log("MongoDB Conntection has failed due to ", err);
})
