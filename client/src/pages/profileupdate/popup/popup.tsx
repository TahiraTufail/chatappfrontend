import React, { useState } from "react";
import axios from "axios";
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
      const response = await axios.post(
        "http://localhost:3000/contacts/add",
        {
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Contact added successfully:", response.data);

      // Clear the form
      setPhoneNumber("");

      // Close popup and navigate
      if (closePopup) closePopup();
      nav("/chat");
    } catch (err) {
      console.error("Error adding contact:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to add contact");
      } else {
        setError("Failed to add contact");
      }
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
