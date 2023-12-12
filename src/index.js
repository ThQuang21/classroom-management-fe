import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import {UserStoreProvider} from "./context/UserStoreProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserStoreProvider>
        <App />
      </UserStoreProvider>
    </BrowserRouter>
  </React.StrictMode>

);