import { useState } from "react";
import axios from "axios";
import assets from "../../assets/assets";
import "./rightsidebar.css";

interface ContactUser {
  id: number;
  name: string;
}

interface Contact {
  id: number;
  phoneNumber: string;
  contactUser?: ContactUser;
}

interface RightSideBarProps {
  selectedContact: Contact | null;
  onContactDeleted?: () => void; // Callback to refresh contact list after deletion
}

const RightSideBar = ({
  selectedContact,
  onContactDeleted,
}: RightSideBarProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteContact = async () => {
    if (!selectedContact) return;

    // Confirm before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${
        selectedContact.contactUser?.name || selectedContact.phoneNumber
      }? This will also delete all chat history with this contact.`
    );

    if (!confirmDelete) return;

    setIsDeleting(true);

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/contacts/deleteContact/${selectedContact.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Contact deleted successfully!");

      // Call the callback to refresh the contact list
      if (onContactDeleted) {
        onContactDeleted();
      }
    } catch (error: any) {
      console.error("Failed to delete contact:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete contact. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rs">
      {selectedContact ? (
        <>
          <div className="rs-profile">
            <img src={assets.profile_img} alt="" />
            <h3>
              {selectedContact.contactUser?.name || "Unknown"}{" "}
              <img className="dot" src={assets.green_dot} alt="" />
            </h3>
            <p>{selectedContact.phoneNumber || "No phone number"}</p>
          </div>
          <hr />
          <div className="rs-info">
            <p>
              <strong>Contact ID:</strong> {selectedContact.id}
            </p>
            {selectedContact.contactUser && (
              <p>
                <strong>User ID:</strong> {selectedContact.contactUser.id}
              </p>
            )}
          </div>
          <hr />
          <button
            onClick={handleDeleteContact}
            disabled={isDeleting}
            className="delete-btn"
          >
            {isDeleting ? "Deleting..." : "Delete Contact"}
          </button>
        </>
      ) : (
        <div className="rs-empty">
          <p>Select a contact to view details</p>
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
