import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import socket from "../socket";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    getUsers();
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

  const getUsers = async () => {
    try {
      const res = await api.get("/user");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-4xl mx-auto p-5">

        <div className="bg-white rounded-lg shadow p-4 mb-5">
          <h1 className="text-2xl font-bold">
            Welcome {currentUser?.username}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">
            Users
          </h2>

          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() =>
                  navigate(`/chat/${user._id}`, {
                    state: {
                      username: user.username,
                    },
                  })
                }
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              >
                <h3 className="font-semibold">
                  {user.username}
                </h3>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;