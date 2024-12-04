import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const { token, logout, user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data);
      }
      catch (error) {
        console.error(error);

        if (error.response && error.response.status === 401)
          logout();
        else if (error.response && error.response.status === 403)
          alert('Access denied. Admins only.');
      }
    };
    
    fetchUsers();
  }, [logout, token]);

  const handleAdminToggle = async (userId, isAdmin) => {
    if (userId === currentUser.id) {
      alert('You cannot change your own admin status.');
      return;
    }

    try {
      await axios.put(
        `/api/admin/users/${userId}/admin`,
        { is_admin: isAdmin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, is_admin: isAdmin } : user
        )
      );
    }
    catch (error) {
      console.error('Error updating admin status:', error);
      alert('Failed to update admin status.');
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_admin ? 'Yes' : 'No'}</td>
              <td>
                <button
                  onClick={() => handleAdminToggle(user.id, !user.is_admin)}
                  className="button"
                >
                  {user.is_admin ? 'Revoke Admin' : 'Make Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
