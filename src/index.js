import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "font-awesome/css/font-awesome.css";

// import "materialize-css/dist/css/materialize.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./bootstrap-overwrite.css";
import cartReducer from "./components/redux/reducers/cartReducer";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(cartReducer);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
