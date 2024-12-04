import React, { useContext } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const width = useWindowWidth();
  const { isAuthenticated, isAdmin, user } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>Window Width: {width}px</p>
      {isAuthenticated && user ? (
        <div className="user-info">
          <h2>User Information:</h2>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {isAdmin &&
            <p>
              <strong>You are an Admin</strong>
            </p>
          }
        </div>
      ) : (
        <p>Please log in to see your information.</p>
      )}
    </div>
  );
};

export default Home;
