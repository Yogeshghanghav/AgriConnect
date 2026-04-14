import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const AuthPage = () => {
  const location = useLocation();
  const isLoginPath = location.pathname === "/login";
  const [isLogin, setIsLogin] = useState(isLoginPath);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLogin(isLoginPath);
    setError("");
  }, [isLoginPath]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    navigate(isLogin ? "/register" : "/login");
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const res = await axios.post(url, formData);
      const userData = isLogin ? res.data.user : res.data;
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl">
        {/* Left side */}
        <div className="w-1/2 bg-green-900 text-white p-10 flex flex-col justify-between rounded-l-3xl">
          <div className="text-xl font-bold">🌿 AgriConnect</div>
          <div className="flex-grow flex items-center justify-center text-center">
            <h2 className="text-4xl font-extrabold">WELCOME BACK!</h2>
          </div>
          <div className="space-x-6 text-sm text-green-300 text-center">
            <a href="#" className="hover:underline">HOME</a>
            <a href="#" className="hover:underline">ABOUT</a>
            <a href="#" className="hover:underline">CONTACT</a>
            <a href="#" className="underline">LOG IN</a>
          </div>
        </div>

        {/* Right side */}
        <div className="w-1/2 bg-black text-white p-10 flex flex-col justify-center rounded-r-3xl">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {isLogin ? "🔐 Log In" : "📝 Register"}
          </h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="flex items-center bg-green-800 rounded-full px-4 py-2">
                  <FaUser className="mr-3 text-white" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-transparent outline-none w-full text-white placeholder-white"
                  />
                </div>
                <div className="flex items-center bg-green-800 rounded-full px-4 py-2">
                  <FaUser className="mr-3 text-white" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-transparent outline-none w-full text-white placeholder-white"
                  />
                </div>
              </>
            )}

            <div className="flex items-center bg-green-800 rounded-full px-4 py-2">
              <FaUser className="mr-3 text-white" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-white placeholder-white"
              />
            </div>

            <div className="flex items-center bg-green-800 rounded-full px-4 py-2">
              <FaLock className="mr-3 text-white" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-white placeholder-white"
              />
            </div>

            <div className="text-sm flex justify-between text-gray-400">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="bg-white text-black font-semibold py-2 rounded-full w-full hover:bg-green-100"
            >
              {isLogin ? "Log In" : "Register"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            {isLogin ? "New to AgriConnect?" : "Already have an account?"}{" "}
            <span
              onClick={toggleMode}
              className="text-green-400 font-semibold cursor-pointer hover:underline"
            >
              {isLogin ? "Sign up here" : "Log in instead"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
