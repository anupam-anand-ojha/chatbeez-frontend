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

    
    <div className="min-h-screen bg-transparent bg-no-repeat bg-[length:150%] bg-fixed py-8 "
         style={{ backgroundImage: "url('/bg2.jpg')" }}>

      <div className="max-w-3xl mx-auto px-4">
     {/* Welcome */}
      <div className="hero rounded-3xl bg-neutral text-neutral-content shadow-2xl border border-warning mb-8 overflow-hidden">
          <div className="hero-content text-center py-14">
            <div>
              <div className="badge badge-warning badge-lg font-semibold mb-5">
                🐝 CHATBEEZ
              </div>

              <h1 className="text-4xl md:text-5xl font-bold">
                Welcome {currentUser?.username}
              </h1>

              <p className="py-4 opacity-80 max-w-xl">
                Welcome to the Hive. Pick a bee buddy and start
                buzzing instantly with seamless real-time chats.
              </p>

              <div className="flex justify-center gap-2 flex-wrap">
                <div className="badge badge-warning badge-outline">
                  Real-Time Chat
                </div>

                <div className="badge badge-warning badge-outline">
                  Secure Messaging
                </div>

                <div className="badge badge-warning badge-outline">
                  Lightning Fast
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Users */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-warning text-2xl"> Hive Members </h2>

            <div className="divider text-warning"> 🐝 START BUZZING 🐝 </div>

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
               className="list-row cursor-pointer rounded-xl hover:bg-[#FFE082] hover:shadow-md transition-all duration-100"
                >
                  {/* Avatar */}
                  {/* <div className="avatar placeholder"> */}
                    <div className="w-12 h-12 rounded-full bg-warning text-warning-content flex items-center justify-center shrink-0">
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