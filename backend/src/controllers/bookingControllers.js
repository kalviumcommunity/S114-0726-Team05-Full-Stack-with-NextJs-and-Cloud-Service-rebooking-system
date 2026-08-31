import {
  createBooking as createBookingService,
  getUserBookings,
  getBookingById,
  updateBooking as updateBookingService,
  rescheduleBooking as rescheduleBookingService,
  cancelBooking as cancelBookingService
} from "../services/bookingService.js";


/*
====================================================
CREATE BOOKING
POST /api/bookings
====================================================

Example request:

{
  "service": "Home Cleaning",
  "category": "Cleaning",
  "professional": "John",
  "date": "2026-09-10",
  "time": "10:00 AM",
  "address": "Hyderabad",
  "price": 1500,
  "notes": "Please bring cleaning supplies"
}
====================================================
*/
export const createBooking = async (
  req,
  res,
  next
) => {

  try {

    const booking =
      await createBookingService(
        req.user._id,
        req.body
      );


    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

  } catch (error) {
    next(error);
  }
};


/*
====================================================
GET MY BOOKINGS
GET /api/bookings/my-bookings
====================================================
*/
export const getMyBookings = async (
  req,
  res,
  next
) => {

  try {

    const bookings =
      await getUserBookings(
        req.user._id
      );


    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });

  } catch (error) {
    next(error);
  }
};


/*
====================================================
GET SINGLE BOOKING
GET /api/bookings/:id
====================================================
*/
export const getBooking = async (
  req,
  res,
  next
) => {

  try {

    const booking =
      await getBookingById(
        req.params.id,
        req.user._id
      );


    return res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {
    next(error);
  }
};


/*
====================================================
UPDATE BOOKING
PATCH /api/bookings/:id
====================================================
*/
export const updateBooking = async (
  req,
  res,
  next
) => {

  try {

    const booking =
      await updateBookingService(
        req.params.id,
        req.user._id,
        req.body
      );


    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking
    });

  } catch (error) {
    next(error);
  }
};


/*
====================================================
RESCHEDULE BOOKING
PATCH /api/bookings/:id/reschedule
====================================================

Example request:

{
  "date": "2026-09-20",
  "time": "2:00 PM"
}
====================================================
*/
export const rescheduleBooking = async (
  req,
  res,
  next
) => {

  try {

    const {
      date,
      time
    } = req.body;


    const booking =
      await rescheduleBookingService(
        req.params.id,
        req.user._id,
        date,
        time
      );


    return res.status(200).json({
      success: true,
      message: "Booking rescheduled successfully",
      booking
    });

  } catch (error) {
    next(error);
  }
};


/*
====================================================
CANCEL BOOKING
PATCH /api/bookings/:id/cancel
====================================================

Example request:

{
  "reason": "I am no longer available"
}
====================================================
*/
export const cancelBooking = async (
  req,
  res,
  next
) => {

  try {

    const {
      reason
    } = req.body;


    const booking =
      await cancelBookingService(
        req.params.id,
        req.user._id,
        reason
      );


    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking
    });

  } catch (error) {
    next(error);
  }
};

// Booking Controllers handle the logic for creating, retrieving, and canceling bookings. They interact with the bookingService to perform database operations and return appropriate responses to the client.