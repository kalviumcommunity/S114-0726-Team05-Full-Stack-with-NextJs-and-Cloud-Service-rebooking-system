import React from "react";

export default function EmptyState({
  title = "Nothing here yet",
  text = "There is no information to display.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">○</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}