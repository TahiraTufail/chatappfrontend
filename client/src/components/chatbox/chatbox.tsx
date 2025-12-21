import { useEffect, useState, useRef } from "react";
import assets from "../../assets/assets";
import "./chatbox.css";
import { Socket } from "socket.io-client";

interface ContactUser {
  id: number;
  name: string;
}

interface Contact {
  id: number;
  phoneNumber: string;
  contactUser?: ContactUser;
}

interface Message {
  id: string;
  text: string;
  timestamp?: string;
  isSent: boolean;
}

interface ChatBoxProps {
  selectedContact: Contact | null;
  socket?: Socket;
  isConnected?: boolean;
  roomDetails: any;
}

const ChatBox = ({
  selectedContact,
  socket,
  isConnected,
  roomDetails,
}: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!roomDetails.chatRoomDetails?.messages) {
      setMessages([]);
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const loadedMessages = roomDetails.chatRoomDetails.messages.map(
      (m: any) => {
        return {
          id: m.id.toString(),
          text: m.content,
          timestamp: new Date(m.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }),
          isSent: m.sender.id === parseInt(userId),
        };
      }
    );

    setMessages(loadedMessages);
    setTimeout(scrollToBottom, 100);
  }, [roomDetails.chatRoomDetails]);

  // Setup socket listeners
  useEffect(() => {
    if (!socket) return;

    const handleReceivedMessage = (data: any) => {
      const newMessage: Message = {
        id: data.id?.toString() || crypto.randomUUID(),
        text: data.content,
        timestamp: new Date(data.createdAt).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        isSent: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setTimeout(scrollToBottom, 100);
    };

    const handleMessageAck = (data: any) => {
      setMessages((prevMessages) =>
        prevMessages.map((m: Message) =>
          m.id === data.messageId || m.id === data.id?.toString()
            ? {
                ...m,
                id: data.id?.toString() || m.id, // Update with server ID
                timestamp: new Date(data.createdAt).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  }
                ),
              }
            : m
        )
      );
    };

    socket.on("new-message", handleReceivedMessage);
    socket.on("message-sent", handleMessageAck);

    return () => {
      socket.off("new-message", handleReceivedMessage);
      socket.off("message-sent", handleMessageAck);
    };
  }, [socket]); // Only depend on socket

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    if (!isConnected || !socket) return;
    if (!roomDetails.chatRoomDetails?.id) return;

    const messageId = crypto.randomUUID();

    socket.emit("send-message", {
      messageId: messageId,
      content: inputValue.trim(),
      recipientId: roomDetails.recipientId,
      roomId: roomDetails.chatRoomDetails.id,
    });

    const newMessage: Message = {
      id: messageId,
      text: inputValue,
      isSent: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    setTimeout(scrollToBottom, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  console.log(
    "Messages being rendered:",
    messages.map((m) => ({
      id: m.id,
      text: m.text.substring(0, 20),
      isSent: m.isSent,
    }))
  );
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
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.isSent ? "s_message" : "r_message"}
              >
                <p className="msg">{message.text}</p>
                <div>
                  <img src={assets.profile_img} alt="" />
                  <p>{message.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat_input">
            <input
              type="text"
              placeholder="Send a message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              hidden
            />
            <label htmlFor="image">
              <img src={assets.gallery_icon} alt="" />
            </label>
            <img src={assets.send_button} alt="" onClick={handleSendMessage} />
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
