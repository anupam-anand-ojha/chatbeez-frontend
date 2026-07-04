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
      const response = await api.post("/auth/login", formData);

      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen ">
      <div className="hero-content">

        {/* Login Card */}
        <div className="card bg-base-100 w-[450px] min-h-[400px] shadow-2xl rounded-2xll">
          <form onSubmit={handleSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label className="label mt-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="mt-2">
                <a className="link link-hover text-sm">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn btn-neutral mt-4 w-full">
                Login
              </button>

              <p className="text-center mt-4 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="link link-primary font-medium"
                >
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;