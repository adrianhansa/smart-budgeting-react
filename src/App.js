import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/user/Register";
import AddUser from "./pages/user/AddUser";
import Users from "./pages/user/Users";
import Login from "./pages/user/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Expenses from "./pages/expenses/Expenses";
import Report from "./pages/reports/Report";
import AccountList from "./pages/accounts/AccountList";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/accounts" element={<AccountList />} />
            <Route path="/users" element={<Users />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
