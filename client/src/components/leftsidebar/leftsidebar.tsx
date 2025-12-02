import { useState } from "react";
import assets from "../../assets/assets";
import "./leftsidebar.css";
import { useNavigate } from "react-router-dom";
const LeftSideBar = () => {
  const [showPopUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p>logout</p>
              <hr />
              <p
                onClick={() => {
                  setPopUp(true);
                  navigate("/chat/addcontact");
                }}
              >
                Add Contact
              </p>
            </div>
          </div>
        </div>
        <div className="search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder="Search here..." />
        </div>
        <div className="ls-list">
          {Array(12)
            .fill("")
            .map((item, index) => (
              <div key={index} className="friends">
                <img src={assets.profile_img} alt="" />
                <div>
                  <p>Tahira Tufail</p>
                  <span>hey gurlllll</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
