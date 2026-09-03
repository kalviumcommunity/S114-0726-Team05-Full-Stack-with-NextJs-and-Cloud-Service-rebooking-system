import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    bookingReminders: true,
    promotionalEmails: false,
    smsNotifications: true,
    darkMode: false,
    compactMode: false,
    language: "English",
    timezone: "Asia/Kolkata",
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const resetSettings = () => {
    const defaultSettings = {
      emailNotifications: true,
      bookingReminders: true,
      promotionalEmails: false,
      smsNotifications: true,
      darkMode: false,
      compactMode: false,
      language: "English",
      timezone: "Asia/Kolkata",
    };

    setSettings(defaultSettings);
    localStorage.setItem(
      "appSettings",
      JSON.stringify(defaultSettings)
    );
  };

  return (
    <div className="settings-page">
      <div className="settings-container">

        {/* HEADER */}
        <div className="settings-header">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div>
            <h1>Settings</h1>
            <p>
              Manage your account, preferences and notifications.
            </p>
          </div>
        </div>

        {/* PROFILE */}
        <section className="settings-card">
          <div className="section-title">
            <div className="section-icon">👤</div>

            <div>
              <h2>Profile</h2>
              <p>Manage your personal information.</p>
            </div>
          </div>

          <div className="profile-box">
            <div className="profile-avatar">U</div>

            <div className="profile-info">
              <h3>Your Account</h3>
              <p>Update your account information.</p>
            </div>

            <button
              className="secondary-button"
              onClick={() => navigate("/")}
            >
              View Profile
            </button>
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="settings-card">
          <div className="section-title">
            <div className="section-icon">🔔</div>

            <div>
              <h2>Notifications</h2>
              <p>Choose how you want to receive notifications.</p>
            </div>
          </div>

          <SettingToggle
            title="Email notifications"
            description="Receive important updates through email."
            checked={settings.emailNotifications}
            onChange={(value) =>
              updateSetting("emailNotifications", value)
            }
          />

          <SettingToggle
            title="Booking reminders"
            description="Get reminders before your appointments."
            checked={settings.bookingReminders}
            onChange={(value) =>
              updateSetting("bookingReminders", value)
            }
          />

          <SettingToggle
            title="SMS notifications"
            description="Receive booking updates through SMS."
            checked={settings.smsNotifications}
            onChange={(value) =>
              updateSetting("smsNotifications", value)
            }
          />

          <SettingToggle
            title="Promotional emails"
            description="Receive offers and promotional information."
            checked={settings.promotionalEmails}
            onChange={(value) =>
              updateSetting("promotionalEmails", value)
            }
          />
        </section>

        {/* APPEARANCE */}
        <section className="settings-card">
          <div className="section-title">
            <div className="section-icon">🎨</div>

            <div>
              <h2>Appearance</h2>
              <p>Customize how the application looks.</p>
            </div>
          </div>

          <SettingToggle
            title="Dark mode"
            description="Use a darker interface."
            checked={settings.darkMode}
            onChange={(value) =>
              updateSetting("darkMode", value)
            }
          />

          <SettingToggle
            title="Compact mode"
            description="Use a more compact layout."
            checked={settings.compactMode}
            onChange={(value) =>
              updateSetting("compactMode", value)
            }
          />
        </section>

        {/* LANGUAGE */}
        <section className="settings-card">
          <div className="section-title">
            <div className="section-icon">🌐</div>

            <div>
              <h2>Language & Region</h2>
              <p>Choose your language and timezone.</p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Language</label>

              <select
                value={settings.language}
                onChange={(e) =>
                  updateSetting("language", e.target.value)
                }
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </div>

            <div className="form-group">
              <label>Timezone</label>

              <select
                value={settings.timezone}
                onChange={(e) =>
                  updateSetting("timezone", e.target.value)
                }
              >
                <option value="Asia/Kolkata">
                  India — IST
                </option>

                <option value="America/New_York">
                  New York — EST
                </option>

                <option value="Europe/London">
                  London — GMT
                </option>

                <option value="Asia/Dubai">
                  Dubai — GST
                </option>
              </select>
            </div>

          </div>
        </section>

        {/* SECURITY */}
        <section className="settings-card">
          <div className="section-title">
            <div className="section-icon">🔐</div>

            <div>
              <h2>Security</h2>
              <p>Protect your account and manage access.</p>
            </div>
          </div>

          <div className="action-row">
            <div>
              <h3>Change Password</h3>
              <p>Update your account password.</p>
            </div>

            <button
              className="secondary-button"
              onClick={() =>
                alert("Password change option opened.")
              }
            >
              Change
            </button>
          </div>

          <div className="action-row">
            <div>
              <h3>Two-Factor Authentication</h3>
              <p>Add another layer of security.</p>
            </div>

            <button
              className="secondary-button"
              onClick={() =>
                alert("Two-factor authentication setup.")
              }
            >
              Enable
            </button>
          </div>
        </section>

        {/* PRIVACY */}
        <section className="settings-card">
          <div className="section-title">
            <div className="section-icon">🛡️</div>

            <div>
              <h2>Privacy</h2>
              <p>Manage your privacy preferences.</p>
            </div>
          </div>

          <div className="action-row">
            <div>
              <h3>Download My Data</h3>
              <p>Download a copy of your account information.</p>
            </div>

            <button
              className="secondary-button"
              onClick={() =>
                alert("Your data export has been requested.")
              }
            >
              Download
            </button>
          </div>

          <div className="action-row">
            <div>
              <h3>Delete Account</h3>
              <p>This action cannot be easily undone.</p>
            </div>

            <button
              className="danger-button"
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete your account?"
                );

                if (confirmed) {
                  alert("Account deletion requested.");
                }
              }}
            >
              Delete
            </button>
          </div>
        </section>

        {/* SAVE */}
        <div className="settings-actions">

          <button
            className="reset-button"
            onClick={resetSettings}
          >
            Reset
          </button>

          <button
            className="primary-button"
            onClick={saveSettings}
          >
            Save Changes
          </button>

        </div>

        {saved && (
          <div className="saved-message">
            ✓ Settings saved successfully
          </div>
        )}

      </div>
    </div>
  );
}


/* TOGGLE COMPONENT */

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="setting-row">

      <div className="setting-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button
        type="button"
        className={`toggle ${checked ? "active" : ""}`}
        onClick={() => onChange(!checked)}
        aria-label={title}
      >
        <span />
      </button>

    </div>
  );
}