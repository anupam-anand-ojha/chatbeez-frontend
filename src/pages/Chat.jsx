import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../services/api";
import socket from "../socket";

const Chat = () => {
  const { userId } = useParams();
  const location = useLocation();

  const username = location.state?.username || "User";

  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    getProfile();
    getMessages();
  }, [userId]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: Date.now(),
          sender: data.sender,
          receiver: data.receiver,
          text: data.text,
        },
      ]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const getProfile = async () => {
    try {
      const res = await api.get("/user/profile");

      setCurrentUser(res.data);

      socket.emit("join", res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const res = await api.get(`/messages/${userId}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      const res = await api.post("/messages/send", {
        receiver: userId,
        text,
      });

      socket.emit("send-message", {
        sender: currentUser._id,
        receiver: userId,
        text,
      });

      setMessages((prev) => [...prev, res.data]);

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-base-100">
      {/* Header */}
      <div className="navbar bg-base-200 border-b">
        <div className="flex-1 px-4">
          <h1 className="text-lg font-semibold">{username}</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-base-100">
        {messages.map((msg, index) => {
          const isMe = msg.sender?.toString() === currentUser?._id;

          return (
            <div
              key={msg._id || index}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header">
                {isMe ? "You" : username}
                <time className="text-xs opacity-50 ml-2">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </time>
              </div>

              <div
                className={`chat-bubble ${
                  isMe ? "chat-bubble-success text-white" : "chat-bubble-neutral"
                }`}
              >
                {msg.text}
              </div>

              <div className="chat-footer opacity-50">
                {isMe ? "Sent" : "Received"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t bg-base-200 flex gap-2"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;