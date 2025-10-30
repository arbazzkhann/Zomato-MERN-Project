import { Link } from 'react-router-dom';
import './Auth.css';

const UserRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">User Registration</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>
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
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit" className="auth-button">Register</button>
        </form>
        <div className="auth-switch">
          Already have an account? <Link to="/user/login">Login here</Link>
        </div>
        <div className="auth-switch">
          Want to register as a food partner? <Link to="/food-partner/register">Register as Partner</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;