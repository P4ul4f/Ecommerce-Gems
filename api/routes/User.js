const express = require("express");
const userRoute = express.Router();
const AsynHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../tokenGenerate");
const protect = require("../middleware/Auth");

//login route
userRoute.post(
  "/login",
  AsynHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

//register route
userRoute.post(
  "/register",
  AsynHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400);
      throw new Error("User already exist");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        });
        console.log(_id, name, email);
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  })
);

// get auth profile data
userRoute.get(
  "/profile",
  protect,
  AsynHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("USER NOT FOUND");
    }
  })
);

//user profile update
userRoute.put(
  "/profile",
  protect,
  AsynHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name= req.body.name || user.name;
        user.email= req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            createdAt: user.createdAt,
          });

    } else {
        res.status(404);
        throw new Error("USER NOT FOUND")
    }
  })
);

// Ruta para cambiar la contraseña
userRoute.post(
  "/forgot-password",
  AsynHandler(async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  })
);


module.exports = userRoute;
