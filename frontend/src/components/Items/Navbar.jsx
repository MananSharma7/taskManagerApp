import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../globalContext.jsx";

import "../styles/style.css";

const Navbar = () => {
  const { users, userLogout } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await userLogout();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex sm:justify-center px-5 py-7">
      <div className="position: absolute left-16 text-3xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
          Task Manager
        </span>
      </div>
      <div className="flex space-x-4  px-0.5 py-0.5 font-medium border-2 border-cyan-700 rounded-full text-cyan-700">
        <NavLink
          to="/"
          className={`
          ${({ isActive }) => (isActive ? "active" : "inactive")}
          rounded-full px-4 py-2 `}
        >
          Home
        </NavLink>
        <NavLink
          to="/profile"
          className={`
          ${({ isActive }) => (isActive ? "active" : "inactive")} 
          rounded-full px-4 py-2`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/about"
          className={`
          ${({ isActive }) => (isActive ? "active" : "inactive")} 
          rounded-full px-4 py-2`}
        >
          About
        </NavLink>
      </div>
      {!users && (
        <div>
          <NavLink
            to="/login"
            className="px-10 py-2 bg-cyan-600 text-white right-10 rounded-full 
            hover:bg-cyan-700 position: absolute font-bold mr-8"
          >
            Login
          </NavLink>
        </div>
      )}
      {users && (
        <div>
          <button
            className="bg-red-600 hover:bg-red-500 text-white rounded-full
             font-bold mr-8 px-10 py-2 position: absolute right-10"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
