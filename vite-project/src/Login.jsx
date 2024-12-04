import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Ensure axios is imported

const Login = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data === "success") {
          navigate('/home'); // Navigate to home if login is successful
        }
      })
      .catch(err => console.log(err)); // Handle errors
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}> {/* Attach handleSubmit to form */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email} // Bind email state to input
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password} // Bind password state to input
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
