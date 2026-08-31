import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    service: {
      type: String,
      required: true,
      trim: true
    },

    professional: {
      type: String,
      default: ""
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled"
      ],
      default: "pending"
    },

    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;