import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
