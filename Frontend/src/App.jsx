import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from '../src/pages/Auth/Login.jsx';
import Register from '../src/pages/Auth/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleRoute from './components/RolebasedRoute.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import './App.css'
import { AuthProvider } from './context/AuthContext.jsx';
import Dashboard from './pages/Dashboard.jsx';


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
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="/teacher"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["teacher", "admin"]}>
                  <TeacherDashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
