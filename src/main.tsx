import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
