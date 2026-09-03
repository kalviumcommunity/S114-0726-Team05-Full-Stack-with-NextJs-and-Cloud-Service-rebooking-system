import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import RebookingCard from "../components/booking/RebookingCard";
import BookingSummary from "../components/booking/BookingSummary";
import { useBookings } from "../context/BookingContext";

export default function Rebook() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookings } = useBookings();

  const passedBooking = location.state?.booking;

  const [selected, setSelected] = useState(
    passedBooking || null
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const times = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const previousBookings = bookings.filter(
    (booking) => booking.status !== "Cancelled"
  );

  function confirmBooking() {
    if (!selected) {
      setError("Please select a service.");
      return;
    }

    if (!date) {
      setError("Please choose a date.");
      return;
    }

    if (!time) {
      setError("Please choose a time.");
      return;
    }

    const booking = {
      ...selected,
      date,
      time,
    };

    localStorage.setItem(
      "pending_booking",
      JSON.stringify(booking)
    );

    navigate("/confirmation", {
      state: {
        booking,
      },
    });
  }

  return (
    <AppLayout>
      <div className="page-heading">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <span className="category-label">
          QUICK BOOKING
        </span>

        <h1>Rebook an appointment</h1>

        <p>
          Choose a previous service and select a
          new date and time.
        </p>
      </div>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="category-label">
              STEP 1
            </span>
            <h2>Select a service</h2>
          </div>
        </div>

        <div className="rebooking-grid">
          {previousBookings.map((booking) => (
            <RebookingCard
              key={booking.id}
              booking={booking}
              selected={selected?.id === booking.id}
              onSelect={(item) => {
                setSelected(item);
                setError("");
              }}
            />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="category-label">
              STEP 2
            </span>
            <h2>Choose date & time</h2>
          </div>
        </div>

        <div className="date-time-box">
          <div className="input-group">
            <label>Appointment date</label>

            <input
              type="date"
              value={date}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) => {
                setDate(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="input-group">
            <label>Available time</label>

            <div className="time-grid">
              {times.map((item) => (
                <button
                  key={item}
                  className={
                    time === item
                      ? "time-button selected"
                      : "time-button"
                  }
                  onClick={() => {
                    setTime(item);
                    setError("");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookingSummary
        booking={selected}
        date={date}
        time={time}
      />

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <button
        className="auth-submit"
        onClick={confirmBooking}
      >
        Confirm rebooking →
      </button>
    </AppLayout>
  );
}