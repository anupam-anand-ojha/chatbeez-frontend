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
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Welcome */}
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <h1 className="text-3xl font-bold">
              Welcome, {currentUser?.username}
            </h1>
            <p className="text-sm opacity-70">
              Select a user to start chatting.
            </p>
          </div>
        </div>

        {/* Users */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title mb-4">Users</h2>

            <ul className="list bg-base-100 rounded-box">
              {users.map((user) => (
                <li
                  key={user._id}
                  onClick={() =>
                    navigate(`/chat/${user._id}`, {
                      state: {
                        username: user.username,
                      },
                    })
                  }
                  className="list-row cursor-pointer hover:bg-base-200 transition-colors"
                >
                  {/* Avatar */}
                  {/* <div className="avatar placeholder"> */}
                    <div className="bg-primary text-primary-content rounded-full w-12 ">
                      <span className="text-lg font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  {/* </div> */}

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="font-semibold text-base">
                      {user.username}
                    </div>
                    <div className="text-sm opacity-60">
                      {user.email}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 opacity-40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
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