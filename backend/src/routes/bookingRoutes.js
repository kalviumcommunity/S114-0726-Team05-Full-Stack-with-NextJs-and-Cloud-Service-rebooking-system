import express from "express";

import authMiddleware
  from "../middleware/authMiddleware.js";

import {
  createBooking,
  getMyBookings,
  getBooking,
  updateBooking,
  rescheduleBooking,
  cancelBooking
} from "../controllers/bookingControllers.js";


const router =
  express.Router();


router.post(
  "/",
  authMiddleware,
  createBooking
);


router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);


router.get(
  "/:id",
  authMiddleware,
  getBooking
);


router.patch(
  "/:id",
  authMiddleware,
  updateBooking
);


router.patch(
  "/:id/reschedule",
  authMiddleware,
  rescheduleBooking
);


router.patch(
  "/:id/cancel",
  authMiddleware,
  cancelBooking
);


export default router;