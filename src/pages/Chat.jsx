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
    } 
    catch (error) {
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

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
       {messages.map((msg, index) => (
      <div
      key={msg._id || index}
      className={`flex mb-3 ${
        msg.sender?.toString() === currentUser?._id
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
          msg.sender?.toString() === currentUser?._id
            ? "bg-green-500 text-white"
            : "bg-white border text-black"
        }`}
      >
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