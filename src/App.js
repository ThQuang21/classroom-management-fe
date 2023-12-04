import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Register from './components/Register'
import LogIn from "./components/LogIn";
import ForgotPwd from "./components/ForgotPwd";
import ResetPwd from "./components/ResetPwd";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";
import React from "react";
import SocialLogin from "./components/SocialLogin";

function App() {
  const location = useLocation();

  const isListPage = () => {
    const listPages = ["/register", "/login", "/forgot-password", "/reset-password"];
    const currentPath = location.pathname;
    return listPages.includes(currentPath);
  };

  return (
    <>
      {isListPage() ? null : <ResponsiveAppBar /> }

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<LogIn/>} />
        <Route exact path="/login1" element={<SocialLogin/>} />

        <Route exact path="/forgot-password" element={<ForgotPwd/>} />
        <Route exact path="/reset-password" element={<ResetPwd/>} />
      </Routes>

      <Footer sx={{ mt: 8, mb: 4 }} />

    </>

  );
}

export default App;
