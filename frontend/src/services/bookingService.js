import api from "./api";

export const getBookings = () =>
  api("/bookings/my-bookings");

export const getBookingById = (id) =>
  api(`/bookings/${id}`);

export const createBooking = (data) =>
  api("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateBooking = (id, data) =>
  api(`/bookings/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const rescheduleBooking = (id, data) =>
  api(`/bookings/${id}/reschedule`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const cancelBooking = (id, reason = "") =>
  api(`/bookings/${id}/cancel`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  });