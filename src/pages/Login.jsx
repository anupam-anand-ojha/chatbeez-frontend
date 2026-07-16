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
    <div className="hero min-h-screen bg-base-200 px-4">
      <div className="hero-content w-full">

        {/* Login Card */}
        <div className="card aura aura-dual bg-base-100 w-full max-w-md shadow-2xl rounded-3xl border border-base-300">

          <form onSubmit={handleSubmit} className="card-body">

            {/* Heading */}
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🐝</div>

              <h1 className="text-4xl font-black">
               Chat<span className="text-warning">Beez</span>
            </h1>

              <p className="text-sm text-base-content/70 mt-2">
                Welcome back to the Hive
              </p>
            </div>

            <fieldset className="fieldset">

              <label className="label font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full rounded-xl"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label className="label font-medium mt-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full rounded-xl"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="mt-2 flex justify-end">
                <a className="link link-hover text-sm text-warning">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-warning mt-5 w-full rounded-xl text-black font-bold"
              >
                Login to Hive
              </button>

              <p className="text-center mt-5 text-sm text-base-content/70">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="link link-warning font-semibold"
                >
                  Join the Hive
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