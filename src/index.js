import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./ReduxProvider/store";
import { Provider } from "react-redux";
import { AdminState } from "./Context/AdminContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AdminState>
        <App />
      </AdminState>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
