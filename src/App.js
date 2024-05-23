import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 felx flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        
      </Routes>
    </div>
  );
}

export default App;
