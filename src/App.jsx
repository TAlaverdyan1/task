import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";


export function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/45a5ds4fsdd5sdf545sd/admin" element={<Dashboard />} />
      <Route path="/45a5ds4fsdd5sdf545sd/users" element={<Users />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}
