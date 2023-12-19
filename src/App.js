import './App.css';
import {Routes, Route, useLocation, Navigate} from "react-router-dom";
import Register from './page/Register'
import LogIn from "./page/LogIn";
import ForgotPwd from "./page/ForgotPwd";
import ResetPwd from "./page/ResetPwd";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import Home from "./page/Home";
import Footer from "./components/Footer/Footer";
import React from "react";
import LoginCallback from "./components/LoginCallback";
import ListTeachingClasses from "./page/Classes/ListTeachingClasses";
import ClassDetail from "./page/Classes/ClassDetail";
import JoinClassByLink from "./page/Classes/JoinClassByLink";
import ListJoinedClasses from "./page/Classes/ListJoinedClasses";
import Profile from './page/Profile';
import {AuthRoute} from "./AuthRoute";
import HomeComponent from "./page/Grades/GradeManagement/Test";
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
        <Route exact path="/test" element={<HomeComponent/>} />

        <Route exact path="/" element={<Home/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<LogIn/>} />

        <Route exact path="/handleUserData" element={<LoginCallback/>} />

        <Route exact path="/forgot-password" element={<ForgotPwd/>} />
        <Route exact path="/reset-password" element={<ResetPwd/>} />
        <Route exact path="/teaching-classes"
               element={
                 <AuthRoute>
                   <ListTeachingClasses />
                 </AuthRoute>
               }
        />
        <Route exact path="/joined-classes" element={<ListJoinedClasses/>} />
        <Route path="/class" element={<Navigate to="/" replace />} />
        <Route exact path="/class/:classId"
               element={
                 <AuthRoute>
                   <ClassDetail />
                 </AuthRoute>
               }
        />
        <Route exact path="/join-class/:classCode"
               element={
                 <AuthRoute>
                   <JoinClassByLink />
                 </AuthRoute>
               }
        />
        <Route exact path="/profile"
               element={
                 <AuthRoute>
                   <Profile />
                 </AuthRoute>
               }
        />

      </Routes>

      <Footer sx={{ mt: 8, mb: 4 }} />

    </>

  );
}

export default App;
