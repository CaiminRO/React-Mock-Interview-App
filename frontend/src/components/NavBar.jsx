import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';

const NavBar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      {!isAuthenticated ? (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/todos">My To-Dos</Link>

          {isAdmin && <Link to="/admin">Admin Dashboard</Link>}

          <button onClick={logout} className="button">
            Logout
          </button>
        </>
      )}

      <button onClick={toggleTheme} className="button">
        Toggle Theme
      </button>
    </nav>
  );
};

export default NavBar;
