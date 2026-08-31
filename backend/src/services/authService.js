import bcrypt from "bcryptjs";

import User from "../models/User.js";

import generateToken from "../utils/token.js";


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


export const registerUser = async ({
  name,
  email,
  password,
  phone
}) => {

  if (!name || !name.trim()) {
    const error = new Error(
      "Name is required"
    );

    error.statusCode = 400;

    throw error;
  }


  if (!email || !email.trim()) {
    const error = new Error(
      "Email is required"
    );

    error.statusCode = 400;

    throw error;
  }


  if (!password) {
    const error = new Error(
      "Password is required"
    );

    error.statusCode = 400;

    throw error;
  }


  if (password.length < 6) {
    const error = new Error(
      "Password must be at least 6 characters"
    );

    error.statusCode = 400;

    throw error;
  }


  const normalizedEmail =
    email.trim().toLowerCase();


  const existingUser =
    await User.findOne({
      email: normalizedEmail
    });


  if (existingUser) {
    const error = new Error(
      "An account with this email already exists"
    );

    error.statusCode = 409;

    throw error;
  }


  const hashedPassword =
    await bcrypt.hash(
      password,
      12
    );


  const user =
    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone
        ? phone.trim()
        : ""
    });


  const token =
    generateToken(user);


  return {
    token,
    user: formatUser(user)
  };
};


export const loginUser = async ({
  email,
  password
}) => {

  if (!email || !password) {
    const error = new Error(
      "Email and password are required"
    );

    error.statusCode = 400;

    throw error;
  }


  const normalizedEmail =
    email.trim().toLowerCase();


  const user =
    await User.findOne({
      email: normalizedEmail
    }).select("+password");


  if (!user) {
    const error = new Error(
      "Invalid email or password"
    );

    error.statusCode = 401;

    throw error;
  }


  const passwordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );


  if (!passwordCorrect) {
    const error = new Error(
      "Invalid email or password"
    );

    error.statusCode = 401;

    throw error;
  }


  const token =
    generateToken(user);


  return {
    token,
    user: formatUser(user)
  };
};


export const getCurrentUser = async (
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