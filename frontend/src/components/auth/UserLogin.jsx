import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

const UserLogin = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/login", 
      {
        email,
        password
      }, 
      {
        withCredentials: true
      });

      console.log(response);

      navigate("/");
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <div className="auth-switch">
          Don't have an account? <Link to="/user/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;