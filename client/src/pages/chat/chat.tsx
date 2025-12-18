import "./chat.css";
import LeftSideBar from "../../components/leftsidebar/leftsidebar";
import RightSideBar from "../../components/rightsidebar/rightsidebar";
import ChatBox from "../../components/chatbox/chatbox";
import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
const Chat = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const token = localStorage.getItem("token");
  const { socket, isConnected } = useSocket(token);
  const [room, setRoom] = useState<any>(null);

  useEffect(() => {
    if (socket && isConnected) {
      console.log("Socket is ready to use");

      // Listen for custom events
      socket.on("chat-room-joined", (data: any) => {
        console.log("New message received:", data);
        setRoom(data.chatRoomId);
      });

      // Cleanup listeners
      return () => {
        socket.off("message");
      };
    }
  }, [socket, isConnected]);
  return (
    <div className="chat">
      <div className="chat-container">
        <LeftSideBar
          onSelectContact={setSelectedContact}
          socket={socket!}
          isConnected={isConnected}
        />
        <ChatBox selectedContact={selectedContact} />
        <RightSideBar selectedContact={selectedContact} />
      </div>
    </div>
  );
};

export default Chat;
