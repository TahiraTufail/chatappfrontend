import assets from "../../assets/assets";
import "./leftsidebar.css";
const LeftSideBar = () => {
  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
          </div>
        </div>
        <div className="search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder="Search here..." />
        </div>
        <div className="ls-list">
          {Array(12)
            .fill("")
            .map((item,index) => (
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
