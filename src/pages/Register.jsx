import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
      const response = await api.post("/auth/register", formData);

      console.log(response.data);
      navigate("/");
    } 
    catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="card bg-base-100 w-[450px] shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit} className="card-body p-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Create Account
            </h2>

            <fieldset className="fieldset">
              <label className="label">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="input input-bordered w-full"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <label className="label mt-4">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label className="label mt-4">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-neutral w-full mt-6"
              >
                Register
              </button>

              <p className="text-center mt-5 text-sm">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="link link-primary font-medium"
                >
                  Login

                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;