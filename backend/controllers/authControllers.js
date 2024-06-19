const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, passwordConfirm, picture } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== passwordConfirm) {
    return res
      .status(401)
      .json({ message: "Password and password confirm are not same" });
  }

  const foundUser = await User.findOne({ email }).exec();
  if (foundUser) {
    return res.status(401).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    picture: picture || "",
    role: false,
  });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: user._id,
        role: user.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", accessToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    name: user.name,
    email: user.email,
    picture: user.picture,
    role: user.role,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "User does not exist" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(402).json({ message: "Wrong Password" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
        role: foundUser.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", accessToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    email: foundUser.email,
  });
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookie cleared" });
};

module.exports = { register, login, logout };
