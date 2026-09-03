import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";

export default function Notifications() {
  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        title: "Booking confirmed",
        text: "Your Hair Styling appointment is confirmed.",
        read: false,
      },
      {
        id: 2,
        title: "Appointment reminder",
        text: "You have an appointment coming up tomorrow.",
        read: false,
      },
      {
        id: 3,
        title: "Welcome to ProBook",
        text: "Your account has been created successfully.",
        read: true,
      },
    ]);

  function markRead(id) {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  }

  return (
    <AppLayout>
      <div className="page-heading">
        <span className="category-label">
          UPDATES
        </span>

        <h1>Notifications</h1>

        <p>
          Stay updated with your appointments.
        </p>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => (
          <button
            key={notification.id}
            className={
              notification.read
                ? "notification-card read"
                : "notification-card"
            }
            onClick={() =>
              markRead(notification.id)
            }
          >
            <div className="notification-dot">
              {notification.read ? "✓" : "•"}
            </div>

            <div>
              <strong>
                {notification.title}
              </strong>

              <p>{notification.text}</p>
            </div>
          </button>
        ))}
      </div>
    </AppLayout>
  );
}