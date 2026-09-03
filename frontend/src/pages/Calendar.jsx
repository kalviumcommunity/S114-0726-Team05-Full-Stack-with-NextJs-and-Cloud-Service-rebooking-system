import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProfessionalCard from "../components/booking/ProfessionalCard";

export default function Calendar() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [service, setService] = useState("");
  const [professional, setProfessional] =
    useState(null);

  const professionals = [
    {
      id: 1,
      name: "Sarah Johnson",
      speciality: "Hair Styling",
      rating: "4.9",
    },
    {
      id: 2,
      name: "James Wilson",
      speciality: "Personal Training",
      rating: "4.8",
    },
    {
      id: 3,
      name: "Emily Davis",
      speciality: "Massage Therapy",
      rating: "4.9",
    },
  ];

  function continueBooking() {
    if (!service || !date || !professional) {
      alert(
        "Please select a service, professional and date."
      );
      return;
    }

    navigate("/confirmation", {
      state: {
        booking: {
          service,
          professional: professional.name,
          date,
          time: "10:00 AM",
          duration: "60 min",
          price: "$50",
        },
      },
    });
  }

  return (
    <AppLayout>
      <div className="page-heading">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <span className="category-label">
          NEW APPOINTMENT
        </span>

        <h1>Book an appointment</h1>

        <p>
          Choose your service and professional.
        </p>
      </div>

      <div className="form-panel">
        <div className="input-group">
          <label>Service</label>

          <select
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
          >
            <option value="">
              Select a service
            </option>

            <option value="Hair Styling">
              Hair Styling
            </option>

            <option value="Personal Training">
              Personal Training
            </option>

            <option value="Massage Therapy">
              Massage Therapy
            </option>

            <option value="Dental Consultation">
              Dental Consultation
            </option>
          </select>
        </div>

        <div className="input-group">
          <label>Date</label>

          <input
            type="date"
            value={date}
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            onChange={(e) =>
              setDate(e.target.value)
            }
          />
        </div>
      </div>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="category-label">
              PROFESSIONAL
            </span>

            <h2>Choose a professional</h2>
          </div>
        </div>

        <div className="professional-grid">
          {professionals.map((item) => (
            <ProfessionalCard
              key={item.id}
              professional={item}
              selected={
                professional?.id === item.id
              }
              onSelect={setProfessional}
            />
          ))}
        </div>
      </section>

      <button
        className="auth-submit"
        onClick={continueBooking}
      >
        Continue →
      </button>
    </AppLayout>
  );
}