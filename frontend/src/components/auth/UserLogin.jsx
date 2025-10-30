import { Link } from 'react-router-dom';
import './Auth.css';

const UserLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">User Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
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