import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LaporanForm from './components/LaporanForm';
import LaporanList from './components/LaporanList';
import Dashboard from './components/Admin/Dashboard';
import LoginForm from './components/Admin/LoginForm';

const App = () => {
  const isAdminLoggedIn = () => {
    return !!localStorage.getItem('adminToken');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <header className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Lapor Masalah Publik</Link>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="hover:text-blue-200">Home</Link>
                </li>
                <li>
                  <Link to="/laporan" className="hover:text-blue-200">Daftar Laporan</Link>
                </li>
                <li>
                  <Link to="/admin/login" className="hover:text-blue-200">Login Admin</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LaporanForm />} />
            <Route path="/laporan" element={<LaporanList />} />
            <Route path="/admin/login" element={<LoginForm />} />
            <Route
              path="/admin"
              element={isAdminLoggedIn() ? <Dashboard /> : <Navigate to="/admin/login" />}
            />
          </Routes>
        </main>

        <footer className="bg-gray-200 p-4 mt-8 text-center">
          <p>© {new Date().getFullYear()} Lapor Masalah Publik</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;