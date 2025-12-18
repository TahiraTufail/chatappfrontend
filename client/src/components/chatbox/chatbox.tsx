import { useEffect, useState } from "react";
import assets from "../../assets/assets";
import "./chatbox.css";
import { useSocket } from "../../hooks/useSocket";
import type { Socket } from "socket.io-client";

interface ContactUser {
  id: number;
  name: string;
}

interface Contact {
  id: number;
  phoneNumber: string;
  contactUser?: ContactUser;
}

interface ChatBoxProps {
  selectedContact: Contact | null;
}

const ChatBox = ({ selectedContact }: ChatBoxProps) => {
  return (
    <>
      {selectedContact ? (
        <div className="ChatBox">
          <div className="chatuser">
            <img src={assets.profile_img} alt="" />
            <p>
              {selectedContact.contactUser?.name || "Unknown"}{" "}
              <img src={assets.green_dot} alt="" className="dot" />
            </p>
            <img src={assets.help_icon} alt="" className="help" />
          </div>
          <div className="chat_message">
            <div className="s_message">
              <p className="msg">hellooooo</p>
              <div>
                <img src={assets.profile_img} alt="" />
                <p>1:30AM</p>
              </div>
            </div>
            <div className="s_message">
              <img src={assets.pic1} alt="" />
              <div>
                <img src={assets.profile_img} alt="" />
                <p>1:30AM</p>
              </div>
            </div>
            <div className="r_message">
              <p className="msg">heyyyyy</p>
              <div>
                <img src={assets.profile_img} alt="" />
                <p>4:40PM</p>
              </div>
            </div>
          </div>

          <div className="chat_input">
            <input type="text" placeholder="Send a message" />
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              hidden
            />
            <label htmlFor="image">
              <img src={assets.gallery_icon} alt="" />
            </label>
            <img src={assets.send_button} alt="" />
          </div>
        </div>
      ) : (
        <div className="no-chat-selected">
          <p>Click any chat to start conversation</p>
        </div>
      )}
    </>
  );
};

export default ChatBox;
