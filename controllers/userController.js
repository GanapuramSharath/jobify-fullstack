import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({
    user: userWithoutPassword,
  });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
  
    const obj = { ...req.body };

    delete obj.password;

    if (req.file) {
      obj.avatar = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj, {
      new: true,
    });

    res.status(200).json({
      msg: "user updated",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: error.message,
    });
  }
};