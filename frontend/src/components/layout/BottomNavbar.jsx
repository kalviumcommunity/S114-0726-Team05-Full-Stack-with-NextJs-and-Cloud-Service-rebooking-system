import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    ["Dashboard", "/dashboard", "⌂"],
    ["Bookings", "/bookings", "▣"],
    ["Rebook", "/rebook", "↻"],
    ["Calendar", "/calendar", "□"],
    ["Settings", "/settings", "⚙"],
  ];

  return (
    <nav className="bottom-navbar">
      {links.map(([label, path, icon]) => (
        <button
          key={path}
          className={
            location.pathname === path
              ? "bottom-link active"
              : "bottom-link"
          }
          onClick={() => navigate(path)}
        >
          <span>{icon}</span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}