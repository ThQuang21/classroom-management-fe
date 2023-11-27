import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './components/Register'

function App() {
  return (
    <Routes>
      <Route exact path="/register" element={<Register/>} />
    </Routes>
  );
}

export default App;
