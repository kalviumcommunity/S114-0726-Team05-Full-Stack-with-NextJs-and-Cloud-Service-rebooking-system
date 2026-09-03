import React, { useState } from "react";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm your AI assistant. How can I help you today?",
    },
  ]);

  const getAIResponse = (text) => {
    const lower = text.toLowerCase();

    if (
      lower.includes("book") ||
      lower.includes("appointment")
    ) {
      return "Sure! You can book an appointment from the Dashboard. I can help you choose a professional and a suitable time.";
    }

    if (
      lower.includes("rebook") ||
      lower.includes("again")
    ) {
      return "You can quickly rebook a previous appointment from the Rebook page. Your previous bookings will be available there.";
    }

    if (
      lower.includes("calendar") ||
      lower.includes("schedule")
    ) {
      return "You can check your upcoming appointments and schedule from the Calendar page.";
    }

    if (
      lower.includes("setting") ||
      lower.includes("profile")
    ) {
      return "You can manage notifications, appearance, language, security and privacy from Settings.";
    }

    if (
      lower.includes("cancel")
    ) {
      return "To cancel an appointment, open your Booking History and select the appointment you want to manage.";
    }

    if (
      lower.includes("hello") ||
      lower.includes("hi")
    ) {
      return "Hello! 👋 What would you like help with?";
    }

    return "I can help you with bookings, rebooking, appointments, calendar, notifications and settings. What would you like to do?";
  };

  const sendMessage = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    const userMessage = {
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: getAIResponse(trimmed),
        },
      ]);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}

      <button
        className="ai-floating-button"
        onClick={() => setOpen(!open)}
        aria-label="Open AI Assistant"
      >
        {open ? "×" : "✦"}
      </button>

      {/* CHAT WINDOW */}

      {open && (
        <div className="ai-chat-window">

          <div className="ai-header">
            <div>
              <div className="ai-title">
                ✦ AI Assistant
              </div>

              <div className="ai-status">
                ● Online
              </div>
            </div>

            <button
              className="ai-close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="ai-messages">

            {messages.map((item, index) => (
              <div
                key={index}
                className={`ai-message ${
                  item.sender === "user"
                    ? "user-message"
                    : "assistant-message"
                }`}
              >
                {item.text}
              </div>
            ))}

          </div>

          <div className="ai-input-area">

            <input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={sendMessage}
            >
              ↑
            </button>

          </div>

        </div>
      )}
    </>
  );
}