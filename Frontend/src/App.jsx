import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/SignIn.jsx'

import './App.css'
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
