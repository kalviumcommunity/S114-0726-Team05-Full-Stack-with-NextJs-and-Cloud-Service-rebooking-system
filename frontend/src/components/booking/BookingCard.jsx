import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";

export default function BookingCard({
  booking,
  onCancel,
}) {
  const navigate = useNavigate();

  return (
    <article className="booking-card">
      <div className="booking-card-date">
        <strong>{booking.date}</strong>
        <span>{booking.time}</span>
      </div>

      <div className="booking-card-info">
        <span className="category-label">
          {booking.category}
        </span>

        <h3>{booking.service}</h3>

        <p>
          with {booking.professional}
        </p>
      </div>

      <StatusBadge status={booking.status} />

      <div className="booking-card-actions">
        {booking.status !== "Cancelled" && (
          <>
            <button
              className="small-button"
              onClick={() =>
                navigate("/rebook", {
                  state: { booking },
                })
              }
            >
              Rebook
            </button>

            {onCancel && (
              <button
                className="small-button danger"
                onClick={() => onCancel(booking.id)}
              >
                Cancel
              </button>
            )}
          </>
        )}
      </div>
    </article>
  );
}