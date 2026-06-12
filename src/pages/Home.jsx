import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() =>
              navigate(`/chat/${user._id}`)
            }
            className="border p-4 rounded cursor-pointer hover:bg-gray-100"
          >
            <h2 className="font-semibold">
              {user.username}
            </h2>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;