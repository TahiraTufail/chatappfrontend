import { useState } from "react";
import assets from "../../assets/assets";
import "./profileupdate.css";

const ProfileUpdate = () => {
  const [image, setImage] = useState<File | false>(false);

  return (
    <div className="profile">
      <div className="profile-container">
        <form>
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
          <input type="text" placeholder="Your name" required />
          <input type="text" placeholder="Your Email" required />
          <textarea placeholder="write profile bio" required />
          <button type="submit">Save</button>
        </form>
        <img className="profile-pic" src={assets.logo_icon} alt="logo" />
      </div>
    </div>
  );
};

export default ProfileUpdate;
