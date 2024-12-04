import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!name) {
      formErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3001/register', { name, email, password })
        .then(result => {
          console.log(result);
          setSubmitted(true);
          navigate('./login')
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#6c757d' }}>
      <div className="card p-4" style={{ width: '400px', margin: '0 50px' }}>
        <h3 className="text-center mb-4">Register</h3>

        {submitted && <div className="alert alert-success text-center">Signup successful!</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">Register</button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p>Already Have an Account?</p>
          <Link to="/login" className="btn btn-light">Login</Link> {/* Link to Login page */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
