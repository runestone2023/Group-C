import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./pages/routers";
import { BrowserRouter } from "react-router-dom";
import customTheme from "./theme";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
// import { ModalsProvider } from "@mantine/modals";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={customTheme}>
        <AppRoutes />
        <Notifications position="top-right" />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
