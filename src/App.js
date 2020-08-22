import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Products from "./components/products";
import ProductForm from "./components/productForm";

import CheckoutForm from "./components/checkoutForm";
import Cart from "./components/cart";
import Home from "./components/home";
import Profile from "./components/profile";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import Navigation from "./components/navBar2";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        {/* <ToastContainer /> */}

        <NavBar user={user} />
        {/* <Navigation user={user} /> */}
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/products/:id" component={ProductForm} />
            <ProtectedRoute path="/checkout/:id" component={CheckoutForm} />
            <Route
              path="/products"
              render={(props) => <Products {...props} user={this.state.user} />}
            />
            <Route path="/home" component={Home} />
            <Route path="/customers" component={Cart} />
            <Route path="/profile" component={Profile} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/products" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
