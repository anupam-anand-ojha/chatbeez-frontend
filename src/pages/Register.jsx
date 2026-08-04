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

  const [IsRegistering, setIsRegistering] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsRegistering(true);

      const response = await api.post("/auth/register", formData);

      localStorage.setItem("token", response.data.token);

      console.log(response.data);

      navigate("/home");
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      {IsRegistering && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
          <div className="text-7xl animate-bounce">🐝</div>

          <h1 className="text-3xl lg:text-4xl font-black text-white mt-5">
            Creating Your <span className="text-warning">Hive</span>
          </h1>

          <p className="text-white/70 mt-2 animate-pulse">
            Warming up our servers...
          </p>

          <span className="loading loading-dots loading-lg text-warning mt-4"></span>
        </div>
      )}

      <div className="hero min-h-screen bg-base-transparent px-4">
        <div className="hero-content w-full">
          {/* Register Card */}
          <div className="aura aura-xs bg-yellow-500 3xl w-full max-w-md rounded-3xl">
            <div className="card bg-base-100 w-full max-w-md shadow-2xl rounded-3xl ">
              <form onSubmit={handleSubmit} className="card-body">
                {/* Heading */}
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">🐝</div>

                  <h1 className="text-4xl font-black">
                    Chat<span className="text-warning">Beez</span>
                  </h1>

                  <p className="text-sm text-base-content/70 mt-2">
                    Join the Hive and start buzzing
                  </p>
                </div>

                <fieldset className="fieldset">
                  <label className="label font-medium">Username</label>

                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="input input-bordered w-full rounded-xl"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />

                  <label className="label font-medium mt-2">Email</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full rounded-xl"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <label className="label font-medium mt-2">Password</label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full rounded-xl"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="submit"
                    className="btn btn-warning mt-5 w-full rounded-xl text-black font-bold"
                  >
                    Join the Hive
                  </button>

                  <p className="text-center mt-5 text-sm text-base-content/70">
                    Already have an account?{" "}
                    <Link to="/" className="link link-warning font-semibold">
                      Login
                    </Link>
                  </p>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
