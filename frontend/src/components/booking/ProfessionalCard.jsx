import React from "react";

export default function ProfessionalCard({
  professional,
  selected,
  onSelect,
}) {
  return (
    <button
      className={
        selected
          ? "professional-card selected"
          : "professional-card"
      }
      onClick={() => onSelect(professional)}
    >
      <div className="professional-avatar">
        {professional.name.charAt(0)}
      </div>

      <div>
        <strong>{professional.name}</strong>
        <span>{professional.speciality}</span>
        <small>★ {professional.rating}</small>
      </div>
    </button>
  );
}