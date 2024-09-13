import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.js";
import Token from "../model/token.js";

dotenv.config();
export const SignupUser = async (req, res) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    };
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ msg: "Signup Successfull" });
  } catch (error) {
    return res.status(500).json({ msg: "Erro while signup the user" });
  }
};
export const loginUser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  try {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    } else {
      // Generate JWT token
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      return res
        .status(200)
        .json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: user.name,
          username: user.username,
        });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Erro while login user" });
  }
};
