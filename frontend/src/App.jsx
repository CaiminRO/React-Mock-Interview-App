import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import YourTodoList from './pages/YourTodoList';
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./layouts/Layout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";

const App = () => {
  return (
    <BrowserRouter>
      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Global */}
          <Route index element={<Home />} />

          {/* Unauthorized ONLY */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* Authorized ONLY */}
          <Route element={<AuthorizedLayout />}>
            <Route path="todos" element={<YourTodoList />} />
          </Route>

          {/* Admin ONLY*/}
          <Route path="admin" element={<AdminDashboard />} />

          {/* Not Found */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
