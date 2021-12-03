import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav>
      <h3>eBudgeting - A smarter way to handle your money.</h3>
      <NavLink to="/">Home</NavLink>|<NavLink to="/login">Login</NavLink>|
      <NavLink to="/register">Register</NavLink>|
      <button
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Header;
