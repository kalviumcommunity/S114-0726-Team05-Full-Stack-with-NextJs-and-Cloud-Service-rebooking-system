import mongoose from "mongoose";
import Booking from "../models/Booking.js";


const validateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid booking ID");
    error.statusCode = 400;
    throw error;
  }
};


const validateDate = (date) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    const error = new Error("Invalid booking date");
    error.statusCode = 400;
    throw error;
  }

  return parsedDate;
};


/*
  Create a new booking
*/
export const createBooking = async (userId, data) => {
  const {
    service,
    category,
    professional,
    date,
    time,
    address,
    price,
    notes
  } = data;


  if (!service || !service.trim()) {
    const error = new Error("Service is required");
    error.statusCode = 400;
    throw error;
  }


  if (!date) {
    const error = new Error("Date is required");
    error.statusCode = 400;
    throw error;
  }


  if (!time || !time.trim()) {
    const error = new Error("Time is required");
    error.statusCode = 400;
    throw error;
  }


  if (!address || !address.trim()) {
    const error = new Error("Address is required");
    error.statusCode = 400;
    throw error;
  }


  if (
    price === undefined ||
    price === null ||
    Number.isNaN(Number(price))
  ) {
    const error = new Error("Valid price is required");
    error.statusCode = 400;
    throw error;
  }


  const booking = await Booking.create({
    user: userId,

    service: service.trim(),

    category: category
      ? category.trim()
      : "",

    professional: professional
      ? professional.trim()
      : "",

    date: validateDate(date),

    time: time.trim(),

    address: address.trim(),

    price: Number(price),

    notes: notes
      ? notes.trim()
      : "",

    status: "pending"
  });


  return booking;
};


/*
  Get all bookings belonging to the logged-in user
*/
export const getUserBookings = async (userId) => {
  const bookings = await Booking.find({
    user: userId
  })
    .sort({
      createdAt: -1
    });

  return bookings;
};


/*
  Alias so either name can be used
*/
export const getMyBookings = getUserBookings;


/*
  Get one booking
*/
export const getBookingById = async (
  bookingId,
  userId
) => {

  validateId(bookingId);


  const booking = await Booking.findOne({
    _id: bookingId,
    user: userId
  });


  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }


  return booking;
};


/*
  Update booking
*/
export const updateBooking = async (
  bookingId,
  userId,
  data
) => {

  const booking =
    await getBookingById(
      bookingId,
      userId
    );


  if (
    booking.status === "completed" ||
    booking.status === "cancelled"
  ) {
    const error = new Error(
      "This booking can no longer be updated"
    );

    error.statusCode = 400;

    throw error;
  }


  const {
    service,
    category,
    professional,
    date,
    time,
    address,
    price,
    notes
  } = data;


  if (service !== undefined) {
    if (!service.trim()) {
      const error = new Error(
        "Service cannot be empty"
      );

      error.statusCode = 400;

      throw error;
    }

    booking.service = service.trim();
  }


  if (category !== undefined) {
    booking.category = category.trim();
  }


  if (professional !== undefined) {
    booking.professional =
      professional.trim();
  }


  if (date !== undefined) {
    booking.date = validateDate(date);
  }


  if (time !== undefined) {
    if (!time.trim()) {
      const error = new Error(
        "Time cannot be empty"
      );

      error.statusCode = 400;

      throw error;
    }

    booking.time = time.trim();
  }


  if (address !== undefined) {
    if (!address.trim()) {
      const error = new Error(
        "Address cannot be empty"
      );

      error.statusCode = 400;

      throw error;
    }

    booking.address = address.trim();
  }


  if (price !== undefined) {
    if (Number.isNaN(Number(price))) {
      const error = new Error(
        "Invalid price"
      );

      error.statusCode = 400;

      throw error;
    }

    booking.price = Number(price);
  }


  if (notes !== undefined) {
    booking.notes = notes.trim();
  }


  await booking.save();


  return booking;
};


/*
  Reschedule booking
*/
export const rescheduleBooking = async (
  bookingId,
  userId,
  date,
  time
) => {

  const booking =
    await getBookingById(
      bookingId,
      userId
    );


  if (
    booking.status === "completed" ||
    booking.status === "cancelled"
  ) {
    const error = new Error(
      "This booking cannot be rescheduled"
    );

    error.statusCode = 400;

    throw error;
  }


  if (!date || !time) {
    const error = new Error(
      "New date and time are required"
    );

    error.statusCode = 400;

    throw error;
  }


  booking.date =
    validateDate(date);

  booking.time =
    time.trim();

  booking.status =
    "pending";


  await booking.save();


  return booking;
};


/*
  Cancel booking
*/
export const cancelBooking = async (
  bookingId,
  userId,
  reason
) => {

  const booking =
    await getBookingById(
      bookingId,
      userId
    );


  if (booking.status === "completed") {
    const error = new Error(
      "Completed booking cannot be cancelled"
    );

    error.statusCode = 400;

    throw error;
  }


  if (booking.status === "cancelled") {
    const error = new Error(
      "Booking is already cancelled"
    );

    error.statusCode = 400;

    throw error;
  }


  booking.status =
    "cancelled";


  booking.cancellationReason =
    reason
      ? reason.trim()
      : "";


  await booking.save();


  return booking;
};