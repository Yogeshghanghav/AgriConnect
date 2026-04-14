import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          AgriConnect
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/crops" className="hover:text-yellow-300">Crops</Link>
          <Link to="/weather" className="hover:text-yellow-300">Weather</Link>
          <Link to="/market" className="hover:text-yellow-300">Market</Link>
          <Link to="/my-crops"  className="hover:text-yellow-300">MyCrops</Link>
          <Link to="Login" classNAme="hover:text-yellow-300">Log in</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;