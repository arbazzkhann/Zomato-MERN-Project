import { Link } from 'react-router-dom';
import './Auth.css';

const PartnerLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Food Partner Login</h2>
        <form>
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
          Want to become a partner? <Link to="/food-partner/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;