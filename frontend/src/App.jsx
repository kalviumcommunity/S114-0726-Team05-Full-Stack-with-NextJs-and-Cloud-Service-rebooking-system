import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

/* =========================================================
   DATA
========================================================= */

const SERVICES = [
  {
    id: 1,
    name: "Home Cleaning",
    category: "Cleaning",
    description: "Professional cleaning for a fresh and comfortable home.",
    price: 299,
    rating: 4.8,
    reviews: 1246,
    icon: "⌂",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Plumbing",
    category: "Repairs",
    description: "Fast and reliable plumbing repairs and installations.",
    price: 449,
    rating: 4.7,
    reviews: 832,
    icon: "⚒",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Electrical",
    category: "Repairs",
    description: "Safe electrical repairs by trained professionals.",
    price: 459,
    rating: 4.7,
    reviews: 645,
    icon: "ϟ",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Beauty & Wellness",
    category: "Beauty",
    description: "Salon-quality beauty services at your doorstep.",
    price: 599,
    rating: 4.9,
    reviews: 542,
    icon: "✦",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "AC Service",
    category: "Maintenance",
    description: "AC repair, servicing and maintenance.",
    price: 599,
    rating: 4.6,
    reviews: 718,
    icon: "❄",
    image:
      "https://images.unsplash.com/photo-1631545806609-75e5f0a5f3e2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Painting",
    category: "Home",
    description: "Give your home a beautiful new look.",
    price: 699,
    rating: 4.8,
    reviews: 386,
    icon: "◒",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80",
  },
];

