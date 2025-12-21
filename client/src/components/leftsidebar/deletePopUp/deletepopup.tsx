import React, { useState } from "react";
import axios from "axios";
import "./deletepopup.css";
import { useNavigate } from "react-router-dom";

interface DeleteProfilePopupProps {
  closePopup: () => void;
}

const DeleteProfilePopup: React.FC<DeleteProfilePopupProps> = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) return;

    setLoading(true);

    try {
      await axios.delete(`http://localhost:3000/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear local storage & redirect
      localStorage.clear();
      nav("/");
    } catch (error) {
      console.error("Failed to delete profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Delete Profile</h2>
        <p>Do you want to delete your profile?</p>

        <div className="popup-buttons">
          <button
            className="delete-btn"
            onClick={handleDeleteProfile}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes"}
          </button>

          <button
            className="cancel-btn"
            onClick={() => {
              nav("/chat");
            }}
            disabled={loading}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfilePopup;
