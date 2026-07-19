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
    <div className="navbar bg-base-200 border-b border-warning/20 shadow-sm px-4">
      <div className="flex items-center gap-3">

        <div>
          <h1 className="text-xl font-bold">
            🐝 {username}
          </h1>

          <p className="text-xs text-warning">
            Buzzing in the Hive...
          </p>
        </div>

      </div>
    </div>

    {/* Messages */}
    <div
      className="
      flex-1
      overflow-y-auto
      p-5
      bg-gradient-to-b
      from-yellow-50/40
      via-base-100
      to-yellow-100/30
      "
    >
      {messages.map((msg, index) => {

        const isMe =
          msg.sender?.toString() === currentUser?._id;

        return (

          <div
            key={msg._id || index}
            className={`chat ${
              isMe ? "chat-end" : "chat-start"
            }`}
          >
            {/*for username on top of chat bubble }

            {/* <div className="chat-header mb-1 text-xs">

              {isMe ? "" : username}
            </div> */}

            <div
              className={`chat-bubble shadow-lg rounded-3xl ${
                isMe
                  ? "bg-warning text-black"
                  : "bg-base-200 border border-warning/20"
              }`}
            >
              {msg.text}
            </div>

            <div className="chat-footer text-xs opacity-60 mt-1">
              {isMe
                ? "🐝 sent"
                : "🍯 Received"}

                <time className="text-xs opacity-50 ml-2">

                {msg.createdAt
                  ? new Date(
                      msg.createdAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}

              </time>
            </div>

          </div>

        );
      })}
    </div>

    {/* Input */}
    <form
      onSubmit={sendMessage}
      className="
      p-4
      border-t
      border-warning/20
      bg-base-200
      flex
      gap-3
      "
    >

      <input
        type="text"
        placeholder="Type your sweet message..."
        className="
        input
        input-bordered
        rounded-2xl
        flex-1
        focus:border-warning
        "
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button
        type="submit"
        className="
        btn
        btn-warning
        rounded-2xl
        font-bold
        text-black
        px-6
        "
      >
        🍯 Send
      </button>

    </form>

  </div>
);
};

export default Chat;