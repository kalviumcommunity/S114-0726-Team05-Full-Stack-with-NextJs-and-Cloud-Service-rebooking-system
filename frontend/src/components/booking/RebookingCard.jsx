import React from "react";

export default function RebookingCard({
  booking,
  selected,
  onSelect,
}) {
  return (
    <button
      className={
        selected
          ? "rebooking-card selected"
          : "rebooking-card"
      }
      onClick={() => onSelect(booking)}
    >
      <div className="rebooking-top">
        <span className="category-label">
          {booking.category}
        </span>

        {selected && (
          <span className="check-circle">✓</span>
        )}
      </div>

      <h3>{booking.service}</h3>

      <p>with {booking.professional}</p>

      <div className="rebooking-bottom">
        <span>{booking.duration}</span>
        <strong>{booking.price}</strong>
      </div>
    </button>
  );
}