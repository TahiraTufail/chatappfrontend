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
}

const RightSideBar = ({ selectedContact }: RightSideBarProps) => {
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
        </>
      ) : (
        <div className="rs-empty">
          <p>Select a contact to view details</p>
        </div>
      )}
      <hr />
      <button>Delete</button>
    </div>
  );
};

export default RightSideBar;
