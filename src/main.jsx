// import React from 'react'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from "./components/app/App";
import store from "./store";

import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Provider store={store}>
        <ToastContainer />
        <App />
    </Provider>
    // </React.StrictMode>
);
