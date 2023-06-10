import React from "react";
import { FaCar, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ token }) => {
  if (token)
    return (
      <div className="w-full py-4 h-[80px] px-16 flex items-center justify-between max-lg:px-5">
        <Link to="/">
          <div className="flex text-green-500 max-w-[8rem] items-center justify-center w-full h-full text-2xl">
            <FaCar />
            <span>vtoQulay</span>
          </div>
        </Link>
        <Link to="/profile">
          <div className="flex items-center justify-between px-4 py-2 rounded border border-slate-400 text-slate-600 cursor-pointer hover:text-green-400 hover:border-green-400 transition-colors">
            <FaUser className="mr-3" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
    );
};

export default Navbar;
