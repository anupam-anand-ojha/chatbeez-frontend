import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Chat = () => {
  const { userId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => { fetchMessages(); }, [userId]);

  const fetchMessages = async () => {
    try {
      const res = await api.get( `/messages/${userId}`);
      setMessages(res.data);

    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      const res = await api.post("/messages/send",
        {
          receiver: userId,
          text,
        }
      );

      setMessages((prev) => [...prev, res.data, ]);
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
          Chat
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {messages.map((msg) => (
          <div
            key={msg._id}
            className="border rounded p-2 mb-2"
          >
            {msg.text}
          </div>
        ))}

      </div>

      <form
        onSubmit={handleSend}
        className="p-4 border-t flex gap-2"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="border p-3 flex-1 rounded"
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