import React from "react";
import AppLayout from "../components/layout/AppLayout";
import BookingCard from "../components/booking/BookingCard";
import { useBookings } from "../context/BookingContext";

export default function BookingHistory() {
  const { bookings, cancelBooking } = useBookings();

  return (
    <AppLayout>
      <div className="page-heading">
        <span className="category-label">
          HISTORY
        </span>

        <h1>My bookings</h1>

        <p>
          View and manage all your appointments.
        </p>
      </div>

      <div className="booking-list">
        {bookings.length === 0 ? (
          <div className="empty-state">
            <h3>No bookings yet</h3>
            <p>
              Your appointments will appear here.
            </p>
          </div>
        ) : (
          bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={cancelBooking}
            />
          ))
        )}
      </div>
    </AppLayout>
  );
}