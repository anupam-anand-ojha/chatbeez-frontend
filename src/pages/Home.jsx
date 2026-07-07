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
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-3xl mx-auto px-4">

        {/* Welcome Card */}
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h1 className="text-2xl font-bold">
              Welcome {currentUser?.username}
            </h1>
          </div>
        </div>

        {/* User List */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title mb-3">Users</h2>

            <ul className="menu bg-base-100 rounded-box w-full">
              {users.map((user) => (
                <li key={user._id}>
                  <a
                    onClick={() =>
                      navigate(`/chat/${user._id}`, {
                        state: {
                          username: user.username,
                        },
                      })
                    }
                    className="py-3"
                  >
                    <div>
                      <p className="font-semibold">{user.username}</p>
                      <p className="text-sm opacity-60">{user.email}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;