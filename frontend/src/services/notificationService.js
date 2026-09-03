import api from "./api";

export const getNotifications = () =>
  api("/notifications");

export const markNotificationRead = (id) =>
  api(`/notifications/${id}/read`, {
    method: "PATCH",
  });