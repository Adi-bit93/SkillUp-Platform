import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from '../src/pages/Auth/Login.jsx';
import Register from '../src/pages/Auth/Register.jsx'
import Profile from '../src/pages/Auth/Profile.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';
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
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
