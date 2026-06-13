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
          sender: userId,
          text: data.text,
        },
      ]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [userId]);

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
        receiverId: userId,
        text,
      });

      setMessages((prev) => [...prev, res.data]);

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col">

      <div className="border-b p-4">
        <h1 className="text-xl font-bold">
          {username}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex mb-3 ${
              msg.sender === currentUser?._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div className="border rounded-lg px-4 py-2 max-w-xs">
              {msg.text}
            </div>
          </div>
        ))}

      </div>

      <form
        onSubmit={sendMessage}
        className="border-t p-4 flex gap-2"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
        />

        <button
          type="submit"
          className="border px-5 rounded"
        >
          Send
        </button>
      </form>

    </div>
  );
};

export default Chat;