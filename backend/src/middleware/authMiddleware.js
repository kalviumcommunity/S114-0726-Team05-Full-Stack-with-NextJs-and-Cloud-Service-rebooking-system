import jwt from "jsonwebtoken";
import User from "../models/User.js";



// AUTHENTICATION MIDDLEWARE

const protect = async (req, res, next) => {
  try {

    
    // Get Authorization header
   

    const authorization =
      req.headers.authorization;


    // Check if token exists
   

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }


   
    // Extract token
   

    const token =
      authorization.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing"
      });
    }


   
    // Verify JWT
   

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // --------------------------------------
    // Find user
    // --------------------------------------

    const user = await User
      .findById(decoded.id)
      .select("-password");


    // --------------------------------------
    // Check user exists
    // --------------------------------------

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists"
      });
    }


    // --------------------------------------
    // Attach user to request
    // --------------------------------------

    req.user = user;


   
    // Continue to controller
 

    next();

  } catch (error) {

    // Invalid / expired token
    

    if (
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token"
      });
    }


    if (
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Authentication token has expired"
      });
    }


    // Other errors
   

    return res.status(500).json({
      success: false,
      message: "Authentication failed"
    });
  }
};


export default protect;