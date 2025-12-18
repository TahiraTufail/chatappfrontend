import { useState } from "react";
import axios from "axios";
import assets from "../../assets/assets";
import "./profileupdate.css";

const ProfileUpdate = () => {
  const [image, setImage] = useState<File | false>(false);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    description: "",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get userId from localStorage or your auth context
  const userId = localStorage.getItem("userId"); // Adjust based on your auth setup
  const token = localStorage.getItem("token"); // Get JWT token
  console.log("User ID:", userId);
  console.log("Token:", token);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Prepare the data to send (only send fields that have values)
      const updateData: any = {};
      if (formData.userName) updateData.userName = formData.userName;
      if (formData.userEmail) updateData.userEmail = formData.userEmail;
      if (formData.description) updateData.description = formData.description;
      if (formData.phoneNumber) updateData.phoneNumber = formData.phoneNumber;
      if (formData.password) updateData.password = formData.password;

      // Make PUT request to backend using axios
      const response = await axios.put(
        `http://localhost:3000/users/update/${userId}`, // Adjust the URL based on your backend
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Profile updated successfully!");
      console.log("Updated user data:", response.data);

      // Optionally clear the form
      setFormData({
        userName: "",
        userEmail: "",
        description: "",
        phoneNumber: "",
        password: "",
      });
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          <h3>Profile Detail</h3>

          <label htmlFor="avatar">
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt="Profile"
            />
            upload profile image
          </label>

          <input
            type="text"
            name="userName"
            placeholder="Your name"
            value={formData.userName}
            onChange={handleInputChange}
          />

          <input
            type="email"
            name="userEmail"
            placeholder="Your Email"
            value={formData.userEmail}
            onChange={handleInputChange}
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />

          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            value={formData.password}
            onChange={handleInputChange}
          />

          <textarea
            name="description"
            placeholder="Write profile bio"
            value={formData.description}
            onChange={handleInputChange}
          />

          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
          )}
          {success && (
            <div style={{ color: "green", marginBottom: "10px" }}>
              {success}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
        <img className="profile-pic" src={assets.logo_icon} alt="logo" />
      </div>
    </div>
  );
};

export default ProfileUpdate;
