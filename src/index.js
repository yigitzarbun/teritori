import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myReducer } from "./redux-stuff/reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const depo = createStore(myReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={depo}>
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <App />
    </BrowserRouter>
  </Provider>
);
