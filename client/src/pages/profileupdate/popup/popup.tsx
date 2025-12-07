import React, { useState } from "react";
import "./popup.css";
import { useNavigate } from "react-router-dom";

interface AddContactPopupProps {
  closePopup?: () => void;
}

const AddContactPopup: React.FC<AddContactPopupProps> = ({ closePopup }) => {
  const nav = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSaveContact = async () => {
    // Validation
    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add contacts");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/contacts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add contact");
      }

      const data = await response.json();
      console.log("Contact added successfully:", data);

      // Clear the form
      setPhoneNumber("");

      // Close popup and navigate
      if (closePopup) closePopup();
      nav("/chat");
    } catch (err) {
      console.error("Error adding contact:", err);
      setError(err instanceof Error ? err.message : "Failed to add contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Add New Contact</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          className="popup-input"
          placeholder="Phone Number (e.g., +1234567890)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={loading}
        />

        <div className="popup-buttons">
          <button
            className="save-btn"
            onClick={handleSaveContact}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Contact"}
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              if (closePopup) closePopup();
              nav("/chat");
            }}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContactPopup;
