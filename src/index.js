import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import {UserStoreProvider} from "./context/UserStoreProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <BrowserRouter>
      <UserStoreProvider>
        <App />
      </UserStoreProvider>
    </BrowserRouter>
);