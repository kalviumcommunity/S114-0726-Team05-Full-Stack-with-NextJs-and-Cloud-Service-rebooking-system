import {
  createBooking,
  getUserBookings,
  cancelBooking
} from "../services/bookingService.js";


// ==========================================
// CREATE BOOKING
// POST /api/bookings
// ==========================================

export const create = async (req, res, next) => {
  try {

    const {
      service,
      professional,
      date,
      time,
      address,
      price
    } = req.body;


    // Check required fields
    if (
      !service ||
      !date ||
      !time ||
      !address ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All booking details are required"
      });
    }


    // Create booking
    const booking = await createBooking(
      req.user._id,
      {
        service,
        professional,
        date,
        time,
        address,
        price
      }
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



// ==========================================
// GET USER BOOKINGS
// GET /api/bookings/my-bookings
// ==========================================

export const getMine = async (req, res, next) => {
  try {

    const bookings = await getUserBookings(
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



// ==========================================
// CANCEL BOOKING
// PATCH /api/bookings/:id/cancel
// ==========================================

export const cancel = async (req, res, next) => {
  try {

    const booking = await cancelBooking(
      req.params.id,
      req.user._id
    );


    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking
    });

  } catch (error) {

    if (error.message === "Booking not found") {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    next(error);
  }
};

// Booking Controllers handle the logic for creating, retrieving, and canceling bookings. They interact with the bookingService to perform database operations and return appropriate responses to the client.