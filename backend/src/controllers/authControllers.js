import {
  registerUser,
  loginUser,
  loginWithGoogleUser,
  getCurrentUser
} from "../services/authService.js";


/*
  POST /api/auth/register
*/
export const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone
    } = req.body;

    const result = await registerUser({
      name,
      email,
      password,
      phone
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token: result.token,
      user: result.user
    });

  } catch (error) {
    next(error);
  }
};


/*
  POST /api/auth/login
*/
export const login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    const result = await loginUser({
      email,
      password
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user
    });

  } catch (error) {
    next(error);
  }
};


/*
  GET /api/auth/me

  Returns the currently authenticated user.
*/
export const getMe = async (req, res, next) => {
  try {
    const user = await getCurrentUser(
      req.user._id
    );

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    next(error);
  }
};

export const loginWithGoogle = async (req, res, next) => {
  try {
    const result = await loginWithGoogleUser(req.body.credential);

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token: result.token,
      user: result.user
    });
  } catch (error) {
    next(error);
  }
};