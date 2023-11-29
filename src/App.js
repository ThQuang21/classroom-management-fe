import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './components/Register'
import LogIn from "./components/LogIn";
import ForgotPwd from "./components/ForgotPwd";
import ResetPwd from "./components/ResetPwd";

function App() {
  return (
    <Routes>
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/login" element={<LogIn/>} />
      <Route exact path="/forgot-password" element={<ForgotPwd/>} />
      <Route exact path="/reset-password" element={<ResetPwd/>} />

    </Routes>
  );
}

export default App;
