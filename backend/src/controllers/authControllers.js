import {
  registerUser,
  loginUser
} from "../services/authService.js";

import validateEmail from "../utils/validateEmail.js";


// ==========================================
// REGISTER USER
// POST /api/auth/register
// ==========================================

export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // Call service
    const result = await registerUser({
      name,
      email,
      password
    });

    // Send response
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: result.user,
      token: result.token
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// LOGIN USER
// POST /api/auth/login
// ==========================================

export const login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    // Call login service
    const result = await loginUser({
      email,
      password
    });

    // Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: result.user,
      token: result.token
    });

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: error.message
    });

  }
};