import express from "express";
import dotenv from "dotenv";
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/",(req,res) => {
  res.send("HEllo World")
});

app.listen(PORT,() => console.log(`server is running on port ${PORT}`));