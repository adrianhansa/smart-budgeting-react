import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/user/Register";
import Users from "./pages/user/Users";
import Login from "./pages/user/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Expenses from "./pages/expenses/Expenses";
import Incomes from "./pages/incomes/Incomes";
import AccountList from "./pages/accounts/AccountList";
import EventLogs from "./pages/reports/EventLogs";
import Welcome from "./pages/Welcome";
import io from "socket.io-client";
import axios from "axios";
import Savings from "./pages/savings/Savings";
import { URL } from "./constants/url";
axios.defaults.withCredentials = true;

const socket = io.connect(`${URL}`);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Header socket={socket} />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/expenses" element={<Expenses socket={socket} />} />
            <Route path="/incomes" element={<Incomes socket={socket} />} />
            <Route path="/accounts" element={<AccountList />} />
            <Route path="/savings" element={<Savings socket={socket} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/events" element={<EventLogs />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
