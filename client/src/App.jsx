import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TableDetailPage from './pages/TableDetailPage';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/table/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <TableDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App; 