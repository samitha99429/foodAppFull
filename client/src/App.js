import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/common/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritePage from './pages/FavoritePage';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      {isAuthenticated && <Navbar />}  
      <Routes>

        <Route path="/login" element={isAuthenticated ? <Navigate to="/homepage" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/homepage" /> : <RegisterPage />} />

        <Route path="/homepage" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={isAuthenticated ? <FavoritePage /> : <Navigate to="/login" />} />

        <Route path="/" element={isAuthenticated ? <Navigate to="/homepage" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
