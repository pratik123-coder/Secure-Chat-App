import express from "express";
import dotenv from "dotenv";
dotenv.config();

//Route Imports
import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/",(req,res) => {
  res.send("HEllo World")
});

app.use("/api/auth",authRoutes);

app.listen(PORT,() => console.log(`server is running on port ${PORT}`));