const PROFESSIONALS = [
  {
    id: 1,
    name: "CleanPro Services",
    rating: 4.8,
    experience: "6 years",
  },
  {
    id: 2,
    name: "Sparkle Home",
    rating: 4.7,
    experience: "5 years",
  },
  {
    id: 3,
    name: "Urban Experts",
    rating: 4.9,
    experience: "8 years",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getUser() {
  try {
    const savedUser =
      localStorage.getItem("probook_user") ||
      localStorage.getItem("urban_user");

    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function getBookings() {
  try {
    return (
      JSON.parse(localStorage.getItem("probook_bookings")) ||
      JSON.parse(localStorage.getItem("urban_bookings")) ||
      []
    );
  } catch {
    return [];
  }
}

function saveBookings(bookings) {
  localStorage.setItem("probook_bookings", JSON.stringify(bookings));
  localStorage.setItem("urban_bookings", JSON.stringify(bookings));
}

function makeBooking(service, date, time, professional) {
  return {
    id: "UC" + Date.now(),
    service: service.name,
    serviceId: service.id,
    category: service.category,
    price: service.price,
    date,
    time,
    professional,
    status: "Confirmed",
    address: "123 MG Road, Bangalore",
    createdAt: new Date().toISOString(),
  };
}

/* =========================================================
   ICON
========================================================= */

function Icon({ children }) {
  return <span className="icon">{children}</span>;
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/*"
          element={
            <Protected>
              <AppShell />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

/* =========================================================
   PROTECTED
========================================================= */

function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="page-loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* =========================================================
   APP SHELL
========================================================= */

function AppShell() {
  const location = useLocation();
  const { user } = useAuth();

  const [aiOpen, setAiOpen] = useState(false);

  const hideShell =
    location.pathname === "/confirmation";

  return (
    <div className="app">
      {!hideShell && <Sidebar />}

      <main className={hideShell ? "main full" : "main"}>
        {!hideShell && (
          <TopBar
            user={user}
            onAI={() => setAiOpen(true)}
          />
        )}

        <div className="page">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bookings" element={<BookingHistory />} />
            <Route path="/rebook" element={<Rebook />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/booking/:id" element={<BookingDetails />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      <button
        className="ai-floating"
        onClick={() => setAiOpen(true)}
        aria-label="Open AI assistant"
      >
        ✦
      </button>

      {aiOpen && <AIAssistant close={() => setAiOpen(false)} />}

    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    ["Dashboard", "/dashboard", "⌂"],
    ["Services", "/services", "◈"],
    ["My Bookings", "/bookings", "▣"],
    ["Rebook", "/rebook", "↻"],
    ["Calendar", "/calendar", "□"],
    ["Notifications", "/notifications", "♢"],
    ["Settings", "/settings", "⚙"],
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">U</div>
        <div>
          <strong>UrbanConnect</strong>
          <small>PREMIUM HOME SERVICES</small>
        </div>
      </div>

      <nav>
        {links.map(([name, path, icon]) => (
          <Link
            key={path}
            to={path}
            className={
              location.pathname === path
                ? "side-link active"
                : "side-link"
            }
          >
            <Icon>{icon}</Icon>
            {name}
          </Link>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <span>Need help?</span>
          <button onClick={() => navigate("/notifications")}>
            Contact support →
          </button>
        </div>

        <button
          className="logout"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          ↪ Sign out
        </button>
      </div>
    </aside>
  );
}

/* =========================================================
   TOP BAR
========================================================= */

function TopBar({ user, onAI }) {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="top-search">
        <span>⌕</span>
        <input
          placeholder="Search services..."
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate("/services");
          }}
        />
      </div>

      <div className="top-actions">
        <button
          className="primary-button rebook-pill"
          onClick={() => navigate("/rebook")}
        >
          Rebook now
        </button>

        <button
          className="icon-button"
          onClick={onAI}
          title="AI Assistant"
        >
          ✦
        </button>

        <button
          className="icon-button"
          onClick={() => navigate("/notifications")}
        >
          ♢
        </button>

        <button
          className="profile-button"
          onClick={() => navigate("/settings")}
        >
          <div className="avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <span>Hi, {user?.name?.split(" ")[0] || "User"}</span>
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   BACK BUTTON
========================================================= */

function BackButton({ text = "Back" }) {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      ← {text}
    </button>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const bookings = getBookings();

  const upcoming = bookings.filter(
    (b) => b.status !== "Cancelled"
  );

  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">YOUR PERSONAL HOME SERVICES</p>
          <h1>
            Welcome back, {user?.name?.split(" ")[0] || "there"} <span>👋</span>
          </h1>
          <p className="muted">
            Everything you need for a comfortable home, in one place.
          </p>
        </div>

      </section>

      <section className="stats-grid">
        <StatCard title="Total Bookings" value={bookings.length || 12} />
        <StatCard title="Upcoming" value={upcoming.length || 3} />
        <StatCard title="In Progress" value="1" />
        <StatCard title="Saved Services" value="24" />
      </section>

      <section className="dashboard-search">
        <div>
          <span className="label">Find a service</span>
          <h3>What can we help you with?</h3>
        </div>

        <div className="search-fields">
          <div className="field">
            <span>⌖</span>
            <div>
              <small>Location</small>
              <strong>Bangalore</strong>
            </div>
          </div>

          <div className="field">
            <span>⌕</span>
            <div>
              <small>Service</small>
              <input
                placeholder="Cleaning, plumbing..."
                onFocus={() => navigate("/services")}
              />
            </div>
          </div>

          <button
            className="dark-button"
            onClick={() => navigate("/services")}
          >
            Search →
          </button>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          title="Quick actions"
          action="View all"
          onAction={() => navigate("/services")}
        />

        <div className="quick-grid">
          <QuickCard icon="▣" title="Book Now" onClick={() => navigate("/services")} />
          <QuickCard icon="↻" title="Rebook" onClick={() => navigate("/rebook")} featured />
          <QuickCard icon="□" title="Calendar" onClick={() => navigate("/calendar")} />
          <QuickCard icon="?" title="Help Center" onClick={() => navigate("/notifications")} />
        </div>
      </section>

      <section className="two-column">
        <div>
          <SectionHeading
            title="Upcoming appointment"
            action="View all"
            onAction={() => navigate("/bookings")}
          />

          {upcoming.length > 0 ? (
            <BookingCard booking={upcoming[0]} />
          ) : (
            <div className="empty-card">
              <h3>No upcoming appointments</h3>
              <p>Book a service to see it here.</p>
              <button
                className="primary-button"
                onClick={() => navigate("/services")}
              >
                Explore services
              </button>
            </div>
          )}
        </div>

        <div>
          <SectionHeading
            title="Popular services"
            action="Explore"
            onAction={() => navigate("/services")}
          />

          <div className="mini-service-grid">
            {SERVICES.slice(0, 4).map((service) => (
              <MiniService
                key={service.id}
                service={service}
                onClick={() => navigate("/services")}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   SERVICES
========================================================= */

function Services() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Cleaning", "Repairs", "Beauty", "Maintenance", "Home"];

  const filtered = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        category === "All" || service.category === category;

      const matchesSearch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <>
      <BackButton />

      <section className="page-heading">
        <div>
          <p className="eyebrow">URBANCONNECT SERVICES</p>
          <h1>All services</h1>
          <p className="muted">
            Discover trusted professionals for your home.
          </p>
        </div>
      </section>

      <div className="service-toolbar">
        <div className="large-search">
          <span>⌕</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a service..."
          />
        </div>
      </div>

      <div className="chips">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "chip selected" : "chip"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="service-grid">
        {filtered.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onBook={() => navigate("/booking/" + service.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-card centered">
          <h3>No services found</h3>
          <p>Try another search or category.</p>
        </div>
      )}
    </>
  );
}

/* =========================================================
   BOOKING DETAILS
========================================================= */

function BookingDetails() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = Number(pathname.split("/").pop());

  const service =
    SERVICES.find((s) => s.id === id) || SERVICES[0];

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [professional, setProfessional] = useState(
    PROFESSIONALS[0].name
  );

  function book() {
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    const booking = makeBooking(
      service,
      date,
      time,
      professional
    );

    const bookings = getBookings();
    saveBookings([booking, ...bookings]);

    localStorage.setItem(
      "urban_last_booking",
      JSON.stringify(booking)
    );

    navigate("/confirmation");
  }

  return (
    <>
      <BackButton text="Back to services" />

      <div className="booking-layout">
        <div>
          <div className="booking-image-large">
            <img src={service.image} alt={service.name} />
          </div>

          <div className="booking-content">
            <p className="eyebrow">{service.category}</p>
            <h1>{service.name}</h1>

            <div className="rating">
              ★ {service.rating}
              <span>({service.reviews.toLocaleString()} reviews)</span>
            </div>

            <p className="description">
              {service.description}
            </p>

            <div className="included">
              <h3>What's included</h3>
              <ul>
                <li>✓ Professional service</li>
                <li>✓ Trained and verified professional</li>
                <li>✓ Quality checked service</li>
                <li>✓ Convenient doorstep appointment</li>
              </ul>
            </div>

            <h3>Select a professional</h3>

            <div className="professional-list">
              {PROFESSIONALS.map((p) => (
                <button
                  key={p.id}
                  className={
                    professional === p.name
                      ? "professional selected"
                      : "professional"
                  }
                  onClick={() => setProfessional(p.name)}
                >
                  <div className="avatar">{p.name[0]}</div>

                  <div className="professional-info">
                    <strong>{p.name}</strong>
                    <span>
                      ★ {p.rating} · {p.experience}
                    </span>
                  </div>

                  <span>
                    {professional === p.name ? "✓" : "Select"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="booking-panel">
          <h3>Select date</h3>

          <input
            className="date-input"
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />

          <h3>Select time</h3>

          <div className="time-grid">
            {["09:00 AM", "11:00 AM", "01:00 PM", "04:00 PM", "06:00 PM"].map(
              (item) => (
                <button
                  key={item}
                  className={
                    time === item ? "time selected" : "time"
                  }
                  onClick={() => setTime(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="summary">
            <div>
              <span>Service</span>
              <strong>{service.name}</strong>
            </div>

            <div>
              <span>Professional</span>
              <strong>{professional}</strong>
            </div>

            <div className="total">
              <span>Total</span>
              <strong>₹{service.price}</strong>
            </div>
          </div>

          <button className="primary-button full-width" onClick={book}>
            Continue to Book →
          </button>
        </aside>
      </div>
    </>
  );
}

/* =========================================================
   BOOKINGS
========================================================= */

function BookingHistory() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(getBookings());

  function cancel(id) {
    const updated = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    setBookings(updated);
    saveBookings(updated);
  }

  return (
    <>
      <BackButton />

      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR APPOINTMENTS</p>
          <h1>My bookings</h1>
          <p className="muted">
            View and manage all your appointments.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/services")}
        >
          Book a service →
        </button>
      </div>

      <div className="booking-list">
        {bookings.length === 0 ? (
          <div className="empty-card centered">
            <h2>No bookings yet</h2>
            <p>Your booked services will appear here.</p>
            <button
              className="primary-button"
              onClick={() => navigate("/services")}
            >
              Explore services
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={() => cancel(booking.id)}
              onRebook={() => navigate("/rebook")}
            />
          ))
        )}
      </div>
    </>
  );
}

/* =========================================================
   REBOOK
========================================================= */

function Rebook() {
  const navigate = useNavigate();
  const bookings = getBookings();

  const previous =
    bookings.length > 0
      ? bookings
      : SERVICES.slice(0, 3).map((service) => ({
          id: service.id,
          service: service.name,
          price: service.price,
          professional: "CleanPro Services",
          date: "Previous booking",
          time: "10:00 AM",
        }));

  return (
    <>
      <BackButton />

      <div className="page-heading">
        <div>
          <p className="eyebrow">ONE TAP REBOOKING</p>
          <h1>Rebook a service</h1>
          <p className="muted">
            Quickly book one of your favourite services again.
          </p>
        </div>
      </div>

      <div className="rebook-grid">
        {previous.map((booking) => (
          <div className="rebook-card" key={booking.id}>
            <div className="rebook-icon">↻</div>

            <div>
              <h3>{booking.service}</h3>
              <p>
                Previously booked with {booking.professional}
              </p>
              <span>₹{booking.price}</span>
            </div>

            <button
              className="secondary-button"
              onClick={() => {
                const service = SERVICES.find(
                  (s) => s.name === booking.service
                );

                navigate(
                  "/booking/" + (service?.id || 1)
                );
              }}
            >
              Rebook →
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   CALENDAR
========================================================= */

function Calendar() {
  const navigate = useNavigate();
  const bookings = getBookings();

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <>
      <BackButton />

      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR SCHEDULE</p>
          <h1>My calendar</h1>
          <p className="muted">
            View and manage your upcoming appointments.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/bookings")}
        >
          View bookings
        </button>
      </div>

      <div className="calendar-card">
        <div className="calendar-header">
          <button>‹</button>
          <h2>September 2026</h2>
          <button>›</button>
        </div>

        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <span key={day}>{day}</span>
            )
          )}
        </div>

        <div className="calendar-grid">
          {days.map((day) => {
            const hasBooking = bookings.some(
              (b) => new Date(b.date).getDate() === day
            );

            return (
              <div
                className={
                  hasBooking
                    ? "calendar-day booked"
                    : "calendar-day"
                }
                key={day}
              >
                <strong>{day}</strong>

                {hasBooking && (
                  <small>Appointment</small>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CONFIRMATION
========================================================= */

function Confirmation() {
  const navigate = useNavigate();

  const booking =
    JSON.parse(localStorage.getItem("urban_last_booking")) ||
    getBookings()[0];

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>

        <p className="eyebrow">ALL SET</p>

        <h1>Booking confirmed!</h1>

        <p className="muted">
          Your appointment has been successfully booked.
        </p>

        {booking && (
          <div className="confirmation-details">
            <Detail label="Service" value={booking.service} />
            <Detail label="Professional" value={booking.professional} />
            <Detail label="Date" value={booking.date} />
            <Detail label="Time" value={booking.time} />
            <Detail label="Address" value={booking.address} />
            <Detail label="Booking ID" value={booking.id} />
          </div>
        )}

        <div className="confirmation-actions">
          <button
            className="primary-button"
            onClick={() => navigate("/bookings")}
          >
            View My Bookings
          </button>

          <button
            className="secondary-button"
            onClick={() => navigate("/calendar")}
          >
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function Notifications() {
  const notifications = [
    {
      icon: "✓",
      title: "Booking confirmed",
      text: "Your Home Cleaning appointment has been confirmed.",
      time: "2 min ago",
    },
    {
      icon: "●",
      title: "Professional on the way",
      text: "Your service professional will arrive shortly.",
      time: "15 min ago",
    },
    {
      icon: "↻",
      title: "Reminder",
      text: "Your AC Service appointment is tomorrow.",
      time: "1 day ago",
    },
  ];

  return (
    <>
      <BackButton />

      <div className="page-heading">
        <div>
          <p className="eyebrow">STAY UPDATED</p>
          <h1>Notifications</h1>
          <p className="muted">
            Important updates about your services.
          </p>
        </div>
      </div>

      <div className="notifications">
        {notifications.map((notification) => (
          <div className="notification" key={notification.title}>
            <div className="notification-icon">
              {notification.icon}
            </div>

            <div>
              <strong>{notification.title}</strong>
              <p>{notification.text}</p>
            </div>

            <span>{notification.time}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function Settings() {
  const user = getUser();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "Bangalore, Karnataka",
  });

  const [saved, setSaved] = useState(false);
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState(true);

  function save() {
    const updated = {
      ...user,
      ...form,
    };

    localStorage.setItem("urban_user", JSON.stringify(updated));
    setSaved(true);

    setTimeout(() => setSaved(false), 2500);
  }

  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [dark]);

  return (
    <>
      <BackButton />

      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR ACCOUNT</p>
          <h1>Settings</h1>
          <p className="muted">
            Manage your account and preferences.
          </p>
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-menu">
          {[
            "Profile",
            "Account",
            "Notifications",
            "Appearance",
            "Security",
            "Payment Methods",
            "Help & Support",
          ].map((item, index) => (
            <button
              key={item}
              className={index === 0 ? "settings-link active" : "settings-link"}
            >
              <span>
                {["♙", "⚙", "♢", "◐", "⌕", "▣", "?"][index]}
              </span>
              {item}
            </button>
          ))}
        </aside>

        <section className="settings-card">
          <h2>Profile information</h2>
          <p className="muted">
            Update your personal information.
          </p>

          <div className="form-grid">
            <label>
              Full name
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Your full name"
              />
            </label>

            <label>
              Email
              <input
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                type="email"
                placeholder="you@example.com"
              />
            </label>

            <label>
              Phone
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                placeholder="+91 98765 43210"
              />
            </label>

            <label>
              Location
              <input
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
              />
            </label>
          </div>

          <hr />

          <h2>Preferences</h2>

          <div className="preference">
            <div>
              <strong>Notifications</strong>
              <p>Receive booking and service updates.</p>
            </div>

            <button
              className={notifications ? "toggle on" : "toggle"}
              onClick={() => setNotifications(!notifications)}
            >
              <span />
            </button>
          </div>

          <div className="preference">
            <div>
              <strong>Dark appearance</strong>
              <p>Use a darker colour scheme.</p>
            </div>

            <button
              className={dark ? "toggle on" : "toggle"}
              onClick={() => setDark(!dark)}
            >
              <span />
            </button>
          </div>

          <div className="settings-footer">
            {saved && (
              <span className="saved-message">
                ✓ Changes saved
              </span>
            )}

            <button className="primary-button" onClick={save}>
              Save changes
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

/* =========================================================
   LOGIN
========================================================= */

function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const hasValidGoogleClientId = /^[0-9]+-[a-z0-9_-]+\.apps\.googleusercontent\.com$/i.test(
    googleClientId?.trim() || ""
  );

  const [email, setEmail] = useState(() => {
    return (
      localStorage.getItem("personal_email") ||
      localStorage.getItem("user_email") ||
      ""
    );
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    if (!hasValidGoogleClientId || typeof window === "undefined") {
      return undefined;
    }

    const scriptId = "google-gsi-script";
    let script = document.getElementById(scriptId);

    const handleCredential = async (response) => {
      try {
        const payload = JSON.parse(
          atob(response.credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        );

        const googleEmail = payload.email;
        await loginWithGoogle(response.credential);
        setEmail(googleEmail);
        localStorage.setItem("personal_email", googleEmail);
        localStorage.setItem("user_email", googleEmail);
        navigate("/dashboard");
      } catch (error) {
        setError(error.message || "Google sign-in failed.");
      }
    };

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredential,
      });
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.head.appendChild(script);
    } else {
      initializeGoogle();
    }

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [googleClientId, hasValidGoogleClientId, loginWithGoogle, navigate]);

  async function submit(e) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      localStorage.setItem("personal_email", email.trim().toLowerCase());
      localStorage.setItem("user_email", email.trim().toLowerCase());
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleResetSubmit() {
    const targetEmail = (resetEmail || email).trim();
    setResetError("");
    setResetMessage("");

    if (!targetEmail) {
      setResetError("Please enter your email address.");
      return;
    }

    if (!targetEmail.includes("@")) {
      setResetError("Please enter a valid email address.");
      return;
    }

    setResetMessage(
      `A password reset link has been sent to ${targetEmail}.`
    );
    setShowReset(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="brand-logo">U</div>
        <div>
          <strong>UrbanConnect</strong>
          <small>PREMIUM HOME SERVICES</small>
        </div>
      </div>

      <div className="auth-layout">
        <div className="auth-intro">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>
            Home services,
            <br />
            <span>made effortless.</span>
          </h1>

          <p>
            Sign in to manage your bookings and get trusted
            professionals at your doorstep.
          </p>

          <div className="auth-benefits">
            <span>✦ Verified professionals</span>
            <span>✓ Secure & reliable</span>
            <span>▣ Easy booking</span>
          </div>
        </div>

        <form className="auth-card" onSubmit={submit}>
          <h2>Sign in to your account</h2>
          <p>Continue managing your bookings effortlessly.</p>

          {error && <div className="error-box">{error}</div>}

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <div className="remember-row">
            <label className="checkbox">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-button"
              onClick={() => {
                setResetEmail(email || "");
                setResetMessage("");
                setResetError("");
                setShowReset(true);
              }}
            >
              Forgot password?
            </button>
          </div>

          {showReset && (
            <div className="reset-box">
              <label>
                Email address
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              {resetError && (
                <div className="error-box">{resetError}</div>
              )}

              {resetMessage && (
                <div className="success-box">{resetMessage}</div>
              )}

              <div className="reset-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowReset(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="primary-button"
                  onClick={handleResetSubmit}
                >
                  Send reset link
                </button>
              </div>
            </div>
          )}

          <button className="primary-button full-width" disabled={loading}>
            {loading ? "Signing in..." : "Sign in →"}
          </button>

          <div className="or">
            <span>or</span>
          </div>

          <button
            type="button"
            className="social-button"
            onClick={async () => {
              if (!hasValidGoogleClientId) {
                setError(
                  "Google sign-in needs VITE_GOOGLE_CLIENT_ID in frontend/.env. Add the Web OAuth client ID from Google Cloud Console."
                );
                return;
              }

              try {
                if (window.google?.accounts?.id) {
                  window.google.accounts.id.prompt();
                  return;
                }

                setError("Google sign-in is still loading. Please try again.");
              } catch {
                setError("Google sign-in is unavailable right now.");
              }
            }}
          >
            Continue with Google
          </button>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   REGISTER
========================================================= */

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await register(form.name, form.email, form.password, form.phone);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="brand-logo">U</div>
        <div>
          <strong>UrbanConnect</strong>
          <small>PREMIUM HOME SERVICES</small>
        </div>
      </div>

      <div className="auth-layout register">
        <div className="auth-intro">
          <p className="eyebrow">JOIN URBANCONNECT</p>

          <h1>
            Your home,
            <br />
            <span>our priority.</span>
          </h1>

          <p>
            Create an account and make your home service
            bookings simple.
          </p>

          <div className="numbers">
            <div>
              <strong>10K+</strong>
              <span>Happy customers</span>
            </div>

            <div>
              <strong>500+</strong>
              <span>Professionals</span>
            </div>

            <div>
              <strong>4.8★</strong>
              <span>Average rating</span>
            </div>
          </div>
        </div>

        <form className="auth-card" onSubmit={submit}>
          <h2>Create account</h2>
          <p>Enter your details to get started.</p>

          {error && <div className="error-box">{error}</div>}

          <label>
            Full name
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Enter your full name"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="you@example.com"
            />
          </label>

          <label>
            Phone number
            <input
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="+91 98765 43210"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="Create a password"
            />
          </label>

          <label className="checkbox">
            <input type="checkbox" required />
            I agree to the Terms & Conditions
          </label>

          <button className="primary-button full-width">
            Create account →
          </button>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   AI ASSISTANT
========================================================= */

function AIAssistant({ close }) {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi! 👋 I'm your UrbanConnect assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  function send(text = input) {
    if (!text.trim()) return;

    const userMessage = {
      from: "user",
      text,
    };

    let reply =
      "I can help you book services, find professionals, manage bookings or rebook a previous service.";

    const lower = text.toLowerCase();

    if (lower.includes("clean")) {
      reply =
        "For cleaning, I recommend Home Cleaning starting from ₹299. Would you like to book it?";
    } else if (lower.includes("plumb")) {
      reply =
        "Our Plumbing service starts from ₹449. I can take you to the booking page.";
    } else if (lower.includes("book")) {
      reply =
        "Sure! I'll take you to our services so you can choose what you need.";
    } else if (lower.includes("booking")) {
      reply =
        "You can view and manage all your bookings from My Bookings.";
    } else if (lower.includes("rebook")) {
      reply =
        "Of course! You can quickly repeat a previous service from Rebook.";
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
      { from: "ai", text: reply },
    ]);

    setInput("");

    if (
      lower.includes("book") &&
      !lower.includes("booking")
    ) {
      setTimeout(() => navigate("/services"), 600);
      close();
    }

    if (lower.includes("rebook")) {
      setTimeout(() => navigate("/rebook"), 600);
      close();
    }

    if (lower.includes("booking")) {
      setTimeout(() => navigate("/bookings"), 600);
      close();
    }
  }

  return (
    <div className="ai-panel">
      <div className="ai-header">
        <div>
          <strong>✦ AI Assistant</strong>
          <small>Online</small>
        </div>

        <button onClick={close}>×</button>
      </div>

      <div className="ai-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.from === "ai"
                ? "ai-message"
                : "user-message"
            }
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="ai-suggestions">
        <button onClick={() => send("Book a cleaning service")}>
          Book cleaning
        </button>

        <button onClick={() => send("Show my bookings")}>
          My bookings
        </button>

        <button onClick={() => send("I want to rebook")}>
          Rebook
        </button>
      </div>

      <div className="ai-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Type your message..."
        />

        <button onClick={() => send()}>→</button>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SectionHeading({ title, action, onAction }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>

      {action && (
        <button onClick={onAction}>
          {action} →
        </button>
      )}
    </div>
  );
}

function QuickCard({ icon, title, onClick, featured = false }) {
  return (
    <button className={featured ? "quick-card featured" : "quick-card"} onClick={onClick}>
      <span>{icon}</span>
      <strong>{title}</strong>
    </button>
  );
}

function MiniService({ service, onClick }) {
  return (
    <button className="mini-service" onClick={onClick}>
      <div className="mini-icon">{service.icon}</div>

      <div>
        <strong>{service.name}</strong>
        <span>★ {service.rating}</span>
      </div>
    </button>
  );
}

function ServiceCard({ service, onBook }) {
  return (
    <article className="service-card">
      <div className="service-image">
        <img src={service.image} alt={service.name} />

        <span className="service-rating">
          ★ {service.rating}
        </span>
      </div>

      <div className="service-info">
        <div>
          <small>{service.category}</small>
          <h3>{service.name}</h3>
        </div>

        <p>{service.description}</p>

        <div className="service-bottom">
          <div>
            <span>From</span>
            <strong>₹{service.price}</strong>
          </div>

          <button className="secondary-button" onClick={onBook}>
            Book
          </button>
        </div>
      </div>
    </article>
  );
}

function BookingCard({ booking, onCancel, onRebook }) {
  const navigate = useNavigate();

  return (
    <article className="booking-card">
      <div className="booking-service-icon">
        {booking.service?.charAt(0)}
      </div>

      <div className="booking-main">
        <div>
          <span className="booking-category">
            {booking.category || "Service"}
          </span>

          <h3>{booking.service}</h3>

          <p>
            {booking.date} · {booking.time}
          </p>

          <small>
            with {booking.professional}
          </small>
        </div>

        <span
          className={
            booking.status === "Cancelled"
              ? "status cancelled"
              : "status"
          }
        >
          {booking.status}
        </span>
      </div>

      <div className="booking-actions">
        <button
          className="secondary-button"
          onClick={() => navigate("/bookings")}
        >
          View
        </button>

        {booking.status !== "Cancelled" && (
          <button
            className="secondary-button"
            onClick={onRebook}
          >
            Rebook
          </button>
        )}

        {booking.status !== "Cancelled" && (
          <button
            className="text-danger"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </article>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="empty-card centered">
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>

      <button
        className="primary-button"
        onClick={() => navigate("/dashboard")}
      >
        Go to dashboard
      </button>
    </div>
  );
}