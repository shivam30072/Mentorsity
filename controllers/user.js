const User = require("../models/User");

const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const userDetails = {
      email,
      password,
    };

    const user = await User.create(userDetails);
    if (user) {
      return res.status(201).json({ message: "user created successfully" });
    } else {
      res.status(400);
      throw new Error("Failed to create a user");
    }
  } catch (error) {
    res.status(404).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        res.status(400);
        throw new Error("Incorrect Password");
      }
      req.session.userId = user.id;

      return res.status(200).json({ message: "user login successfull", user });
    } else {
      res.status(400);
      throw new Error("User Not Found");
    }
  } catch (error) {
    res.status(404).json({ message: "Server Error" });
  }
};
module.exports = { signUpUser, loginUser };
