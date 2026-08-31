import bcrypt from "bcryptjs";

import User from "../models/User.js";


const formatUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatar: user.avatar,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};


export const getUserProfile = async (
  userId
) => {

  const user =
    await User.findById(userId);


  if (!user) {
    const error = new Error(
      "User not found"
    );

    error.statusCode = 404;

    throw error;
  }


  return formatUser(user);
};


export const updateUserProfile = async (
  userId,
  data
) => {

  const user =
    await User.findById(userId);


  if (!user) {
    const error = new Error(
      "User not found"
    );

    error.statusCode = 404;

    throw error;
  }


  const {
    name,
    phone,
    address,
    avatar
  } = data;


  if (name !== undefined) {

    if (!name.trim()) {
      const error = new Error(
        "Name cannot be empty"
      );

      error.statusCode = 400;

      throw error;
    }

    user.name =
      name.trim();
  }


  if (phone !== undefined) {
    user.phone =
      phone.trim();
  }


  if (address !== undefined) {
    user.address =
      address.trim();
  }


  if (avatar !== undefined) {
    user.avatar =
      avatar.trim();
  }


  await user.save();


  return formatUser(user);
};


export const changeUserPassword = async (
  userId,
  currentPassword,
  newPassword
) => {

  if (
    !currentPassword ||
    !newPassword
  ) {

    const error = new Error(
      "Current password and new password are required"
    );

    error.statusCode = 400;

    throw error;
  }


  if (newPassword.length < 6) {

    const error = new Error(
      "New password must be at least 6 characters"
    );

    error.statusCode = 400;

    throw error;
  }


  const user =
    await User.findById(
      userId
    ).select("+password");


  if (!user) {

    const error = new Error(
      "User not found"
    );

    error.statusCode = 404;

    throw error;
  }


  const correct =
    await bcrypt.compare(
      currentPassword,
      user.password
    );


  if (!correct) {

    const error = new Error(
      "Current password is incorrect"
    );

    error.statusCode = 400;

    throw error;
  }


  user.password =
    await bcrypt.hash(
      newPassword,
      12
    );


  await user.save();


  return true;
};