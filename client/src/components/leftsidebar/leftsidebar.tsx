import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import assets from "../../assets/assets";
import "./leftsidebar.css";
import { useNavigate } from "react-router-dom";

interface ContactUser {
  id: number;
  name: string;
}

interface Contact {
  id: number;
  phoneNumber: string;
  contactUser?: ContactUser;
}

const LeftSideBar = () => {
  const [showPopUp, setPopUp] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllContacts = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/contacts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(response.data);
    };
    fetchAllContacts();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // ✅ Check if token exists

      if (!token) {
        console.error("No token found - user not authenticated");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/contacts/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Search response:", response.data);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        if (value.trim() !== "") {
          handleSearch(value);
        } else {
          setContacts([]);
        }
      }, 300)
    );
  };

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
              <p>Logout</p>
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
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>

        <div className="ls-list">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div key={contact.id} className="friends">
                <img src={assets.profile_img} alt="" />
                <div>
                  <p>{contact.contactUser?.name || "No Name"}</p>
                  <span>{contact.phoneNumber || "No Phone"}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No Contacts</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
