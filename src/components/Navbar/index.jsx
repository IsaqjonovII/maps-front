import React from "react";
import { FaCar, FaSearch, FaUser } from "react-icons/fa";
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
        <div className="flex items-center justify-end w-full h-full max-w-xl">
          <Link to="/list" className="mr-4 text-lg capitalize text-slate-600">
            <p>list</p>
          </Link>
          <div className="w-full max-w-sm h-12 flex items-center justify-between rounded-lg border border-slate-400 mr-4 ">
            <input type="text" placeholder="Search gas station" className="w-full h-full outline-none border-none bg-transparent indent-4" />
            <FaSearch className="text-xl text-slate-600 mr-4" />
          </div>
          <Link to="/profile">
            <div className="flex items-center justify-between px-4 py-2 rounded border border-slate-400 text-slate-600 cursor-pointer hover:text-green-400 hover:border-green-400 transition-colors">
              <FaUser className="mr-3" />
              <p>Profile</p>
            </div>
          </Link>
        </div>
      </div>
    );
};

export default Navbar;
