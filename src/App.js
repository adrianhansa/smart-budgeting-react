import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/user/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Register} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
