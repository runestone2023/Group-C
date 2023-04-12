import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppLayout from "./containers/AppLayout/AppLayout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppLayout />
  </React.StrictMode>
);
