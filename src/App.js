import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Expenses from "./pages/expenses/Expenses";
import Report from "./pages/reports/Report";
import { Col, Row } from "react-bootstrap";

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
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reports" element={<Report />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
