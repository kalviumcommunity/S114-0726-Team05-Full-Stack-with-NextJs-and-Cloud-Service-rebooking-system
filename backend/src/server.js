import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";


// ==================================================
// LOAD ENVIRONMENT VARIABLES
// ==================================================

dotenv.config();


// ==================================================
// CREATE EXPRESS APP
// ==================================================

const app = express();


// ==================================================
// CONNECT TO MONGODB
// ==================================================

connectDB();


// ==================================================
// CORS
// ==================================================

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:5174"
    ].filter(Boolean),
    credentials: true
  })
);


// ==================================================
// BODY PARSING
// ==================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);


// ==================================================
// ROOT ROUTE
// ==================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Urban Rebooking API is running"
  });
});


// ==================================================
// HEALTH CHECK
// ==================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy"
  });
});


// ==================================================
// AUTH ROUTES
// ==================================================

app.use(
  "/api/auth",
  authRoutes
);


// ==================================================
// USER ROUTES
// ==================================================

app.use(
  "/api/users",
  userRoutes
);


// ==================================================
// BOOKING ROUTES
// ==================================================

app.use(
  "/api/bookings",
  bookingRoutes
);


// ==================================================
// 404 MIDDLEWARE
// ==================================================

app.use(
  notFoundMiddleware
);


// ==================================================
// GLOBAL ERROR MIDDLEWARE
// ==================================================

app.use(
  errorMiddleware
);


// ==================================================
// SERVER PORT
// ==================================================

const PORT =
  process.env.PORT || 5000;


// ==================================================
// START SERVER
// ==================================================

app.listen(
  PORT,
  () => {
    console.log("");
    console.log("======================================");
    console.log("       URBAN REBOOKING BACKEND");
    console.log("======================================");
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`API:    http://localhost:${PORT}/api`);
    console.log(`Health: http://localhost:${PORT}/api/health`);
    console.log("======================================");
    console.log("");
  }
);