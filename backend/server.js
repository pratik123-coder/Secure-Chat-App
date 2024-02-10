import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";

//Route Imports
import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/",(req,res) => {
  res.send("HEllo World") 
});

app.use("/api/auth",authRoutes);

connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000 , () => {
    console.log(`Server is running at port ${process.env.PORT}`)
  })
})
.catch((err) => {
  console.log("MongoDB Conntection has failed due to ", err);
})
