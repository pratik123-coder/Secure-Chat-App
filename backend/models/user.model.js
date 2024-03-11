import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  profilePic: {
    type: String,
    default:""
  },
  password: {
    type: String,
    required: [true, "Password is Required"]
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  }
},
  {
    timestamps: true
})

export const User = mongoose.model("User",userSchema);
