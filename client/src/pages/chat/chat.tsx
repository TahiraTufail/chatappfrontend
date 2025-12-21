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
  const [roomDetails, setRoomDetails] = useState<any>({
    chatRoomDetails: null,
    recipientId: null,
  });

  useEffect(() => {
    if (socket && isConnected) {
      console.log("Socket is ready to use");

      // Listen for custom events
      socket.on("chat-room-joined", (data: any) => {
        setRoomDetails({
          chatRoomDetails: data.chatRoomDetails,
          recipientId: data.secondUserId,
        });
      });

      // Cleanup listeners
      return () => {
        socket.off("chat-room-joined");
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
        <ChatBox
          selectedContact={selectedContact}
          socket={socket!}
          isConnected={isConnected}
          roomDetails={roomDetails}
        />
        <RightSideBar selectedContact={selectedContact} />
      </div>
    </div>
  );
};

export default Chat;
