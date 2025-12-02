import assets from "../../assets/assets";
import "./rightsidebar.css";
const RightSideBar = () => {
  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={assets.profile_img} alt="" />
        <h3>
          Richard stanford <img className="dot" src={assets.green_dot} />{" "}
        </h3>
        <p>Hey, there I'm Richard</p>
      </div>
      <hr />
      <button>Logout</button>
      
    </div>
  );
}
export default RightSideBar;
