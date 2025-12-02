import "./chat.css";
import LeftSideBar from "../../components/leftsidebar/leftsidebar";
import RightSideBar from "../../components/rightsidebar/rightsidebar";
import ChatBox from "../../components/chatbox/chatbox";
const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-container">
        <LeftSideBar />
        <ChatBox />
        <RightSideBar />
      </div>
      
    </div>
  );
};

export default Chat;
