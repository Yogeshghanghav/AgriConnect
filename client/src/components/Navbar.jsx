import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <nav className="bg-green-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-white">
          🌿 AgriConnect
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/crops" className="hover:text-yellow-300">Crops</Link>
          <Link to="/weather" className="hover:text-yellow-300">Weather</Link>
          <Link to="/market" className="hover:text-yellow-300">Market</Link>
          <Link to="/farmer" className="hover:text-yellow-300">Farmer</Link>
          {parsedUser ? (
            <>
              <span className="text-yellow-200 text-sm italic">
                Hi, {parsedUser.name || parsedUser.username || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300">Login</Link>
              <Link to="/register" className="hover:text-yellow-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
