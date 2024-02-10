export const login = (req,res) => {
  console.log("Login User");
}

export const logout = (req,res) => {
  console.log("Logout User");
}

export const signup = async (req,res) => {
  try {
    const{ fulName, userName, password, confirmPassword } = req.body;
  }
  catch (error) {
    console.log(error);
  }
};