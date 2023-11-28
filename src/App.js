import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './components/Register'
import LogIn from "./components/LogIn";

function App() {
  return (
    <Routes>
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/login" element={<LogIn/>} />
    </Routes>
  );
}

export default App;
