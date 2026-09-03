import express from "express";

import {
  register,
  login,
  loginWithGoogle,
  getMe
} from "../controllers/authControllers.js";

import authMiddleware
  from "../middleware/authMiddleware.js";


const router = express.Router();


router.post(
  "/register",
  register
);


router.post(
  "/login",
  login
);

router.post(
  "/google",
  loginWithGoogle
);


router.get(
  "/me",
  authMiddleware,
  getMe
);


export default router;