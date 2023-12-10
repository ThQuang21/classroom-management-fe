import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Register from './page/Register'
import LogIn from "./page/LogIn";
import ForgotPwd from "./page/ForgotPwd";
import ResetPwd from "./page/ResetPwd";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import Home from "./page/Home";
import Footer from "./components/Footer/Footer";
import React from "react";
import LoginCallback from "./components/LoginCallback";
import {UserStoreProvider} from "./context/UserStoreProvider";
import ListClasses from "./page/ListClasses";

function App() {
  const location = useLocation();

  const isListPage = () => {
    const listPages = ["/register", "/login", "/forgot-password", "/reset-password"];
    const currentPath = location.pathname;
    return listPages.includes(currentPath);
  };

  return (
    <UserStoreProvider>
      {isListPage() ? null : <ResponsiveAppBar /> }

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<LogIn/>} />

        <Route exact path="/handleUserData" element={<LoginCallback/>} />

        <Route exact path="/forgot-password" element={<ForgotPwd/>} />
        <Route exact path="/reset-password" element={<ResetPwd/>} />

        <Route exact path="/teaching-classes" element={<ListClasses/>} />

      </Routes>

      <Footer sx={{ mt: 8, mb: 4 }} />

    </UserStoreProvider>

  );
}

export default App;
