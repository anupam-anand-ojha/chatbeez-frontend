import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      console.log(response.data);

      navigate("/home");
    } catch (error) {
      console.error(
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] border p-6 rounded-lg"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 w-full mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-3 w-full mb-4"
        />

        <button
          type="submit"
          className="border p-3 w-full"
        >
          Login
        </button>

        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;