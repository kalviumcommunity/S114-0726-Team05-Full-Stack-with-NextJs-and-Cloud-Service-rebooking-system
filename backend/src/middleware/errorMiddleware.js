const errorMiddleware = (err, req, res, next) => {
  console.error("ERROR:", err);


  const statusCode =
    err.statusCode ||
    err.status ||
    500;


  const message =
    err.message ||
    "Internal server error";


  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(
      (error) => error.message
    );

    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors
    });
  }


  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field =
      Object.keys(err.keyPattern || {})[0] ||
      "field";

    return res.status(409).json({
      success: false,
      message: `${field} already exists`
    });
  }


  // Mongoose invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID"
    });
  }


  return res.status(statusCode).json({
    success: false,
    message
  });
};


export default errorMiddleware;