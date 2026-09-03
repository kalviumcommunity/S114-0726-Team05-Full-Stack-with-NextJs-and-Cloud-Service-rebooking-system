import React from "react";

export default function StatusBadge({ status }) {
  const className =
    status?.toLowerCase() === "cancelled"
      ? "status-badge cancelled"
      : "status-badge";

  return (
    <span className={className}>
      {status}
    </span>
  );
}