import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function TopNavbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const name = user?.name || "User";

  return (
    <header className="top-navbar">
      <div>
        <span className="mobile-brand">ProBook</span>
      </div>

      <div className="top-actions">
        <button
          className="secondary-button"
          onClick={() => navigate("/rebook")}
        >
          Rebook now
        </button>

        <button
          className="notification-button"
          onClick={() => navigate("/notifications")}
        >
          🔔
        </button>

        <button
          className="user-button"
          onClick={() => navigate("/settings")}
        >
          <span className="user-avatar">
            {name.charAt(0).toUpperCase()}
          </span>

          <span className="user-name">
            {name}
          </span>
        </button>
      </div>
    </header>
  );
}