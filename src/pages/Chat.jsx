import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../services/api";

const Chat = () => {
  const { userId } = useParams();
  const location = useLocation();

  const username =
    location.state?.username || "User";

  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    getProfile();
    getMessages();
  }, [userId]);

  const getProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setCurrentUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const res = await api.get(
        `/messages/${userId}`
      );

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      const res = await api.post(
        "/messages/send",
        {
          receiver: userId,
          text,
        }
      );

      setMessages((prev) => [
        ...prev,
        res.data,
      ]);

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      <div className="bg-white border-b p-4 shadow">
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
            <div className="bg-white border rounded-lg px-4 py-2 max-w-xs">
              {msg.text}
            </div>
          </div>
        ))}

      </div>

      <form
        onSubmit={sendMessage}
        className="bg-white border-t p-4 flex gap-2"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="flex-1 border rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          className="border rounded-lg px-6"
        >
          Send
        </button>
      </form>

    </div>
  );
};

export default Chat;