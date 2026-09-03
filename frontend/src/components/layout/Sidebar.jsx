import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
    },
    {
      label: "My Bookings",
      path: "/bookings",
      icon: "▣",
    },
    {
      label: "Rebook",
      path: "/rebook",
      icon: "↻",
    },
    {
      label: "Rebook now",
      path: "/rebook",
      icon: "⚡",
    },
    {
      label: "Calendar",
      path: "/calendar",
      icon: "□",
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: "♢",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "⚙",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">P</div>
        <span>ProBook</span>
      </div>

      <nav className="sidebar-links">
        {links.map((link) => (
          <button
            key={link.path}
            className={
              location.pathname === link.path
                ? "sidebar-link active"
                : "sidebar-link"
            }
            onClick={() => navigate(link.path)}
          >
            <span>{link.icon}</span>
            {link.label}
          </button>
        ))}
      </nav>

      <button
        className="sidebar-link logout-link"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        <span>↪</span>
        Logout
      </button>
    </aside>
  );
}