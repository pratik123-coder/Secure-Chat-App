import { User } from "../models/user.model";

export const login = (req,res) => {
  console.log("Login User");
}

export const logout = (req,res) => {
  console.log("Logout User");
}

export const signup = async (req,res) => {
  try {
    const{ fulName, userName, password, confirmPassword } = req.body;

    if(password != confirmPassword){
      return res.status(400).json({
        error:"Passwords Don't match"
      })
    }
    const user = await User.findOne({username});

    if(user){
      return res.status(400).json({
        error:"Username Already Exists"
      })
    }
    //Hash Password
  }
  catch (error) {
    console.log(error);
  }
};