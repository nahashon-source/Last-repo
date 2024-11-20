
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/authSlice'; // Import login async action
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the login action with credentials
      const response = await dispatch(loginUser(credentials)).unwrap();
      // Save the JWT token to localStorage
      localStorage.setItem('token', response.token);
      // Redirect to the protected route
      navigate('/donate');
    } catch (err) {
      // Handle error by setting an error message
      setError('Login failed, please try again!');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
