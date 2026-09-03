import React from "react";

export default function BookingSummary({
  booking,
  date,
  time,
}) {
  return (
    <div className="booking-summary">
      <div>
        <span className="category-label">
          BOOKING SUMMARY
        </span>

        <h3>
          {booking?.service || "Select a service"}
        </h3>

        {booking && (
          <p>
            {booking.professional}
            {date && ` • ${date}`}
            {time && ` • ${time}`}
          </p>
        )}
      </div>

      {booking && (
        <strong className="summary-price">
          {booking.price}
        </strong>
      )}
    </div>
  );
}