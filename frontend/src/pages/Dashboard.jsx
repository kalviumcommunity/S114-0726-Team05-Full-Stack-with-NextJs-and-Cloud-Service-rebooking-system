import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingContext";
import BookingCard from "../components/booking/BookingCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings } = useBookings();

  const upcoming = bookings.filter(
    (booking) => booking.status !== "Cancelled"
  );

  return (
    <AppLayout>
      <div className="dashboard-header">
        <div>
          <span className="category-label">
            WELCOME BACK
          </span>

          <h1>
            Hello, {user?.name || "User"} 👋
          </h1>

          <p>
            Manage your bookings and appointments.
          </p>
        </div>

        <button
          className="notification-button"
          onClick={() => navigate("/notifications")}
        >
          🔔
        </button>
      </div>

      <div className="action-grid">
        <button
          className="action-card dark"
          onClick={() => navigate("/rebook")}
        >
          <span className="action-symbol">↻</span>

          <div>
            <strong>Rebook an appointment</strong>
            <p>
              Quickly book a previous service again.
            </p>
          </div>

          <span>→</span>
        </button>

        <button
          className="action-card"
          onClick={() => navigate("/calendar")}
        >
          <span className="action-symbol">＋</span>

          <div>
            <strong>Book a new appointment</strong>
            <p>
              Choose a professional, date and time.
            </p>
          </div>

          <span>→</span>
        </button>
      </div>

      <div className="quick-access-bar">
        <button
          className="primary-button full-width"
          onClick={() => navigate("/rebook")}
        >
          Rebook now
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total bookings</span>
          <strong>{bookings.length}</strong>
        </div>

        <div className="stat-card">
          <span>Upcoming</span>
          <strong>{upcoming.length}</strong>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>9</strong>
        </div>
      </div>

      <section>
        <div className="section-heading">
          <div>
            <span className="category-label">
              YOUR SCHEDULE
            </span>

            <h2>Upcoming appointments</h2>
          </div>

          <button
            className="text-button"
            onClick={() => navigate("/bookings")}
          >
            View all →
          </button>
        </div>

        <div className="booking-list">
          {upcoming.slice(0, 3).map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
            />
          ))}
        </div>
      </section>

      <div className="dashboard-banner">
        <div>
          <span className="category-label">
            QUICK REBOOK
          </span>

          <h2>
            Need the same appointment again?
          </h2>

          <p>
            Rebook one of your previous services
            in just a few clicks.
          </p>
        </div>

        <button
          className="white-button"
          onClick={() => navigate("/rebook")}
        >
          Rebook now →
        </button>
      </div>
    </AppLayout>
  );
}