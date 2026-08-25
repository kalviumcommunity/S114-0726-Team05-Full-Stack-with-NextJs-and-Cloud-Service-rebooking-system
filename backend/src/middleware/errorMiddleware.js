export const errorHandler = (
  error,
  req,
  res,
  next
) => {

  console.error("ERROR:");
  console.error(error);


  // --------------------------------------
  // Default status code
  // --------------------------------------

  let statusCode = 500;

  let message =
    "Internal server error";


  // --------------------------------------
  // Custom error status
  // --------------------------------------

  if (error.statusCode) {
    statusCode = error.statusCode;
  }


  // --------------------------------------
  // Custom error message
  // --------------------------------------

  if (error.message) {
    message = error.message;
  }


  // --------------------------------------
  // MongoDB duplicate key
  // --------------------------------------

  if (error.code === 11000) {

    statusCode = 409;

    const field =
      Object.keys(error.keyPattern || {})[0];

    message =
      `${field || "Value"} already exists`;
  }


  // --------------------------------------
  // Mongoose validation error
  // --------------------------------------

  if (
    error.name === "ValidationError"
  ) {

    statusCode = 400;

    const messages =
      Object.values(error.errors)
        .map((err) => err.message);

    message = messages.join(", ");
  }


  // --------------------------------------
  // Invalid MongoDB ObjectId
  // --------------------------------------

  if (
    error.name === "CastError"
  ) {

    statusCode = 400;

    message = "Invalid ID";
  }


  // --------------------------------------
  // Send response
  // --------------------------------------

  return res.status(statusCode).json({

    success: false,

    message,

    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack
    })

  });
}; 