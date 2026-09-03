import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  cancelBooking as cancelBookingApi,
  createBooking as createBookingApi,
  getBookings as getBookingsApi,
  updateBooking as updateBookingApi,
} from "../services/bookingService";

const BookingContext = createContext(null);

const normalizeBooking = (booking) => {
  const dateValue = booking.date
    ? new Date(booking.date)
    : null;

  return {
    ...booking,
    id: booking._id || booking.id,
    service: booking.service || "Service",
    category: booking.category || "General",
    professional: booking.professional || "Professional",
    date: dateValue && !Number.isNaN(dateValue.getTime())
      ? dateValue.toISOString().split("T")[0]
      : booking.date || "",
    time: booking.time || "",
    duration: booking.duration || "60 min",
    price:
      booking.price != null
        ? typeof booking.price === "number"
          ? `$${booking.price}`
          : booking.price
        : "$0",
    status:
      booking.status === "cancelled"
        ? "Cancelled"
        : booking.status === "confirmed"
          ? "Confirmed"
          : booking.status === "pending"
            ? "Pending"
            : booking.status || "Confirmed",
  };
};

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await getBookingsApi();
      const list = Array.isArray(response.bookings)
        ? response.bookings.map(normalizeBooking)
        : [];

      setBookings(list);
      localStorage.setItem("probook_bookings", JSON.stringify(list));
      return list;
    } catch (error) {
      const saved = localStorage.getItem("probook_bookings");
      if (saved) {
        try {
          setBookings(JSON.parse(saved));
        } catch {
          setBookings([]);
        }
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const addBooking = async (booking) => {
    const response = await createBookingApi({
      service: booking.service,
      category: booking.category || "General",
      professional: booking.professional || "Professional",
      date: booking.date,
      time: booking.time,
      address: booking.address || "Bengaluru",
      price: booking.price || 0,
      notes: booking.notes || "",
    });

    const newBooking = normalizeBooking(response.booking);
    setBookings((current) => [newBooking, ...current]);
    localStorage.setItem(
      "probook_bookings",
      JSON.stringify([newBooking, ...bookings])
    );

    return newBooking;
  };

  const cancelBooking = async (id, reason = "") => {
    const response = await cancelBookingApi(id, reason);
    const updatedBooking = normalizeBooking(response.booking);

    setBookings((current) =>
      current.map((booking) =>
        String(booking.id) === String(id)
          ? updatedBooking
          : booking
      )
    );

    return updatedBooking;
  };

  const updateBooking = async (id, data) => {
    const response = await updateBookingApi(id, data);
    const updatedBooking = normalizeBooking(response.booking);

    setBookings((current) =>
      current.map((booking) =>
        String(booking.id) === String(id)
          ? updatedBooking
          : booking
      )
    );

    return updatedBooking;
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        fetchBookings,
        addBooking,
        cancelBooking,
        updateBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}