import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import YourTodoList from './pages/YourTodoList';
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import UnauthorizedLayout from "./layouts/UnauthorizedLayout";

const App = () => {
  return (
    <BrowserRouter>
      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Global */}
          <Route index element={<Home />} />

          {/* Unauthorized ONLY */}
          <Route element={<UnauthorizedLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Authorized ONLY */}
          <Route element={<AuthorizedLayout />}>
            <Route path="todos" element={<YourTodoList />} />
          </Route>

          {/* Admin ONLY*/}
          <Route element={<AdminLayout />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>

          {/* Not Found */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
