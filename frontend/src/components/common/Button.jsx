import React from "react";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`app-button ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}