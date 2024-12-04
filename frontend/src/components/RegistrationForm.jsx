import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!form.username)
      errors.username = 'Username is required';

    if (!form.email)
      errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errors.email = 'Email is invalid';

    if (!form.password)
      errors.password = 'Password is required';
    else if (form.password.length < 6)
      errors.password = 'Password must be at least 6 characters';

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const message = await register(form);
        setSuccessMessage(message);
        setForm({ username: '', email: '', password: '' });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
      catch (error) {
        console.error(error);

        if (error.response && error.response.data && error.response.data.message)
          setErrors({ form: error.response.data.message });
        else
          setErrors({ form: 'An error occurred. Please try again.' });
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {successMessage && (
        <div className="success">
          <p>{successMessage}</p>
          <p>
            Redirecting to <Link to="/login">Login</Link>...
          </p>
        </div>
      )}

      {errors.form && <p className="error">{errors.form}</p>}

      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <small className="error">{errors.username}</small>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <small className="error">{errors.email}</small>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <small className="error">{errors.password}</small>}
      </div>
      <button type="submit" className="button">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
