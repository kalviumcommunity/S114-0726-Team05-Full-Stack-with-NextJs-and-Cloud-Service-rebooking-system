import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useBookings } from "../context/BookingContext";

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addBooking } = useBookings();

  const booking =
    location.state?.booking ||
    JSON.parse(
      localStorage.getItem("pending_booking") ||
      "null"
    );

  function finishBooking() {
    if (booking) {
      addBooking(booking);
      localStorage.removeItem("pending_booking");
    }

    navigate("/dashboard");
  }

  if (!booking) {
    return (
      <AppLayout>
        <div className="empty-state">
          <h2>No booking selected</h2>

          <button
            className="auth-submit"
            onClick={() => navigate("/calendar")}
          >
            Book an appointment
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="confirmation-page">
        <div className="confirmation-card">
          <div className="success-icon">
            ✓
          </div>

          <span className="category-label">
            CONFIRMED
          </span>

          <h1>Appointment confirmed!</h1>

          <p>
            Your appointment has been successfully
            booked.
          </p>

          <div className="confirmation-details">
            <div>
              <span>Service</span>
              <strong>{booking.service}</strong>
            </div>

            <div>
              <span>Professional</span>
              <strong>
                {booking.professional}
              </strong>
            </div>

            <div>
              <span>Date</span>
              <strong>{booking.date}</strong>
            </div>

            <div>
              <span>Time</span>
              <strong>{booking.time}</strong>
            </div>

            <div>
              <span>Duration</span>
              <strong>
                {booking.duration || "60 min"}
              </strong>
            </div>

            <div>
              <span>Price</span>
              <strong>
                {booking.price || "$50"}
              </strong>
            </div>
          </div>

          <button
            className="auth-submit"
            onClick={finishBooking}
          >
            Done →
          </button>

          <button
            className="outline-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </div>
    </AppLayout>
  );
}