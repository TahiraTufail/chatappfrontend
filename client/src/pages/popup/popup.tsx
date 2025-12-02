import React from "react";
import "./popup.css";
import {useNavigate } from "react-router-dom";

interface AddContactPopupProps {
  closePopup? : () => void;
}

const AddContactPopup: React.FC<AddContactPopupProps> = ({ closePopup }) => {
  const nav = useNavigate();
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Add New Contact</h2>

        <input type="text" className="popup-input" placeholder="Name" />
        <input type="email" className="popup-input" placeholder="Email" />
        <input type="text" className="popup-input" placeholder="Phone Number" />

        <div className="popup-buttons">
          <button className="save-btn">Save Contact</button>
          <button
            className="cancel-btn"
            onClick={() => {
              (closePopup)
              nav("/chat");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContactPopup;
